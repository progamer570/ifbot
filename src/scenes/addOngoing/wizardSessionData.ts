// CustomSceneSessionData.ts
import { WizardSessionData } from "telegraf/typings/scenes";

export interface AIOSessionData extends WizardSessionData {
  aIOTitles?: string[];
  backupChannel?: string;
  shareId?: number;
  msgIds?: number[];
  aIOPosterID?: string;
  aIOPosterIDDone?: boolean;
  done?: boolean;
  captions?: string[];
}
