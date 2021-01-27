import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  /* oldschool...
  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    // console.log(userObj.uid);
    dbTweets.forEach((document) => {
      //   console.log(document.data());
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
    console.log(dbTweets); // quarySnapShat
  };
  */
  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => {
      //   console.log("Something happened!");
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []); // component is mounted

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (event) => {
    setTweet(event.target.value);
    // console.log(tweet);
  };

  //   console.log(tweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type='submit' value='Tweet' />
      </form>
      <div>
        {tweets.map((obj) => (
          <div key={obj.id}>
            <h4>{obj.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
