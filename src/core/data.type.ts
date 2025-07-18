export interface Player {
  id: string;
  name: string;
  last_name: string;
  instagram: string;
  video: string;
  country: string;
  in_competition: boolean;
}

export interface PlayerSummary {
  position: number;
  player_id: string;
  victories: number;
  score: number;
  points: number;
}

export interface Phase {
  phase_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export interface Group {
  phase_id: string;
  group_id: string;
  name: string;
  is_active: boolean;
}

export interface PhaseBattle {
  phase_id: string;
  group_id: string;
  battle_id: string;
  player_1: string;
  player_2: string;
  winner_id?: string;
  loser_id?: string;
  winner_score?: number;
  loser_score?: number;
  date?: string;
  status: string;
}

export type Setting =
  | {
      key: "base_points";
      value: number;
      comment: string;
    }
  | {
      key: "current_phase" | "current_group";
      value: string;
      comment: string;
    };

export interface TournamentData {
  Players: Player[];
  PlayerSummary: PlayerSummary[];
  Phases: Phase[];
  Groups: Group[];
  PhaseBattles: PhaseBattle[];
  Settings: Setting[];
}
