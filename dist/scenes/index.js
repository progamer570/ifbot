import { Scenes } from "telegraf";
import shareAIO from "./addAIO/index.js";
import reqAIO from "./reqAIO/index.js";
import editAIO from "./editAIO/index.js";
import myInvites from "./myInvites/index.js";
import addOng from "./addOngoing/index.js";
import createOng from "./createOng/index.js";
var stage = new Scenes.Stage([
    shareAIO,
    reqAIO,
    editAIO,
    myInvites,
    addOng,
    createOng,
]);
// const shareStage = new Scenes.Stage<Scenes.SceneContext>([shareScene]);
export default stage;
