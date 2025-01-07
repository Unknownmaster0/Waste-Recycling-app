import { AppBar } from "./AppBarComponent";

export default function Layout({
  userName = null,
  isLoggedIn = false,
  children,
}) {
  return (
    <div className="h-screen flex flex-col">
      <AppBar username={userName} logout={isLoggedIn} />
      {children}
    </div>
  );
}
