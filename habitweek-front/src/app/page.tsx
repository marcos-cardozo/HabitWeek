import RegisterButton from "@/components/RegisterButton/RegisterButton";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";

export default function Home() {
  return (
    <nav className="flex justify-between items-center p-4">
      <ThemeSwitch />
      <RegisterButton />
    </nav>
  );
}
