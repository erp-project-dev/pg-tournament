import { useState } from "react";

import { FindPhaseBattlesHandler } from "../../handlers/find-phase-battles.handler";
import PhaseBattle from "./components/PhaseBattle/PhaseBattle";
import Select from "../../components/form/Select";

import { FindPhasesHandler } from "../../handlers/find-phases.handler";
import { FindGroupsHandler } from "../../handlers/find-groups.handler";
import { FindSettingsHandler } from "../../handlers/find-settings.handler";

export default function Competition() {
  const phases = FindPhasesHandler.handle();
  const groups = FindGroupsHandler.handle();
  const settings = FindSettingsHandler.handle();

  const currentPhaseSetting = settings.find((s) => s.key === "current_phase");
  const currentGroupSetting = settings.find((s) => s.key === "current_group");

  const [selectedPhaseId, setSelectedPhaseId] = useState(
    (currentPhaseSetting?.value as string) ?? ""
  );
  const [selectedGroupId, setSelectedGroupId] = useState(
    (currentGroupSetting?.value as string) ?? ""
  );

  const currentPhaseBattle = FindPhaseBattlesHandler.handle(
    selectedPhaseId,
    selectedGroupId
  );

  if (!currentPhaseSetting || !currentGroupSetting || !currentPhaseBattle) {
    console.error(
      !currentPhaseSetting || !currentGroupSetting
        ? "Missing configuration: 'current_phase' or 'current_group' setting not found."
        : `No competition found for phaseId "${selectedPhaseId}" and groupId "${selectedGroupId}".`
    );

    return (
      <section className="text-white text-center py-10">
        <p className="text-xl">No hay competencia activa por ahora.</p>
      </section>
    );
  }

  const { name, description, group, battles } = currentPhaseBattle;

  return (
    <section className="space-y-6 text-cen">
      <div className="text-white">
        <div className="flex flex-row gap-4 items-baseline">
          <h1 className="text-4xl font-extrabold tracking-tight">{name}</h1>
          <span className="text-xl text-gray-300 font-medium uppercase">
            {group.name}
          </span>
        </div>

        <p className="text-lg text-gray-400 mt-5">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end w-full md:w-auto">
        <Select
          value={selectedPhaseId}
          onChange={setSelectedPhaseId}
          options={phases.map((phase) => ({
            value: phase.phase_id,
            label: phase.name,
          }))}
        />

        <Select
          value={selectedGroupId}
          onChange={setSelectedGroupId}
          options={groups
            .filter((g) => g.phase_id === selectedPhaseId)
            .map((group) => ({
              value: group.group_id,
              label: group.name,
            }))}
        />
      </div>

      <PhaseBattle battles={battles} />
    </section>
  );
}
