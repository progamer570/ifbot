import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./aIOHandler.js";
var on = Composer.on;
var dramaSession = new Scenes.WizardScene("addOngoing", on("message", DramaHandlers.startCopying));
export default dramaSession;
