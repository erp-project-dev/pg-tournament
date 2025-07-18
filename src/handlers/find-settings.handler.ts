import DATA from "../core/data";
import type { Setting } from "../core/data.type";

export class FindSettingsHandler {
  static handle(): Setting[] {
    return DATA.Settings;
  }
}
