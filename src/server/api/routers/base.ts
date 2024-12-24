import { z } from "zod";

import {
  createCallerFactory,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createCaller } from "../root";

export const baseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          starred: false,
        },
      });
      const caller = createCaller(ctx);
      await caller.table.createDefaultTable({baseId: base.id, name: "table 1"});
      return base;
    }),

  getBase: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.base.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getBases: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.base
        .findMany({
          where: {
            createdBy: ctx.session.user,
          },
        })
    }),
});
