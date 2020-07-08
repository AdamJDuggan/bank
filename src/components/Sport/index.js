// React
import React, { useState, useEffect } from "react";

// 3rd party
import classnames from "classnames";

// Styles
import styles from "./index.module.scss";

// Components
import { Button } from "../Button";

// Utils
import fetch from "../../utils/fetch";

/** Component describtion */
function Sport(props) {
  const [sport, setSport] = useState("premier-league");
  const [stories, updateStories] = useState([]);
  const [standings, updateStandings] = useState([]);

  useEffect(() => {
    fetch.news(sport).then((res) => updateStories(res.data.articles));
    fetch.standings().then((res) => updateStandings(res));
    return () => {
      updateStories([]);
    };
  }, [sport]);

  return (
    <main className="secondary p-2">
      <header className="row ph-2">
        <h1 className="size-5 bold">Sport</h1>
      </header>
      <div className="row mb-6">
        <Button
          size="large"
          styles={sport === "premier-league" ? "textTertiary" : "textPrimary"}
          label="Football"
          onClick={() => setSport("premier-league")}
        />
        <Button
          size="large"
          styles={sport === "nfl" ? "textTertiary" : "textPrimary"}
          label="NFL"
          onClick={() => setSport("nfl")}
        />
        <Button
          size="large"
          styles={sport === "nhl" ? "textTertiary" : "textPrimary"}
          label="NHL"
          onClick={() => setSport("nhl")}
        />
        <Button
          size="large"
          styles={sport === "tottenham-spurs" ? "textTertiary" : "textPrimary"}
          label="Spurs"
          onClick={() => setSport("tottenham-spurs")}
        />
      </div>
      {sport === "premier-league" && (
        <div className={styles.table}>
          <div className={classnames(styles.tableRow, styles.tableHeader)}>
            <p></p>
            <p>Team</p>
            <p>GP</p>
            <p>W</p>
            <p>D</p>
            <p>L</p>
            <p>P</p>
          </div>
          {standings &&
            standings.map((team, index) => (
              <div
                key={team.team.name}
                className={classnames(
                  styles.tableRow,
                  index % 2 === 0 && styles.even
                )}
              >
                <p>{team.position}</p>
                <p className="bold">{team.team.name}</p>
                <p>{team.playedGames}</p>
                <p>{team.won}</p>
                <p>{team.draw}</p>
                <p>{team.lost}</p>
                <p className="bold">{team.points}</p>
              </div>
            ))}
        </div>
      )}

      {stories.map((story) => (
        <a
          key={story.title}
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classnames(
            styles.story,
            " pointerCursor noDecoration pb-3"
          )}
        >
          <img
            alt="story"
            src={story.urlToImage}
            className={classnames(styles.image, "mr-2")}
          />
          <p>{story.title}</p>
        </a>
      ))}
    </main>
  );
}

export { Sport };
