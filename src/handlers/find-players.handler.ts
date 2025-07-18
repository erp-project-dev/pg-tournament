import DATA from "../core/data";
import type { Player } from "../core/data.type";

export class FindPlayersHandler {
  static handle(): Player[] {
    return DATA.Players;
  }
}
