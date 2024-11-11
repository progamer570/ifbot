import { AIOSessionData } from "./wizardSessionData.js";
import AIOWizardContext from "./aIOWizardContext.js";
declare function askTitleAIO(ctx: AIOWizardContext): Promise<import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handleTitleAskPoster(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handlePosterAskRelatedMsg(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function done(ctx: AIOWizardContext): Promise<void>;
export declare function getPhotoUrl(photoId: any): Promise<string>;
export { askTitleAIO, handleTitleAskPoster, done, handlePosterAskRelatedMsg };
