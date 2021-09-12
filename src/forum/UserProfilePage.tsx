import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import axios from "axios";
import moment from "moment";
import { Component } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import Post from "../models/Post";
import "../styles/UserProfilePage.css";

interface IUserProfilePageProps extends WithAuth0Props {}

interface IUserProfilePageState {
  posts: Post[];
  nextPageLoading: boolean;
  currentPageNumber: number;
  isLastPage: boolean;
  isAuthenticated: boolean;
}

const DEFAULT_PAGE_SIZE: number = 10;

class UserProfilePage extends Component<
  IUserProfilePageProps,
  IUserProfilePageState
> {
  constructor(props: IUserProfilePageProps) {
    super(props);
    this.state = {
      nextPageLoading: false,
      currentPageNumber: 0,
      isLastPage: false,
      posts: [],
      isAuthenticated: false
    };
  }

  componentDidUpdate(prevProps: IUserProfilePageProps, prevState: IUserProfilePageState) {
    if (this.props.auth0.isAuthenticated && !prevProps.auth0.isAuthenticated) {
      this.loadMorePages(this.props.auth0.user?.name!);
    }
  }

  loadMorePages(userId: string) {
    const nextPageNumber = this.state.currentPageNumber + 1;
    this.setState({ nextPageLoading: true, currentPageNumber: nextPageNumber });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/${userId}/posts?page=${nextPageNumber}&size=${DEFAULT_PAGE_SIZE}`
      )
      .then((response) => {
        if (!response || !response.data) {
          this.setState({ isLastPage: true });
          return;
        }

        if (response.data.length < DEFAULT_PAGE_SIZE) {
          this.setState({ isLastPage: true });
        }

        const newPosts = [...this.state.posts, ...response.data];
        this.setState({ posts: newPosts });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ nextPageLoading: false });
      });
  }

  render() {
    return (
      <div className="myPosts">
        <Card>
          <Card.Header>
            <Card.Title>我的帖子</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {this.state.posts.length > 0 &&
                this.state.posts.map((post) => (
                  <ListGroup.Item>
                    <Link
                      target="_blank"
                      to={`/post/${post._id}`}
                      key={`/post/${post._id}`}
                    >
                      {post.title}
                    </Link>
                    <div style={{float: "right"}}>发布于 {moment(post.createdAt).format("YYYY-MM-DD")}</div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="postsSpinner">
            {this.state.nextPageLoading && <Spinner animation="border" />}
          </div>
          <div className="d-grid gap-2">
            <Button
              variant={this.state.isLastPage ? "dark" : "primary"}
              disabled={this.state.nextPageLoading || this.state.isLastPage}
              onClick={() => this.loadMorePages(this.props.auth0.user?.name!)}
            >
              {this.state.isLastPage
                ? "没有可以加载的了..."
                : this.state.nextPageLoading
                ? "加载中…"
                : "加载更多"}
            </Button>
          </div>
          </Card.Body>
        </Card>
        <div className="logoutButtonSec"><LogoutButton>Logout</LogoutButton></div>
      </div>
    );
  }
}

export default withAuth0(UserProfilePage);
