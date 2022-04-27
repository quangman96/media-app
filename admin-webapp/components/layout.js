import Dashboard from "./dashboard"

export default function Layout({ children }) {
  console.log("layout")
  return (
    <div className="container">
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
