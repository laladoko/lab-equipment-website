const BRAND_IDS = ['olympus', 'bruker', 'wiggens', 'fritsch'] as const;

export function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
