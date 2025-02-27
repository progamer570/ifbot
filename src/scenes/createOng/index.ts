import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./ongHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "createOng",
  on("message", DramaHandlers.askTitleAIO),
  on("message", DramaHandlers.handleTitleAskPoster),
  on("message", DramaHandlers.handlePosterAskRelatedMsg),
  on("message", DramaHandlers.done)
);

export default dramaSession;
