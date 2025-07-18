import DATA from "../core/data";
import type { PhaseBattleHistory } from "../core/data.type";

export class FindBattleHistoryByGroupHandler {
  static handle(phaseId: string, groupId: string): PhaseBattleHistory[] {
    return DATA.PhaseBattleHistory.filter(
      (battle) => battle.phase_id === phaseId && battle.group_id === groupId
    );
  }
}
