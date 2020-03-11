import React from "react";
import "firebase/firestore";
import firebase from "../firebase";
import Fire from "../functions/firestore-methods";

const QueuesList = ({ title, id, dataRef } = this.props) => {
  // const addToFirebase = (playing, theData) => {
  //   var fire = new Fire("queues", "availQueues", {
  //     playing: playing,
  //     queueLists: theData.map(x => x)
  //   });
  //   fire.update();
  // };

  const DeleteQueueData = param => e => {
    const holder = dataRef;
    let { id } = param;
    let targetVal = holder.splice(id, 1);
    let bin = holder[0];
    let result = holder.filter(target => target !== targetVal);
    // var fire = new Fire("queues", "availQueues", {
    //   playing: bin,
    //   queueLists: result.map(x => x)
    // });
    var fire = new Fire(
      "queues",
      "availQueues",
      param.id == 0
        ? { playing: bin, queueLists: result.map(x => x) }
        : { queueLists: result.map(x => x) }
    );
    fire.update();
    // addToFirebase(bin, result);
  };

  return (
    <li className="compo-queues__item">
      <span className="compo-queues__item-title">{title}</span>
      <span className="compo-queues__item-channel">Logic</span>
      <span className="compo-queue__item-duration">4:26</span>
      <button
        className="compo-queues__item-del-ctrl"
        data-id={id}
        onClick={DeleteQueueData({ id })}
      >
        <span></span>
      </button>
    </li>
  );
};

export default QueuesList;
