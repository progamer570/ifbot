import { WizardContext } from "telegraf/typings/scenes";

export default async function myInvitesHandler(ctx: WizardContext) {
  await ctx.scene.enter("myInvites");
}
