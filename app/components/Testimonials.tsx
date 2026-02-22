import Image from "@/app/components/BaseImage";
import { assetPath } from "@/app/lib/assets";

const FEEDBACKS = [
  { author: "Henry", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.", job: "CTO" },
  { author: "Anna", comment: "We have been working with STACKLEVEL for over a year. Great team, delivered on time.", job: "Product Manager" },
];

export default function Testimonials() {
  return (
    <div className="testimonials__wrapper relative">
      <section id="testimonials" className="testimonials mx-auto mt-12 w-[300px] sm:w-[375px] md:w-[417px] md:my-[70px] md:w-[667px] md:mt-[90px] md:mb-[30px] lg:w-[892px] xl:w-[1000px]">
        <h3 className="testimonials__header mx-auto w-fit bg-white px-2.5 pt-2.5 text-center font-semibold uppercase md:px-[50px] md:pt-[50px] [font-size:clamp(24px,3vw,36px)]">
          Our clients about us
        </h3>
        <div className="testimonials__block relative mt-10 w-full md:py-[60px] md:pt-[60px] md:pb-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-4">
            {FEEDBACKS.slice(0, 2).map((f) => (
              <div key={f.author} className="feedback-slider__item relative mx-auto w-[90%]">
                <div className="feedback__content flex">
                  <div className="feedback__photo relative top-[-40px] h-[100px] w-[100px] shrink-0 rounded-none bg-[#e8e7e5] object-cover md:h-[150px] md:w-[150px] lg:h-[250px] lg:w-[35%] lg:border lg:border-[#e8e7e5] lg:border-b-4 lg:border-b-[var(--accent)] lg:border-r-0 lg:top-0" />
                  <div className="feedback__text relative z-10 flex w-full flex-col border border-[#e8e7e5] border-b-4 border-b-[var(--accent)] p-5 [font-size:clamp(18px,2.5vw,24px)] md:mb-0 md:ml-5">
                    <h4 className="feedback__text_author m-0 mb-5 font-semibold uppercase text-[var(--accent)] md:mb-[70px] md:ml-[150px] lg:mb-[30px] lg:ml-0 [font-size:clamp(23px,3.5vw,36px)]">
                      {f.author}
                    </h4>
                    <p className="feedback__text_comment m-0 mb-5 text-black">{f.comment}</p>
                    <p className="feedback__text_job mt-auto text-[var(--accent)]">{f.job}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Image
            src="/images/_quotes.svg"
            alt=""
            width={111}
            height={85}
            className="quotes absolute right-[20%] top-[-7%] z-[3] w-[18%] md:left-[84%] md:w-[15%] lg:left-[85%] lg:top-[-10%] lg:w-[13%] xl:left-[90%]"
          />
        </div>
        <div className="feedback-slider__nav flex items-center justify-end gap-4 mr-[7vw] xl:mr-[100px]">
          <button
            type="button"
            aria-label="Prev"
            className="h-5 w-5 shrink-0 cursor-pointer bg-[length:contain] bg-no-repeat md:h-[30px] md:w-[30px]"
            style={{ backgroundImage: `url(${assetPath("/images/_prev-feedback.svg")})` }}
          />
          <button
            type="button"
            aria-label="Next"
            className="h-5 w-5 shrink-0 cursor-pointer bg-[length:contain] bg-no-repeat md:h-[30px] md:w-[30px]"
            style={{ backgroundImage: `url(${assetPath("/images/_next-feedback.svg")})` }}
          />
          <span className="text-xl font-semibold text-[var(--accent)] md:text-2xl xl:text-[32px]">1 / 2</span>
        </div>
      </section>
    </div>
  );
}
