type Props = {
    title: string;
    text: string;
  };
  
export function ExpertCard({ title, text }: Props) {
    return (
      <div className="relative flex min-h-[190px] w-full  flex-col border border-gray-200 bg-white p-6 md:p-8 justify-between">
        <h3 className="mb-3 md:mb-4 text-[20px] font-bold uppercase text-blue-700">
          {title}
        </h3>

        <p className="text-[16px] text-black">
          {text}
        </p>
  
        {/* Bottom blue line */}
        <div className="absolute bottom-0 left-0 h-[6px] w-full bg-blue-700" />
      </div>
    );
  }
  