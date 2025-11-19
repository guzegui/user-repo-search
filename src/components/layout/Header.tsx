/**
 * Global application header component.
 * Displays the application title and a brief description.
 *
 * @returns The header element.
 */
export function Header(): React.JSX.Element {
  return (
    <header className="border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          GitHub Explorer
        </h1>
        <span className="text-xs text-slate-500">
          Search repositories by username
        </span>
      </div>
    </header>
  );
}
