import DATA from "../core/data";
import type { Player, PlayerSummary } from "../core/data.type";

export interface EnrichedPlayerSummary extends PlayerSummary {
  player: Player;
}

export class FindPlayerSummaryHandler {
  static handle(): EnrichedPlayerSummary[] {
    return DATA.PlayerSummary.map(
      (ps) =>
        ({
          ...ps,
          player: DATA.Players.find((p) => p.id === ps.player_id),
        } as EnrichedPlayerSummary)
    );
  }
}
