import { Fragment } from "react";
import ParticipantBlock from "./components/ParticipantBlock";

import type { PhaseBattle } from "../../../../handlers/find-phase-battles.handler";

type PhaseBattleProps = {
  battles: PhaseBattle[];
};

export default function PhaseBattle({ battles }: PhaseBattleProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {battles.map(
        ({ player1, player2, winnerId, winnerScore, loserScore }, index) => {
          const isLastDivider = index % 4 === 3 && index !== battles.length - 1;

          return (
            <Fragment key={index}>
              <div className="flex flex-col lg:flex-row items-center gap-6 bg-black/50 p-6 rounded-xl">
                <ParticipantBlock
                  player={player1}
                  winnerId={winnerId}
                  winnerScore={winnerScore}
                  loserScore={loserScore}
                />

                <div className="py-2 lg:py-0">
                  <span className="px-3 py-1 text-white text-5xl font-bold rounded-full text-shadow-black">
                    VS
                  </span>
                </div>

                <ParticipantBlock
                  player={player2}
                  direction="right"
                  winnerId={winnerId}
                  winnerScore={winnerScore}
                  loserScore={loserScore}
                />
              </div>

              {isLastDivider && (
                <div className="col-span-full">
                  <hr className="border-t border-gray-700 opacity-40 w-full my-6" />
                </div>
              )}
            </Fragment>
          );
        }
      )}
    </section>
  );
}
