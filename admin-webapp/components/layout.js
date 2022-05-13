import Dashboard from "./dashboard"
import firebase from "../utils/firebase";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Dashboard firebase={firebase}>{children}</Dashboard>
    </div>
  );
}
