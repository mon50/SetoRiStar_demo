import type { Metadata } from "next";
import LoginCheck from "./components/LoginCheck";

export default function IndexPage() {

  return(
    <div>
      <h1>Redux Toolkit</h1>
      <p>Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.</p>
      <LoginCheck/>
    </div>
  );

}
export const metadata: Metadata = {
  title: "Redux Toolkit",
};
