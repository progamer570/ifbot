import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./ongHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene("addOng", on("message", DramaHandlers.startCopying));
export default dramaSession;
