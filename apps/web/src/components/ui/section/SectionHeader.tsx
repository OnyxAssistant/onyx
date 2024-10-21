interface HeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  description,
  children,
}: HeaderProps) => {
  return (
    <header className="mb-12 flex w-full flex-col gap-3">
      <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200 bg-clip-text text-center text-transparent">
        <h2 className="mb-4 text-balance text-2xl font-bold leading-snug md:text-5xl md:leading-snug">
          {title}
        </h2>
        <>{description}</>
        <>{children}</>
      </div>
    </header>
  );
};