const BENEFITS = [
  'Always agrees with you',
  "Doesn't bomb Iran",
  'Available at 3am, no Uber needed',
  'Might start paying for your rent',
  'Never asks to split the bill',
];

export function ClaudeBenefits() {
  return (
    <div className="w-full max-w-xs mx-auto rounded-2xl bg-accent/8 px-6 py-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
        Meanwhile, Claude…
      </p>
      <ul className="space-y-2">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-text-primary">
            <span className="text-accent mt-0.5">✦</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
