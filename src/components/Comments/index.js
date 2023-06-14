import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
    commentsCount: 0,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
    console.log(formatDistanceToNow(new Date()))
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    this.setState(prevState => ({commentsCount: prevState.commentsCount + 1}))

    const randomIndex = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length,
    )

    const bgColor = initialContainerBackgroundClassNames[randomIndex]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      randomBgColor: bgColor,
      time: formatDistanceToNow(new Date()),
      isToggled: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const updatedCommentList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: updatedCommentList})
    this.setState(prevState => ({commentsCount: prevState.commentsCount - 1}))
  }

  isLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isToggled: !eachComment.isToggled}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, comment, commentsList, commentsCount} = this.state

    return (
      <div className="bg-container">
        <h1 className="comments-heading">Comments</h1>
        <div className="container">
          <form className="comments-card" onSubmit={this.onAddComment}>
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              value={name}
              className="name-input"
              onChange={this.onChangeName}
              placeholder="Your Name"
            />
            <textarea
              value={comment}
              className="user-comment"
              rows={7}
              cols={20}
              onChange={this.onChangeComment}
              placeholder="Your Comment"
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="image"
              alt="comments"
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <p className="comments">
          <span className="comments-count">{commentsCount}</span> comments
        </p>

        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              commentDetails={eachComment}
              key={eachComment.id}
              onDeleteComment={this.onDeleteComment}
              isLiked={this.isLiked}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
