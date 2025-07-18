import DATA from "../core/data";
import type { Phase } from "../core/data.type";

export class FindPhasesHandler {
  static handle(): Phase[] {
    return DATA.Phases.filter((p) => p.is_active);
  }
}
