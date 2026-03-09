import Image from "@/app/components/BaseImage";

export function StepArrow() {
  return (
    <div className="pointer-events-none absolute right-[-38px] top-1/2 -translate-y-1/2">
      <div className="relative h-[122px] w-[68px]">
        {/* Blue arrow (back / bottom) */}
        <Image
          src="/images/BlueArrow.svg"
          alt=""
          fill
          className="object-contain z-0 translate-x-3 translate-y-4 scale-95"
        />
        <Image
          src="/images/GrayArrow.svg"
          alt=""
          fill
          className="object-contain z-10"
        />
      </div>
    </div>
  );
}

  