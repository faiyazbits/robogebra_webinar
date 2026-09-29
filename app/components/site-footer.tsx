import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto flex max-w-[1280px] items-center px-4 py-8 sm:px-6">
        <Image
          src="/robogebra-logo.416e7679.svg"
          alt="Robogebra"
          width={133}
          height={24}
          className="h-6 w-auto"
        />
      </div>
    </footer>
  );
}
