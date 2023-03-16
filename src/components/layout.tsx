import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="layout">{children}</main>
    </>
  );
}
