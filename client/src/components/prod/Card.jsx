// template for a single card
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import * as actions from "../../actions/CardActions";
// import { useDispatch, useSelector } from "react-redux";
const style = {
  cursor: 'move',
};

const Card = ({ card }) => {
  const { title, dueDate, description, labels, listId, id } = card;
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.CARD,
      item: { title },
      end: (item, monitor) => {
          const dropResult = monitor.getDropResult();
          if (item && dropResult) {
              alert(`You dropped ${item.title} into ${dropResult.title}!`);
              dispatch(actions.editCard(id, { card: { listId: dropResult.id }}));
          }
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
      }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Link to={`/cards/${card.id}`}>
      <div 
        className="card-background" 
        ref={drag} 
        role="Box" 
        style={{ ...style, opacity }} 
        data-testid={`card-${title}`}
      >
        <div className="card">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {
              labels.map((label, idx) => {
                return <div key={idx} className={`card-label ${label} colorblindable`}></div>
              })
            }
            <p>{title}</p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              {dueDate}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
