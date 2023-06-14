// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, onDeleteComment, isLiked} = props

  console.log(commentDetails)

  const {id, name, comment, randomBgColor, time, isToggled} = commentDetails

  console.log(randomBgColor)
  console.log(isToggled)

  const onDelete = () => {
    onDeleteComment(id)
  }

  const onLiked = () => {
    isLiked(id)
  }

  const isLikedUrl = isToggled
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const isLikedText = isToggled ? 'liked' : 'like'

  return (
    <li className="comment-con">
      <div className="profile-container">
        <p className={`initial-name ${randomBgColor}`}>{name.slice(0, 1)}</p>
        <p className="name">{name}</p>
        <p className="time">{time}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-delete-container">
        <div className="like-container">
          <img src={isLikedUrl} className="like-image" alt="like" />
          <button className="like-button" type="button" onClick={onLiked}>
            <p className={isLikedText}>Like</p>
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
