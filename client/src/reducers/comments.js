/* eslint-disable no-console */
export default function comments(state = [], action) {
  switch (action.type) {
    case "FETCH_CARD_SUCCESS": {
      let {comments} = action.card;
      return comments;
    }
    case "CREATE_COMMENT_SUCCESS": {
      let comment = action.comment
      return state.concat(comment)
    }
    default:
      return state;
  }
}
