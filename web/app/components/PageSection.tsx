export default function PageSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="width-wrapper mx-auto py-16 md:py-24">
      <h1 className="mb-4 font-semibold uppercase leading-tight text-black [font-size:clamp(28px,5vw,48px)]">
        {title}
      </h1>
      {subtitle && (
        <p className="normal-case mb-8 max-w-2xl text-lg text-[#333] [font-size:clamp(16px,2vw,20px)]">
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}
