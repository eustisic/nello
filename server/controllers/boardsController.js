const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt")
    .then(boards => {
      res.json({
        boards,
      })
    })
};

const getBoard = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(Number(req.params.id));
    let foundBoard = await Board.findById(id);
    if (foundBoard) {
      res.json(foundBoard);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }  
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const seedBoard = async (req, res, next) => {
  const newBoard = new Board({title: "home"});

  const savedBoard = await newBoard.save();

  res.json(savedBoard);
};

const seedList = async (req, res, next) => {
  const foundBoard = await Board.findById("605a318bd31e8436f433b003");

  const newList = new List({title: "home", boardId: foundBoard.id, position: 655350});

  const savedBoard = await newBoard.save();

  res.json(savedBoard);
};

exports.getBoards = getBoards;
exports.getBoard = getBoard;
exports.createBoard = createBoard;
exports.seeBoard = seedBoard;
exports.seeList = seedList;
