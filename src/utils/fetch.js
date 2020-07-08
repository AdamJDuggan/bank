import axios from "axios";

const fetch = {
  news: (query) =>
    axios
      .get(
        "http://newsapi.org/v2/everything?" +
          `q=${query}&` +
          "pageSize=6&" +
          "apiKey=3099d160583f404baa88e637d52ecba4"
      )
      .then((res) => {
        return res;
      }),

  standings: () =>
    axios
      .get("https://api.football-data.org/v2/competitions/PL/standings", {
        headers: { "X-Auth-Token": "ad9e6022842a4b69ac8afb503a2ec1b1" },
      })
      .then((res) => {
        return res.data.standings[0].table;
      }),
};

export default fetch;
