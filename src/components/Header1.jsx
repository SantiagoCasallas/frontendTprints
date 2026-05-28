export default function Header1({ title = "T-Prints" }) {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/90">
      <h1 className="text-center text-lg font-bold leading-tight tracking-tight text-primary">
        {title}
      </h1>
    </header>
  );
}