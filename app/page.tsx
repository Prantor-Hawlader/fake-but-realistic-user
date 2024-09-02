import MainPage from "@/components/MainPage";
import { title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-1 md:py-2">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Fake&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>User&nbsp;</h1>
        <h1 className={title()}>Generator</h1>
      </div>
      <MainPage />
    </section>
  );
}
