import DATA from "../core/data";
import type { Group } from "../core/data.type";

export class FindGroupsHandler {
  static handle(): Group[] {
    return DATA.Groups.filter((g) => g.is_active);
  }
}
