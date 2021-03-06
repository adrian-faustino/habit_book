import React, { useEffect, useState } from "react";
/** Helpers **/
import { getUserHabitCountAPIData } from "../../helpers/getDataHelpers";
import { formatToWords } from "../../helpers/formatHelpers";
import {
  getUserFollowers,
  getUserFollowing,
} from "../../helpers/followDataHelpers";
/** Styles **/
import "./UserCard.css";
/** React router **/
import { Link } from "react-router-dom";
/** Redux **/
import { useSelector, useDispatch } from "react-redux";
/** Redux actions */
import { increment } from "../../actions";
/** Reactstrap **/
import { Button } from "reactstrap";
import { followUser, unfollowUser } from "../../helpers/followDataHelpers";

const UserCard = ({ userObj }) => {
  const {
    user_id,
    avatar_url,
    created_at,
    email,
    first_name,
    last_name,
    is_active,
    username,
  } = userObj;

  /** State **/
  const [habitCount, setHabitCount] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowedByMe, setIsFollowedByMe] = useState(false);

  /** Redux **/
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // check if the current user is a follower of the current card
  useEffect(() => {
    getUserFollowing(user.user_id, (users) => {
      for (let obj of users) {
        if (obj.user_id === user_id) {
          return setIsFollowedByMe(true);
        }
      }
      setIsFollowedByMe(false);
    });
  }, [counter]);

  useEffect(() => {
    // get user # of habits
    const url = window.location.href.split("/");
    const user_id_from_url = url[url.length - 1];
    const _user_id = user_id || user_id_from_url;

    getUserHabitCountAPIData(_user_id, (data) => {
      setHabitCount(data);
    });

    // get user # of followers
    getUserFollowers(_user_id, (users) => {
      setFollowerCount(users.length);
    });
  }, [counter]);

  const handleFollowUser = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    // ==> UNFOLLOW user
    if (isFollowedByMe) {
      unfollowUser(user_id, (res, err) => {
        setIsLoading(false);
        if (err) return;
        // trigger view change
        dispatch(increment(1));
        return;
      });
    } else {
      // ==> FOLLOW user
      followUser(user_id, (res, err) => {
        setIsLoading(false);
        if (err) return;
        // trigger view change
        dispatch(increment(1));
      });
    }
  };

  const triggerViewChange = () => {
    dispatch(increment(1));
  };

  return (
    <div className="UserCard__container">
      <Link to={`/users/${user_id}`}>
        <div className="UserCard__left-container">
          <img className="UserCard__avatar" src={avatar_url} />

          <span className="UserCard__username">@{username}</span>
        </div>
      </Link>

      <div className="UserCard__right-container">
        <span onClick={triggerViewChange} className="UserCard__full-name">
          <Link to={`/users/${user_id}`}>
            {first_name} {last_name}
          </Link>
        </span>

        <span className="UserCard__email">Email: {email}</span>

        <span className="UserCard__habit-count">Habits: {habitCount}</span>

        <span className="UserCard__follower-count">
          Followers: {followerCount}
        </span>

        <span className="UserCard__created-at">
          Member since {formatToWords(created_at)}
        </span>

        {user.user_id !== user_id && (
          <Button
            color={isFollowedByMe ? "info" : "secondary"}
            disabled={isLoading}
            onClick={handleFollowUser}
            className="UserCard__follow-button"
          >
            {isFollowedByMe ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
