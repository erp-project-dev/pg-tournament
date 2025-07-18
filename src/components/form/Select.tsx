type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: "full" | "fit" | string;
  disabled?: boolean;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  width,
  disabled = false,
}: SelectProps) {
  const baseStyles =
    "bg-black/70 text-white px-4 py-3 pr-10 rounded-md border border-white/10 text-base transition";

  const widthClass =
    width === "full"
      ? "w-full"
      : width === "fit"
      ? "w-fit"
      : width
      ? `w-[${width}px]`
      : "";

  const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseStyles} ${widthClass} ${disabledStyles}`}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
