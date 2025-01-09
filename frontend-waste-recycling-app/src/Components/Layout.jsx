import { AppBar } from "./AppBarComponent";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <AppBar />
      {children}
    </div>
  );
}
