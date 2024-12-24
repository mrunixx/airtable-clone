import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          starred: false,
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
  getTableRecords: protectedProcedure
    .input(z.object({ tableId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const records = await ctx.db.record
        .findMany({
          where: {
            tableId: input.tableId,
          },
        })
      
      return Promise.all(
        records.map((r) => {
          return ctx.db.recordValue.findMany({
            where: {
              recordId: r.id
            }
          });
        })
      )
    }),
});
