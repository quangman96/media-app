import Dashboard from "./dashboard"

export default function Layout({ children }) {
  return (
    <div className="container">
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
