import DATA from "../core/data";
import type {
  Group,
  Phase,
  PhaseBattle,
  Player,
  PlayerSummary,
} from "../core/data.type";

export interface EnrichedPhaseBattle extends PhaseBattle {
  phase: Phase;
  group: Group;
  winner?: Player;
  loser?: Player;
}

export interface PlayerProfile {
  player: Player;
  playerSummary: PlayerSummary;
  battles: EnrichedPhaseBattle[];
}

export class FindPlayerProfileHandler {
  static handle(id: string): PlayerProfile | null {
    const player = DATA.Players.find((p) => p.id === id);
    if (!player) {
      console.error(`❌ Player with id "${id}" not found.`);
      return null;
    }

    const playerSummary = DATA.PlayerSummary.find((ps) => ps.player_id === id);
    if (!playerSummary) {
      console.error(`❌ Summary for player "${id}" not found.`);
      return null;
    }

    const battles: EnrichedPhaseBattle[] = DATA.PhaseBattles.filter(
      (b) => b.winner_id === id || b.loser_id === id
    ).map((battle) => {
      const phase = DATA.Phases.find((p) => p.phase_id === battle.phase_id);
      const group = DATA.Groups.find((g) => g.group_id === battle.group_id);
      const winner = DATA.Players.find((p) => p.id === battle.winner_id);
      const loser = DATA.Players.find((p) => p.id === battle.loser_id);

      if (!phase || !group) {
        console.warn(
          `⚠️ Missing phase or group for battle ${battle.battle_id}`
        );
      }

      return {
        ...battle,
        phase: phase!,
        group: group!,
        winner,
        loser,
      };
    });

    return {
      player,
      playerSummary,
      battles,
    };
  }
}
