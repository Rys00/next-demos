import MainHeader from "@/components/main-header/main-header";
import "../globals.css";

export default function ContentLayout({ children }) {
  return (
    <div id="page">
      <MainHeader />
      <main>{children}</main>
    </div>
  );
}
