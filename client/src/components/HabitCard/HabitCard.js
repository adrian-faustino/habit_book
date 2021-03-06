import React, { useEffect, useState, useRef } from "react";
/** npm **/
import classNames from "classnames";
/** Subcomponents **/
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import CommentsContainer from "./CommentsContainer/CommentsContainer";
import CommentForm from "./CommentForm/CommentForm";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import EditHabitForm from "./EditHabitForm/EditHabitForm";
/** Reactstrap **/
import {
  Tooltip,
  Alert,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
/** Styles **/
import "./HabitCard.css";
/** Helpers **/
import { formatToWords, formatPlural } from "../../helpers/formatHelpers";
import {
  getCompleted_atAPIData,
  getUserAPIData,
} from "../../helpers/getDataHelpers";
import {
  handleDeleteCard,
  getLikes,
  registerLike,
  getComments,
} from "../../helpers/habitDataHelpers";
/** Redux **/
import { useSelector, useDispatch } from "react-redux";
/** Redux-actions **/
import { increment } from "../../actions";

const HabitCard = ({ habit }) => {
  /** Props **/
  const {
    habit_id,
    title,
    description,
    created_at,
    last_completed_at,
    last_broken_at,
    is_edited,
    user_id,
  } = habit;

  /** State **/
  const [completedAt, setCompletedAt] = useState([]);
  const [isMyHabit, setIsMyHabit] = useState(false);
  const [isMyLike, setIsMyLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState("");
  const [err, setErr] = useState("");
  const [habit_by, setHabitBy] = useState("");
  const [success, setSuccess] = useState("");
  // use null here for conditional rendering, instead of using empty array?
  const [comments, setComments] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);

  /** useRef **/
  const commentField = useRef();

  /** Redux **/
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);

  /** Classnames **/
  const liked = classNames({
    liked: isMyLike,
  });

  // on mount, get comment number
  useEffect(() => {
    getComments(habit_id, (comments) => {
      setComments(comments);
    });
  }, []);

  // When each habit loads, get a list of completed days
  useEffect(() => {
    getCompleted_atAPIData(user_id, habit_id, (data) => {
      console.log(data);
      setCompletedAt(data);
    });
  }, [counter]);

  // If this habit belongs to this user, display delete btn
  const _user_id = useSelector((state) => state.user.user_id);
  useEffect(() => {
    if (habit.user_id === _user_id) {
      setIsMyHabit(true);
    }

    // get number of likes
    getLikes(user_id, habit_id, (likes) => {
      setLikesCount(likes.length);
      setLikes(likes);

      // check if this user liked this habit
      for (let like of likes) {
        if (like.liked_by === user.user_id) {
          setIsMyLike(true);
          return;
        }
      }

      setIsMyLike(false);
    });

    /* STRETCH: fetch number of comments like fb */
    // // get comments
    // getComments(habit_id, setComments);
  }, [counter]);

  // get name of user who created habit
  useEffect(() => {
    getUserAPIData(user_id, (data) => {
      setHabitBy(data.username);
    });
  }, []);

  const handleLikeBtn = (e) => {
    e.preventDefault();

    registerLike(user, user_id, habit_id, (success, err) => {
      if (err) return;
      switch (success.action) {
        case "LIKED":
          setLikesCount((count) => count + 1);
          break;
        case "UNLIKED":
          setLikesCount((count) => count - 1);
          break;
      }
      setIsMyLike(!isMyLike);
    });
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    setDeleteConfirm(true);
  };

  /* 2nd param keepOpen is passed in after a submission in the CommentForm.js component - keeps comment section open after new submission */
  const handleExpandComments = (e, keepOpen) => {
    e && e.preventDefault();
    if (!keepOpen && commentsExpanded) {
      // close comments
      return setCommentsExpanded(false);
    }

    // get comments
    getComments(habit_id, (comments) => {
      setComments(comments);
      // expand comments
      setCommentsExpanded(true);
    });
  };

  const handleEditToggle = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const focusCommentField = (e) => {
    e.preventDefault();
    commentField.current.focus();
  };

  return (
    <div className="HabitCard">
      <div className="HabitCard__container">
        <CalendarComponent
          habit_id={habit_id}
          user_id={user_id}
          completedAt={completedAt}
          setSuccess={setSuccess}
          setErr={setErr}
        />
        <div className="HabitCard__data-container">
          <h4 className="HabitCard__title">{title}</h4>
          <span className="HabitCard__description">
            {editMode && (
              <EditHabitForm
                setSuccess={setSuccess}
                setErr={setErr}
                habit_id={habit_id}
                setEditMode={setEditMode}
                description={description}
                title={title}
              />
            )}
            {description ? description : <i>No description provided.</i>}
          </span>
          <h5 className="HabitCard__created-at">
            Created at {formatToWords(created_at)} by @{habit_by}
          </h5>

          {is_edited && (
            <span className="HabitCard__edited-span">(edited)</span>
          )}

          {/* error feedback */}
          {err && (
            <Alert color="danger" className="HabitCard__err-msg">
              {err}
            </Alert>
          )}

          {/* success feedback */}
          {success && (
            <Alert color="success" className="HabitCard__success-msg">
              {success}
            </Alert>
          )}
        </div>

        <footer className="HabitCard__footer">
          {likesCount > 0 && (
            <span className={`HabitCard__likes-span ${liked}`}>
              {`${likesCount} ${formatPlural(likesCount, "like")}`}
            </span>
          )}
          <button className={liked} onClick={handleLikeBtn}>
            {isMyLike ? "unlike" : "like"}
          </button>
          {/* if comments expanded, show 'close comments', else show number of comments viewable */}
          <button
            className="HabitCard__view-comment-btn"
            onClick={
              comments.length === 0 ? focusCommentField : handleExpandComments
            }
          >
            {commentsExpanded
              ? "close comments"
              : comments.length === 0
              ? "comment"
              : `view ${comments.length} ${formatPlural(
                  comments.length,
                  "comment"
                )}`}
          </button>

          <CommentForm
            commentField={commentField}
            handleExpandComments={handleExpandComments}
            habit_id={habit_id}
          />
        </footer>

        {isMyHabit && !editMode && (
          <button onClick={confirmDelete} className="HabitCard__delete-btn">
            delete
          </button>
        )}

        {isMyHabit && !editMode && (
          <button onClick={handleEditToggle} className="HabitCard__edit-btn">
            edit
          </button>
        )}
      </div>

      {deleteConfirm && (
        <DeleteConfirmation
          closeModal={() => setDeleteConfirm(false)}
          user_id={user_id}
          habit_id={habit_id}
          dispatch={dispatch}
          title={title}
        />
      )}

      {commentsExpanded && (
        <CommentsContainer setComments={setComments} comments={comments} />
      )}
    </div>
  );
};

export default HabitCard;
