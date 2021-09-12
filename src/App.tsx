import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./common/NavigationBar";
import ForumSectionPage from "./forum/ForumSectionPage";
import SinglePostPage from "./forum/SinglePostPage";
import "./App.css";
import UserProfilePage from "./forum/UserProfilePage";
import AboutMePage from "./forum/AboutMePage";

function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <ForumSectionPage sectionName="AdminMailbox" />
          </Route>
          <Route exact path="/blog">
            <ForumSectionPage sectionName="AdminBlog" privateToAdmin={true} />
          </Route>
          <Route exact path="/post/:id" component={SinglePostPage} />
          <Route exact path="/userprofile" component={UserProfilePage} />
          <Route exact path="/aboutme" component={AboutMePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
