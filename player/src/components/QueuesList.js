import React from "react";
import "firebase/firestore";
import fire from "../config/Config";
import { Draggable } from "react-beautiful-dnd";

const QueuesList = (
  { title, id, dataRef, channel, getNowPlaying } = this.props
) => {
  const DeleteQueueData = (param) => (e) => {
    const holder = dataRef;
    let result = "";
    let { id } = param;
    if (param.id > 0) {
      let targetVal = holder.splice(id, 1);
      result = holder.filter((target) => target !== targetVal);
      fire.database().ref().child("queueLists").set(result);
    } else {
      result = [...holder];
      result.shift();
      fire.database().ref().child("queueLists").set(result);
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    transition: "all .2s ease-in-out",
    borderRadius: isDragging ? "8px" : "0",
    background: isDragging ? "#543d3d" : "transparent",
    boxShadow: isDragging ? "0px 2px 3px #111" : "none",
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={String(id)} index={id}>
      {(provided, snapshot) => (
        <li
          className="compo-queues__item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <span className="compo-queues__item-title">{title}</span>
          <span className="compo-queues__item-channel">{channel}</span>
          <span className="compo-queue__item-duration">4:26</span>
          <button
            className="compo-queues__item-del-ctrl"
            data-id={id}
            onClick={DeleteQueueData({ id })}
          >
            <span></span>
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default QueuesList;
