import { RecordValue } from "@prisma/client";
import { record, undefined, z, ZodString } from "zod";
import { faker } from "@faker-js/faker";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createCaller } from "../root";

export const tableRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ baseId: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.table.create({
        data: {
          name: input.name,
          baseId: input.baseId,
        },
      });
    }),
  getTables: protectedProcedure
    .input(z.object({ baseId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findMany({
        where: {
          baseId: input.baseId,
        },
      });
    }),
  getTable: protectedProcedure
    .input(z.object({ tableId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findUnique({
        where: {
          id: input.tableId,
        },
        include: {
          views: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),
  getTableHeaders: protectedProcedure
    .input(z.object({ tableId: z.string().min(0) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.field.findMany({
        where: {
          tableId: input.tableId,
        },
      });
    }),
  getTableRecordValues: protectedProcedure
    .input(
      z.object({
        tableId: z.string().min(1),
        offset: z.number().min(0),
        limit: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const val = await ctx.db.recordValue.findMany({
        where: {
          record: {
            tableId: input.tableId,
          },
        },
        orderBy: {
          record: {
            rowIndex: "asc",
          },
        },
        skip: input.offset,
        take: input.limit,
      });
      return val;
    }),
  createTableField: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        tableId: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const field = await ctx.db.field.create({
        data: {
          id: input.id,
          name: input.name,
          tableId: input.tableId,
        },
      });

      const records = await ctx.db.record.findMany({
        where: {
          tableId: input.tableId,
        },
      });

      if (records.length > 0) {
        await ctx.db.recordValue.createMany({
          data: records.map((r) => ({
            id: `${r.id}-${field.id}`,
            fieldId: field.id,
            recordId: r.id,
            data: "",
          })),
        });
      }

      return { success: true };
    }),
  createTableRecord: protectedProcedure
    .input(z.object({ tableId: z.string().min(1), rowIndex: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.record.create({
        data: {
          rowIndex: input.rowIndex,
          tableId: input.tableId,
        },
      });

      const fields = await ctx.db.field.findMany({
        where: {
          tableId: input.tableId,
        },
      });

      const recordValues: RecordValue[] = [];

      for (const f of fields) {
        recordValues.push(
          await ctx.db.recordValue.create({
            data: {
              recordId: record.id,
              fieldId: f.id,
              data: "",
            },
          }),
        );
      }

      await Promise.all(recordValues);

      return recordValues;
    }),
  createRecordValue: protectedProcedure
    .input(
      z.object({
        recordId: z.string().min(1),
        fieldId: z.string().min(1),
        data: z.string().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.recordValue.create({
        data: {
          recordId: input.recordId,
          fieldId: input.fieldId,
          data: input.data,
        },
      });
    }),
  createDefaultTable: protectedProcedure
    .input(
      z.object({
        baseId: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.create({
        data: {
          baseId: input.baseId,
          name: input.name,
          records: {
            create: [{ rowIndex: 0 }, { rowIndex: 1 }, { rowIndex: 2 }],
          },
          fields: {
            create: [
              { name: "Name" },
              { name: "Notes" },
              { name: "Assignee" },
              { name: "Status" },
            ],
          },
          views: {
            create: {
              title: "Grid View 1",
              filterOp: "",
              filterFieldId: "",
              filterValue: "",
              sortOp: "",
              sortFieldId: "",
            },
          },
        },
        include: {
          records: true,
          fields: true,
        },
      });

      const recordValuesPromises = [];
      for (const record of table.records) {
        for (const field of table.fields) {
          recordValuesPromises.push(
            ctx.db.recordValue.create({
              data: {
                recordId: record.id,
                fieldId: field.id,
                data: "",
              },
            }),
          );
        }
      }

      await Promise.all(recordValuesPromises);

      return {
        success: true,
        table,
      };
    }),
  updateCellValue: protectedProcedure
    .input(
      z.object({
        recordId: z.string().min(1),
        fieldId: z.string().min(1),
        data: z.string().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log({
        record: input.recordId,
        field: input.fieldId,
      });
      const updatedRecordValue = await ctx.db.recordValue.update({
        where: {
          recordId_fieldId: {
            recordId: input.recordId,
            fieldId: input.fieldId,
          },
        },
        data: {
          data: input.data,
        },
      });

      return updatedRecordValue;
    }),
  create15000Records: protectedProcedure
    .input(
      z.object({
        tableId: z.string().min(1),
        fieldIds: z.array(z.string().min(1)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tableId, fieldIds } = input;

      const currentMax = await ctx.db.record.count({
        where: { tableId: tableId },
      });
      const records = Array.from({ length: 15000 }, (_, i) => ({
        id: `${tableId}-record-${i + currentMax}`,
        rowIndex: i + currentMax,
        tableId: tableId,
      }));

      const recordValuesData = records.flatMap((record) =>
        fieldIds.map((fieldId) => ({
          id: `${record.id}-${fieldId}`,
          data: faker.person.fullName(),
          recordId: record.id,
          fieldId: fieldId,
        })),
      );

      const result = await ctx.db.$transaction(
        async (prisma) => {
          await prisma.record.createMany({
            data: records,
          });

          return await prisma.recordValue.createMany({
            data: recordValuesData,
          });
        },
        { timeout: 60000 },
      );
      return result;
    }),
  getFilteredRecordValues: protectedProcedure
    .input(
      z.object({
        tableId: z.string().min(1),
        filterOperator: z.string(),
        filterFieldId: z.string(),
        filterValue: z.string(),
        sortFieldId: z.string(),
        sortOp: z.string(),
        offset: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let dataFilter;
      let val;
      let numVal = -100000;

      if (input.filterFieldId !== "") {
        numVal = parseInt(input.filterValue);
        switch (input.filterOperator) {
          case "contains":
            dataFilter = {
              contains: input.filterValue,
            };
            break;
          case "does not contain":
            dataFilter = {
              not: {
                contains: input.filterValue,
              },
            };
            break;
          case "is":
            dataFilter = input.filterValue;
            break;
          case "is not":
            dataFilter = {
              not: input.filterValue,
            };
            break;
          case "is empty":
            dataFilter = "";
            break;
          case "is not empty":
            dataFilter = {
              not: "",
            };
            break;
          default:
            dataFilter = {};
            break;
        }
        if (
          input.sortFieldId === "" &&
          input.filterOperator !== "greater than" &&
          input.filterOperator !== "less than"
        ) {
          return await ctx.db.record.findMany({
            where: {
              tableId: input.tableId,
              cellValues: {
                some: {
                  fieldId: input.filterFieldId,
                  data: dataFilter,
                },
              },
            },
            include: {
              cellValues: true,
            },
            orderBy: [
              {
                rowIndex: "asc",
              },
            ],
            skip: input.offset,
            take: input.limit
          }).then((r) => {
            r.flatMap((record) => record.cellValues)
          }); 
        }
          val = await ctx.db.record.findMany({
            where: {
              tableId: input.tableId,
              cellValues: {
                some: {
                  fieldId: input.filterFieldId,
                  data: dataFilter,
                },
              },
            },
            include: {
              cellValues: true,
            },
            orderBy: [
              {
                rowIndex: "asc",
              },
            ],
          });
      } else {
        if (input.sortFieldId === "") {
          return await ctx.db.record
            .findMany({
              where: {
                tableId: input.tableId,
              },
              orderBy: {
                rowIndex: "asc",
              },
              include: {
                cellValues: true,
              },
              skip: input.offset,
              take: input.limit,
            })
            .then((r) => {
              if (input.sortFieldId === "") {
                return r.flatMap((record) => record.cellValues);
              }
            });
        } else {
          val = await ctx.db.record.findMany({
            where: {
              tableId: input.tableId,
            },
            orderBy: {
              rowIndex: "asc",
            },
            include: {
              cellValues: true,
            },
          });
        }
      }

      switch (input.sortOp) {
        case "A → Z":
          val?.sort((a, b) => {
            const aVal =
              a.cellValues.find((c) => c.fieldId === input.sortFieldId)?.data ??
              "";
            const bVal =
              b.cellValues.find((c) => c.fieldId === input.sortFieldId)?.data ??
              "";
            return aVal.localeCompare(bVal);
          });
          break;
        case "Z → A":
          val.sort((a, b) => {
            const aVal =
              a.cellValues.find((c) => c.fieldId === input.sortFieldId)?.data ??
              "";
            const bVal =
              b.cellValues.find((c) => c.fieldId === input.sortFieldId)?.data ??
              "";
            return bVal.localeCompare(aVal);
          });
          break;
        default:
          break;
      }

      const newVal = val.slice(input.offset, input.offset + input.limit);
      const recordValues = newVal.flatMap((record) => record.cellValues);

      if (
        ["greater than", "less than"].includes(input.filterOperator) &&
        !isNaN(numVal) &&
        numVal !== -100000
      ) {
        return recordValues.filter((r) => {
          const dataNum = parseInt(r.data);
          return input.filterOperator === "greater than"
            ? dataNum > numVal
            : dataNum < numVal;
        });
      }

      return recordValues;
    }),
  createTableView: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        tableId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.view.create({
        data: {
          title: input.title,
          tableId: input.tableId,
          filterOp: "",
          filterFieldId: "",
          filterValue: "",
          sortOp: "",
          sortFieldId: "",
        },
      });
    }),
  updateTableView: protectedProcedure
    .input(
      z.object({
        viewId: z.string(),
        filterFieldId: z.string(),
        filterOp: z.string(),
        filterValue: z.string(),
        sortOp: z.string(),
        sortFieldId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.view.update({
        where: {
          id: input.viewId,
        },
        data: {
          filterFieldId: input.filterFieldId,
          filterOp: input.filterOp,
          filterValue: input.filterValue,
          sortOp: input.sortOp,
          sortFieldId: input.sortFieldId,
        },
      });
    }),
  getTableView: protectedProcedure
    .input(z.object({ viewId: z.string().min(0) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.view.findUnique({
        where: {
          id: input.viewId,
        },
      });
    }),
});
