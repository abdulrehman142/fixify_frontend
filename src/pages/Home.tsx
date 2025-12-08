import type { Dispatch, SetStateAction } from "react";
import Hero from "../components/Hero";
import Whychooseus from "../components/Whychooseus";
import Services from "./services/Services";
import Complaints from "../components/Complaints";
import Rating from "../components/Rating";

type HomeProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Home({ darkMode }: HomeProps) {
  return (
    <>
      <Hero />
      <Services darkMode={darkMode} />
      <Whychooseus darkMode={darkMode} />
      <Rating />
      <Complaints />
    </>
  );
}
