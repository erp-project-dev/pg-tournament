import DATA from "../core/data";
import type { Group, Phase, Player } from "../core/data.type";

export interface PhaseBattle {
  player1: Player;
  player2: Player;
  winnerId?: string;
  loserId?: string;
  winnerScore?: number;
  loserScore?: number;
  date?: Date;
  status?: string;
}

export interface EnrichedPhaseBattles {
  phase_id: string;
  name: string;
  description: string;
  group: Group;
  battles: PhaseBattle[];
}

export class FindPhaseBattlesHandler {
  static handle(phaseId: string, groupId: string): EnrichedPhaseBattles | null {
    const base = this.getBaseData(phaseId, groupId);
    if (!base) return null;

    const { phase, group } = base;

    const battles = DATA.PhaseBattles.filter(
      (battle) =>
        battle.phase_id === phase.phase_id && battle.group_id === group.group_id
    )
      .map((battle) => {
        const player1 = DATA.Players.find((p) => p.id === battle.player_1);
        const player2 = DATA.Players.find((p) => p.id === battle.player_2);
        if (!player1 || !player2) return null;

        return {
          player1,
          player2,
          winnerId: battle.winner_id,
          loserId: battle.loser_id,
          winnerScore: battle.winner_score,
          loserScore: battle.loser_score,
          date: battle.date ? new Date(battle.date) : undefined,
          status: battle.status,
        };
      })
      .filter(Boolean) as PhaseBattle[];

    return {
      phase_id: phase.phase_id,
      name: phase.name,
      description: phase.description,
      group,
      battles,
    };
  }

  private static getBaseData(
    phaseId: string,
    groupId: string
  ): { phase: Phase; group: Group } | null {
    const phase = DATA.Phases.find((p) => p.phase_id === phaseId);
    const group = DATA.Groups.find((g) => g.group_id === groupId);
    if (!phase || !group) return null;
    return { phase, group };
  }
}
