import Link from "next/link";
import { Header } from "../components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
        <br />
        <Link href="/blog">Blog</Link>
      </p>
    </main>
  );
}
