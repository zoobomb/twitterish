import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(tweetObj, newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
    setNewTweet("");
  };
  const onChange = (event) => {
    setNewTweet(event.target.value);
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this tweet?");
    if (ok) {
      // delete tweet
      // console.log(ok);
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  return (
    <div className='tweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container tweetEdit'>
            <input
              type='text'
              placeholder=''
              value={newTweet}
              required
              autofocus
              onChange={onChange}
              className='formInput'
            />
            <input type='submit' value='Update Tweet' className='formBtn' />
          </form>
          <span onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div class='tweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
                Edit
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
