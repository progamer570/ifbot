import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./ongHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "addOngoing",
  on("message", DramaHandlers.startCopying)
);

export default dramaSession;
