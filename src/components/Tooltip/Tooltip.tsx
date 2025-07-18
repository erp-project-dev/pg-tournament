import React, { useState, createContext, useContext } from "react";

const TooltipContext = createContext<{
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}>({ enabled: false, setEnabled: () => {} });

export default function Tooltip({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <TooltipContext.Provider value={{ enabled, setEnabled }}>
      <div className="relative inline-block w-full h-full cursor-pointer">
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

Tooltip.Element = function TooltipElement({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setEnabled } = useContext(TooltipContext);

  return (
    <div
      onMouseEnter={() => setEnabled(true)}
      onMouseLeave={() => setEnabled(false)}
    >
      {children}
    </div>
  );
};

Tooltip.Content = function TooltipContent({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  const { enabled } = useContext(TooltipContext);

  const alignmentMap = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div
      className={`absolute bottom-full mb-2 px-3 py-1.5 text-xs text-white bg-black border border-dashed border-white/20 rounded shadow-lg transition-all pointer-events-none whitespace-nowrap z-50
    ${alignmentMap[align]} ${enabled ? "opacity-90" : "opacity-0"}
  `}
    >
      {children}
    </div>
  );
};
