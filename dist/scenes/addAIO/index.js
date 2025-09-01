import { Scenes, Composer } from "telegraf";
import * as AioHandlers from "./aIOHandler.js";
var on = Composer.on;
var aioSession = new Scenes.WizardScene("addAIO", on("message", AioHandlers.askTitleAIO), on("message", AioHandlers.handleTitleAskPoster), on("message", AioHandlers.handlePosterAskRelatedMsg), on("message", AioHandlers.done));
export default aioSession;
