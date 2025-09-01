import { Scenes, Composer } from "telegraf";
import * as AioHandlers from "./aIOHandler.js";
const on = Composer.on;
const aioSession = new Scenes.WizardScene("addAio", on("message", AioHandlers.askTitleAIO), on("message", AioHandlers.handleTitleAskPoster), on("message", AioHandlers.handlePosterAskRelatedMsg), on("message", AioHandlers.done));
export default aioSession;
