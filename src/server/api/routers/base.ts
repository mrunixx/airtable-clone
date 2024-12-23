import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({
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

  getBase: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getBases: protectedProcedure
    .mutation(async ({ ctx }) => {
      return ctx.db.base
        .findMany({
          where: {
            createdBy: ctx.session.user,
          },
        })
        // .then((data) => {
        //   return data.map(({ name, createdAt, starred }) => ({
        //     name,
        //     createdAt,
        //     starred,
        //   }));
        // });
    }),
});
