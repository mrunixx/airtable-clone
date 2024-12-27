import { RecordValue } from "@prisma/client";
import { record, undefined, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { api } from "~/trpc/server";

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
  getTableHeaders: protectedProcedure
    .input(z.object({ tableId: z.string().min(1) }))
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
        take: input.limit
      });
      return val;
    }),
  createTableField: protectedProcedure
    .input(z.object({ tableId: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // for each record, create a new record value linking to field
      const field = await ctx.db.field.create({
        data: {
          name: input.name,
          tableId: input.tableId,
        },
      });

      const records = await ctx.db.record.findMany({
        where: {
          tableId: input.tableId,
        },
      });

      const recordValues = [];
      for (const r of records) {
        recordValues.push(
          async () =>
            await ctx.db.recordValue.create({
              data: {
                fieldId: field.id,
                recordId: r.id,
                data: "",
              },
            }),
        );
      }

      await Promise.all(recordValues);
      return field;
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
      const updatedRecordValue = await ctx.db.recordValue.update({
        where: {
          recordId_fieldId: {
            recordId: input.recordId,
            fieldId: input.fieldId,
          },
        },
        data: {
          data: input.data, // Update the `data` field with the provided value
        },
      });

      return updatedRecordValue; // Return the updated record value
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
          data: "",
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
});
