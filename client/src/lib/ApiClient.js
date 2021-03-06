import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, {board})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(id, callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL + `/${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(list, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, list)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  editList: function(list, callback) {
    return axios
      .patch(routes.EDIT_LIST_URL + `/${list.id}`, {title: list.title})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(card, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, card)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  fetchCard: function(id, callback) {
    return axios
      .get(routes.FETCH_CARD_URL + `/${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  editCard: function(id, card, callback) {
    return axios
      .put(routes.EDIT_CARD_URL + `/${id}`, card)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function(comment, callback) {
    return axios
      .post(routes.CREATE_COMMENT_URL, comment)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
};

export default apiClient;
