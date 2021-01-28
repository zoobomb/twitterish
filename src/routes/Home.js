import { dbService, storageService } from "myFirebase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((obj) => (
          <Tweet
            key={obj.id}
            tweetObj={obj}
            isOwner={obj.creatorId === userObj.uid ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
