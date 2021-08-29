import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./common/NavigationBar";
import AdminMailbox from "./mailbox/AdminMailbox";
import HomePage from "./forum/HomePage";

function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Route path="/askadmin" component={AdminMailbox} />
        <Route path="/campus" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;
