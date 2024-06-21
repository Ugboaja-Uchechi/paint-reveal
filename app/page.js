import Text from "./component/Text";
import Scene from "./component/scene";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex w-full h-screen items-center justify-center">
      <Text />
      <Scene />
    </main>
  );
}
