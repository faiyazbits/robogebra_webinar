import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6">
        <Link href="/" aria-label="Robogebra home" className="shrink-0">
          <Image
            src="/robogebra-logo.416e7679.svg"
            alt="Robogebra"
            width={150}
            height={27}
            loading="eager"
            className="h-6 w-auto sm:h-7"
          />
        </Link>
      </div>
    </header>
  );
}
