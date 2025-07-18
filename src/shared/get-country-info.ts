type CountryInfo = {
  id: string;
  name: string;
  icon: string;
};

const COUNTRY_MAP: Record<string, string> = {
  PE: "Perú",
  CL: "Chile",
  BR: "Brasil",
  AR: "Argentina",
  MX: "México",
  CO: "Colombia",
  BO: "Bolivia",
  EC: "Ecuador",
  UY: "Uruguay",
  PY: "Paraguay",
  VE: "Venezuela",
  PA: "Panamá",
  DO: "República Dominicana",
  CU: "Cuba",
  GT: "Guatemala",
  HN: "Honduras",
  SV: "El Salvador",
  NI: "Nicaragua",
  CR: "Costa Rica",
};

export function getCountryInfo(code2: string): CountryInfo | null {
  const upperCode = code2.toUpperCase();
  const name = COUNTRY_MAP[upperCode];
  if (!name) return null;

  const icon = upperCode.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt(0))
  );

  return {
    id: upperCode,
    name,
    icon,
  };
}
