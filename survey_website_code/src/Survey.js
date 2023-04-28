import React, { useState, useEffect } from "react";
import axios from "axios";

function Survey() {
  const [token, setToken] = useState(null);
  const [songs, setSongs] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");

  const handleScoreChange = (id, score) => {
    setScores({
      ...scores,
      [id]: score,
    });
  };

  const handlePersonalityScoreChange = (id, score) => {
    setPersonalityTraits(
      personalityTraits.map((trait) => {
        if (trait.id === id) {
          return {
            ...trait,
            score: score,
          };
        } else {
          return trait;
        }
      })
    );
  };

  const [personalityTraits, setPersonalityTraits] = useState([
    { id: 1, question: "is talkative", score: 3 },
    { id: 2, question: "tends to find fault with others", score: 3 },
    { id: 3, question: "does a thorough job", score: 3 },
    { id: 4, question: "is depressed, blue", score: 3 },
    { id: 5, question: "is original, comes up with new ideas", score: 3 },
    { id: 6, question: "is reserved", score: 3 },
    { id: 7, question: "is helpful and unselfish with others", score: 3 },
    { id: 8, question: "can be somewhat careless", score: 3 },
    { id: 9, question: "is relaxed, handles stress well", score: 3 },
    { id: 10, question: "is curious about many different things", score: 3 },
    { id: 11, question: "is full of energy", score: 3 },
    { id: 12, question: "starts quarrels with others", score: 3 },
    { id: 13, question: "is a reliable worker", score: 3 },
    { id: 14, question: "can be tense", score: 3 },
    { id: 15, question: "is ingenious, a deep thinker", score: 3 },
    { id: 16, question: "generates a lot of enthusiasm", score: 3 },
    { id: 17, question: "has a forgiving nature", score: 3 },
    { id: 18, question: "tends to be disorganized", score: 3 },
    { id: 19, question: "worries a lot", score: 3 },
    { id: 20, question: "has an active imagination", score: 3 },
    { id: 21, question: "tends to be quiet", score: 3 },
    { id: 22, question: "is generally trusting", score: 3 },
    { id: 23, question: "tends to be lazy", score: 3 },
    { id: 24, question: "is emotionally stable, not easily upset", score: 3 },
    { id: 25, question: "is inventive", score: 3 },
    { id: 26, question: "has an assertive personality", score: 3 },
    { id: 27, question: "can be cold and aloof", score: 3 },
    { id: 28, question: "perseveres until the task is finished", score: 3 },
    { id: 29, question: "can be moody", score: 3 },
    { id: 30, question: "values artistic, aesthetic experiences", score: 3 },
    { id: 31, question: "is sometimes shy, inhibited", score: 3 },
    { id: 32, question: "is considerate and kind to almost everyone", score: 3 },
    { id: 33, question: "does things efficiently", score: 3 },
    { id: 34, question: "remains calm in tense situations", score: 3 },
    { id: 35, question: "prefers work that is routine", score: 3 },
    { id: 36, question: "is outgoing, sociable", score: 3 },
    { id: 37, question: "is sometimes rude to to others", score: 3 },
    { id: 38, question: "makes plans and follows through with them", score: 3 },
    { id: 39, question: "gets nervous easily", score: 3 },
    { id: 40, question: "likes to reflect, play with ideas", score: 3 },
    { id: 41, question: "has few artistic interests", score: 3 },
    { id: 42, question: "likes to cooperate with others", score: 3 },
    { id: 43, question: "is easily distracted", score: 3 },
    { id: 44, question: "is sophisticated in art, music or literature", score: 3 },
  ]);

  // Spotify authentication
  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";

    if (hash.access_token) {
      console.log("HERE");
      console.log(hash.access_token);
      setToken(hash.access_token);
      console.log(token);
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + hash.access_token,
          },
        })
        .then((res) => {
          setUser(res.data);
        });
    }
  }, []);

  // Retrieve user's top songs
  useEffect(() => {
    if (token) {
      console.log("Reached new place");
      console.log(token);
      const shortTermPromise = axios.get("https://api.spotify.com/v1/me/top/tracks", {
        params: {
          time_range: "short_term",
          limit: 15,
        },
        headers: {
          Authorization: "Bearer " + token,
          // Authorization: "Bearer BQASNreFZ62vL4gQ8COgh_fKIozd67TJFVpH0QKNlPyj1K6mAY4BJ4FxcgkufEb-kBQll1uaoBtxaYUxOoF47BQDcWIKXDOr-YGu_Ixrco28ztkatkaQemsq5mCbapJmia6wt-lnvqMdaRWXM2EzdIxknyTa4vwoZdHwlXmq8QGZDn_e9mFVXsz-602pidsrpWQZUr4zFUr-Jmee0WnHPxPkRsf-Y74uCwJkfAeIpQ",
        },
      });
      const longTermPromise = axios.get("https://api.spotify.com/v1/me/top/tracks", {
        params: {
          time_range: "long_term",
          limit: 20,
        },
        headers: {
          // Authorization: "Bearer BQASNr  eFZ62vL4gQ8COgh_fKIozd67TJFVpH0QKNlPyj1K6mAY4BJ4FxcgkufEb-kBQll1uaoBtxaYUxOoF47BQDcWIKXDOr-YGu_Ixrco28ztkatkaQemsq5mCbapJmia6wt-lnvqMdaRWXM2EzdIxknyTa4vwoZdHwlXmq8QGZDn_e9mFVXsz-602pidsrpWQZUr4zFUr-Jmee0WnHPxPkRsf-Y74uCwJkfAeIpQ",
          Authorization: "Bearer " + token,
        },
      });

      Promise.all([shortTermPromise, longTermPromise])
        .then((res) => {
          const shortTermSongs = res[0].data.items;
          const longTermSongs = res[1].data.items.filter((song) => {
            return !shortTermSongs.some((s) => s.id === song.id);
          });
          const combinedSongs = [...shortTermSongs, ...longTermSongs];
          setSongs(combinedSongs);
          setScores(
            combinedSongs.reduce(
              (scores, song) => ({
                ...scores,
                [song.id]: 3,
              }),
              {}
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  // Render loading indicator if data is being fetched
  if (!token || songs.length === 0) {
    console.log("token: ", token);
    console.log("songs: ", songs);
    if (sessionStorage.getItem("access_token") != null) {
      setToken(sessionStorage.getItem("access_token"));
    }
    console.log("LOADING");
    return <div>Loading...</div>;
  }

  // Render user's top songs if logged in
  return (
    <div>
      <div class="container">
        <h1>Your Top 20 Songs:</h1>
        <div class="form-box">
          <ol>
            {songs.map((song) => (
              <li key={song.id}>
                <div>
                  <span style={{ color: "darkblue", fontWeight: "bold" }}>{song.name} </span>
                  <span style={{ color: "grey" }}>by </span>
                  <span style={{ color: "black", fontWeight: "bold" }}>{song.artists[0].name}</span>
                </div>
                <input
                  style={{ width: "50%" }}
                  type="range"
                  min={1}
                  max={5}
                  value={scores[song.id]}
                  onChange={(e) => handleScoreChange(song.id, parseInt(e.target.value))}
                />
                <label>{scores[song.id]}</label>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="container">
        <h1>A bit about yourself</h1>
        <div className="form-box">
          <ul>
            {personalityTraits.map((trait) => (
              <li key={trait.id}>
                <div>
                  <span className="questionBegin">I see Myself as Someone Who </span>
                  <span className="questionSpan">{trait.question}</span>
                </div>
                &nbsp;
                &nbsp;
                <input className="sliderHalf"
                  style={{ width: "50%" }}
                  type="range"
                  min={1}
                  max={5}
                  value={trait.score}
                  onChange={(e) =>
                    handlePersonalityScoreChange(
                      trait.id,
                      parseInt(e.target.value)
                    )
                  }
                />
                <label>{trait.score}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Survey;
