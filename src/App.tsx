import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./common/NavigationBar";
import AdminMailbox from "./mailbox/AdminMailbox";
import HomePage from "./forum/HomePage";
import SinglePostPage from "./common/SinglePostPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Route path="/askadmin" component={AdminMailbox} />
        <Route path="/campus" component={HomePage} />
        <Route path="/post/:id" component={SinglePostPage} />
      </div>
    </Router>
  );
}

export default App;
