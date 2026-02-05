/**
 * Script to add missing retired players (2000-2014) with 10+ career WAR
 * to war-data.json.
 *
 * Data sourced from Baseball Reference final-year pages and career WAR records.
 * Run: node scripts/add-missing-retired-players.cjs
 */
const fs = require('fs');
const path = require('path');

const WAR_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'war-data.json');

// Missing players with 10+ career WAR who retired 2000-2014
// Format: { playerId, playerName, bbrefId, positionCategory, careerWAR, isHOF?, seasons: [{season, war, team, age}] }
const MISSING_PLAYERS = [
  // ===== 2000 Retirements =====
  {
    playerId: 116566, playerName: "Will Clark", bbrefId: "clarkwi02", positionCategory: "1B",
    careerWAR: 56.5, seasons: [
      {season:1986,war:2.4,team:"SFG",age:22},{season:1987,war:4.5,team:"SFG",age:23},{season:1988,war:5.4,team:"SFG",age:24},
      {season:1989,war:7.3,team:"SFG",age:25},{season:1990,war:3.3,team:"SFG",age:26},{season:1991,war:5.5,team:"SFG",age:27},
      {season:1992,war:3.5,team:"SFG",age:28},{season:1993,war:3.1,team:"SFG",age:29},{season:1994,war:3.6,team:"TEX",age:30},
      {season:1995,war:5.5,team:"TEX",age:31},{season:1996,war:2.3,team:"TEX",age:32},{season:1997,war:3.5,team:"TEX",age:33},
      {season:1998,war:2.6,team:"TEX",age:34},{season:1999,war:1.3,team:"BAL",age:35},{season:2000,war:2.6,team:"STL",age:36}
    ]
  },
  {
    playerId: 110810, playerName: "Albert Belle", bbrefId: "belleal01", positionCategory: "LF",
    careerWAR: 40.1, seasons: [
      {season:1989,war:-0.3,team:"CLE",age:22},{season:1990,war:0.5,team:"CLE",age:23},{season:1991,war:2.7,team:"CLE",age:24},
      {season:1992,war:2.8,team:"CLE",age:25},{season:1993,war:4.1,team:"CLE",age:26},{season:1994,war:5.3,team:"CLE",age:27},
      {season:1995,war:6.5,team:"CLE",age:28},{season:1996,war:5.7,team:"CLE",age:29},{season:1997,war:2.8,team:"CHW",age:30},
      {season:1998,war:4.8,team:"CHW",age:31},{season:1999,war:3.2,team:"BAL",age:32},{season:2000,war:2.0,team:"BAL",age:33}
    ]
  },
  {
    playerId: 116156, playerName: "Gary Gaetti", bbrefId: "gaettga01", positionCategory: "3B",
    careerWAR: 42.1, seasons: [
      {season:1981,war:0.9,team:"MIN",age:23},{season:1982,war:2.0,team:"MIN",age:24},{season:1983,war:2.8,team:"MIN",age:25},
      {season:1984,war:3.9,team:"MIN",age:26},{season:1985,war:2.0,team:"MIN",age:27},{season:1986,war:5.2,team:"MIN",age:28},
      {season:1987,war:3.4,team:"MIN",age:29},{season:1988,war:4.7,team:"MIN",age:30},{season:1989,war:1.2,team:"MIN",age:31},
      {season:1990,war:2.2,team:"MIN",age:32},{season:1991,war:1.2,team:"CAL",age:33},{season:1992,war:1.2,team:"CAL",age:34},
      {season:1993,war:2.4,team:"KCR",age:35},{season:1994,war:0.8,team:"KCR",age:36},{season:1995,war:1.6,team:"KCR",age:37},
      {season:1996,war:2.0,team:"STL",age:38},{season:1997,war:0.7,team:"STL",age:39},{season:1998,war:1.1,team:"STL",age:40},
      {season:1999,war:1.3,team:"CHC",age:41},{season:2000,war:1.5,team:"BOS",age:42}
    ]
  },
  {
    playerId: 123787, playerName: "John Wetteland", bbrefId: "wettejo01", positionCategory: "RP",
    careerWAR: 16.2, seasons: [
      {season:1989,war:0.2,team:"LAD",age:22},{season:1990,war:-0.2,team:"LAD",age:23},{season:1991,war:-0.5,team:"LAD",age:24},
      {season:1992,war:2.4,team:"MON",age:25},{season:1993,war:3.5,team:"MON",age:26},{season:1994,war:0.9,team:"MON",age:27},
      {season:1995,war:2.2,team:"NYY",age:28},{season:1996,war:1.7,team:"NYY",age:29},{season:1997,war:1.4,team:"TEX",age:30},
      {season:1998,war:1.1,team:"TEX",age:31},{season:1999,war:1.7,team:"TEX",age:32},{season:2000,war:1.8,team:"TEX",age:33}
    ]
  },
  {
    playerId: 123357, playerName: "Devon White", bbrefId: "whitede02", positionCategory: "CF",
    careerWAR: 41.4, seasons: [
      {season:1985,war:0.5,team:"CAL",age:22},{season:1986,war:1.2,team:"CAL",age:23},{season:1987,war:3.2,team:"CAL",age:24},
      {season:1988,war:2.9,team:"CAL",age:25},{season:1989,war:3.0,team:"CAL",age:26},{season:1990,war:3.2,team:"CAL",age:27},
      {season:1991,war:6.2,team:"TOR",age:28},{season:1992,war:3.7,team:"TOR",age:29},{season:1993,war:4.2,team:"TOR",age:30},
      {season:1994,war:2.7,team:"TOR",age:31},{season:1995,war:3.8,team:"TOR",age:32},{season:1996,war:1.2,team:"FLA",age:33},
      {season:1997,war:1.9,team:"FLA",age:34},{season:1998,war:2.0,team:"ARI",age:35},{season:1999,war:0.7,team:"LAD",age:36},
      {season:2000,war:0.8,team:"MIL",age:37},{season:2001,war:0.2,team:"MIL",age:38}
    ]
  },

  // ===== 2001 Retirements =====
  {
    playerId: 118557, playerName: "Mark McGwire", bbrefId: "mcgwima01", positionCategory: "1B",
    careerWAR: 62.2, seasons: [
      {season:1986,war:1.0,team:"OAK",age:22},{season:1987,war:5.5,team:"OAK",age:23},{season:1988,war:2.4,team:"OAK",age:24},
      {season:1989,war:2.3,team:"OAK",age:25},{season:1990,war:3.3,team:"OAK",age:26},{season:1991,war:0.8,team:"OAK",age:27},
      {season:1992,war:5.5,team:"OAK",age:28},{season:1993,war:2.0,team:"OAK",age:29},{season:1994,war:1.4,team:"OAK",age:30},
      {season:1995,war:3.2,team:"OAK",age:31},{season:1996,war:6.9,team:"OAK",age:32},{season:1997,war:5.6,team:"OAK",age:33},
      {season:1998,war:8.9,team:"STL",age:34},{season:1999,war:6.5,team:"STL",age:35},{season:2000,war:3.7,team:"STL",age:36},
      {season:2001,war:3.2,team:"STL",age:37}
    ]
  },
  {
    playerId: 112466, playerName: "Jose Canseco", bbrefId: "cansejo01", positionCategory: "RF",
    careerWAR: 42.4, seasons: [
      {season:1985,war:2.0,team:"OAK",age:20},{season:1986,war:3.6,team:"OAK",age:21},{season:1987,war:2.8,team:"OAK",age:22},
      {season:1988,war:8.8,team:"OAK",age:23},{season:1989,war:1.7,team:"OAK",age:24},{season:1990,war:2.5,team:"OAK",age:25},
      {season:1991,war:4.1,team:"OAK",age:26},{season:1992,war:0.6,team:"OAK",age:27},{season:1993,war:0.7,team:"TEX",age:28},
      {season:1994,war:3.0,team:"TEX",age:29},{season:1995,war:0.8,team:"BOS",age:30},{season:1996,war:1.4,team:"BOS",age:31},
      {season:1997,war:2.5,team:"OAK",age:32},{season:1998,war:2.3,team:"TOR",age:33},{season:1999,war:0.6,team:"TBD",age:34},
      {season:2000,war:2.1,team:"TBD",age:35},{season:2001,war:2.9,team:"CHW",age:36}
    ]
  },
  {
    playerId: 112473, playerName: "Ken Caminiti", bbrefId: "caminke01", positionCategory: "3B",
    careerWAR: 33.5, seasons: [
      {season:1987,war:-0.3,team:"HOU",age:24},{season:1988,war:0.0,team:"HOU",age:25},{season:1989,war:1.1,team:"HOU",age:26},
      {season:1990,war:1.0,team:"HOU",age:27},{season:1991,war:0.3,team:"HOU",age:28},{season:1992,war:0.8,team:"HOU",age:29},
      {season:1993,war:1.4,team:"HOU",age:30},{season:1994,war:3.3,team:"HOU",age:31},{season:1995,war:2.3,team:"SDP",age:32},
      {season:1996,war:9.5,team:"SDP",age:33},{season:1997,war:5.1,team:"SDP",age:34},{season:1998,war:3.9,team:"SDP",age:35},
      {season:1999,war:1.6,team:"HOU",age:36},{season:2000,war:2.4,team:"HOU",age:37},{season:2001,war:1.1,team:"ATL",age:38}
    ]
  },
  {
    playerId: 113858, playerName: "Eric Davis", bbrefId: "daviser01", positionCategory: "CF",
    careerWAR: 36.1, seasons: [
      {season:1984,war:0.0,team:"CIN",age:22},{season:1985,war:1.2,team:"CIN",age:23},{season:1986,war:4.2,team:"CIN",age:24},
      {season:1987,war:7.5,team:"CIN",age:25},{season:1988,war:1.7,team:"CIN",age:26},{season:1989,war:4.2,team:"CIN",age:27},
      {season:1990,war:4.9,team:"CIN",age:28},{season:1991,war:1.1,team:"CIN",age:29},{season:1992,war:0.2,team:"LAD",age:30},
      {season:1993,war:0.2,team:"LAD",age:31},{season:1994,war:0.2,team:"DET",age:32},{season:1996,war:0.3,team:"CIN",age:34},
      {season:1997,war:3.3,team:"BAL",age:35},{season:1998,war:1.0,team:"BAL",age:36},{season:1999,war:0.9,team:"STL",age:37},
      {season:2000,war:1.7,team:"STL",age:38},{season:2001,war:3.5,team:"SFG",age:39}
    ]
  },
  {
    playerId: 111072, playerName: "Bobby Bonilla", bbrefId: "bonilbo01", positionCategory: "RF",
    careerWAR: 30.3, seasons: [
      {season:1986,war:2.2,team:"PIT",age:23},{season:1987,war:1.3,team:"PIT",age:24},{season:1988,war:4.3,team:"PIT",age:25},
      {season:1989,war:2.2,team:"PIT",age:26},{season:1990,war:4.1,team:"PIT",age:27},{season:1991,war:3.6,team:"PIT",age:28},
      {season:1992,war:1.5,team:"NYM",age:29},{season:1993,war:3.5,team:"NYM",age:30},{season:1994,war:-0.3,team:"NYM",age:31},
      {season:1995,war:1.2,team:"BAL",age:32},{season:1996,war:2.3,team:"BAL",age:33},{season:1997,war:1.3,team:"FLA",age:34},
      {season:1998,war:0.7,team:"FLA",age:35},{season:1999,war:0.3,team:"NYM",age:36},{season:2001,war:2.1,team:"STL",age:38}
    ]
  },
  {
    playerId: 112234, playerName: "Jay Buhner", bbrefId: "buhneja01", positionCategory: "RF",
    careerWAR: 23.0, seasons: [
      {season:1987,war:0.5,team:"NYY",age:22},{season:1988,war:1.2,team:"SEA",age:23},{season:1989,war:0.1,team:"SEA",age:24},
      {season:1990,war:0.9,team:"SEA",age:25},{season:1991,war:4.3,team:"SEA",age:26},{season:1992,war:1.1,team:"SEA",age:27},
      {season:1993,war:2.4,team:"SEA",age:28},{season:1994,war:1.2,team:"SEA",age:29},{season:1995,war:4.4,team:"SEA",age:30},
      {season:1996,war:4.5,team:"SEA",age:31},{season:1997,war:2.4,team:"SEA",age:32},{season:1998,war:0.6,team:"SEA",age:33},
      {season:1999,war:-0.5,team:"SEA",age:34},{season:2001,war:-0.1,team:"SEA",age:36}
    ]
  },
  {
    playerId: 111518, playerName: "Scott Brosius", bbrefId: "brosiso01", positionCategory: "3B",
    careerWAR: 15.7, seasons: [
      {season:1991,war:-0.1,team:"OAK",age:24},{season:1992,war:0.1,team:"OAK",age:25},{season:1993,war:-0.2,team:"OAK",age:26},
      {season:1994,war:0.8,team:"OAK",age:27},{season:1995,war:0.7,team:"OAK",age:28},{season:1996,war:4.0,team:"OAK",age:29},
      {season:1997,war:0.6,team:"OAK",age:30},{season:1998,war:5.2,team:"NYY",age:31},{season:1999,war:1.8,team:"NYY",age:32},
      {season:2000,war:1.4,team:"NYY",age:33},{season:2001,war:1.4,team:"NYY",age:34}
    ]
  },
  {
    playerId: 114085, playerName: "Steve Finley", bbrefId: "finlest01", positionCategory: "CF",
    careerWAR: 48.0, seasons: [
      {season:1989,war:1.4,team:"BAL",age:24},{season:1990,war:2.0,team:"BAL",age:25},{season:1991,war:2.3,team:"HOU",age:26},
      {season:1992,war:2.3,team:"HOU",age:27},{season:1993,war:1.3,team:"HOU",age:28},{season:1994,war:2.2,team:"HOU",age:29},
      {season:1995,war:4.5,team:"SDP",age:30},{season:1996,war:5.2,team:"SDP",age:31},{season:1997,war:3.3,team:"SDP",age:32},
      {season:1998,war:3.2,team:"SDP",age:33},{season:1999,war:5.2,team:"ARI",age:34},{season:2000,war:5.7,team:"ARI",age:35},
      {season:2001,war:2.1,team:"ARI",age:36},{season:2002,war:1.4,team:"ARI",age:37},{season:2003,war:0.4,team:"ARI",age:38},
      {season:2004,war:3.4,team:"ARI",age:39},{season:2005,war:0.1,team:"LAA",age:40},{season:2006,war:1.0,team:"SFG",age:41}
    ]
  },
  {
    playerId: 116787, playerName: "David Justice", bbrefId: "justida01", positionCategory: "RF",
    careerWAR: 38.1, seasons: [
      {season:1989,war:0.1,team:"ATL",age:23},{season:1990,war:1.8,team:"ATL",age:24},{season:1991,war:2.1,team:"ATL",age:25},
      {season:1992,war:2.3,team:"ATL",age:26},{season:1993,war:5.0,team:"ATL",age:27},{season:1994,war:1.3,team:"ATL",age:28},
      {season:1995,war:2.2,team:"ATL",age:29},{season:1996,war:1.1,team:"ATL",age:30},{season:1997,war:3.9,team:"CLE",age:31},
      {season:1998,war:2.1,team:"CLE",age:32},{season:1999,war:2.5,team:"CLE",age:33},{season:2000,war:5.0,team:"CLE",age:34},
      {season:2001,war:4.2,team:"NYY",age:35},{season:2002,war:4.5,team:"OAK",age:36}
    ]
  },
  {
    playerId: 116610, playerName: "Mark Grace", bbrefId: "gracema01", positionCategory: "1B",
    careerWAR: 46.4, seasons: [
      {season:1988,war:3.2,team:"CHC",age:24},{season:1989,war:4.7,team:"CHC",age:25},{season:1990,war:2.2,team:"CHC",age:26},
      {season:1991,war:2.7,team:"CHC",age:27},{season:1992,war:3.5,team:"CHC",age:28},{season:1993,war:5.0,team:"CHC",age:29},
      {season:1994,war:1.3,team:"CHC",age:30},{season:1995,war:4.4,team:"CHC",age:31},{season:1996,war:3.4,team:"CHC",age:32},
      {season:1997,war:2.2,team:"CHC",age:33},{season:1998,war:4.3,team:"CHC",age:34},{season:1999,war:2.3,team:"CHC",age:35},
      {season:2000,war:2.2,team:"ARI",age:36},{season:2001,war:2.1,team:"ARI",age:37},{season:2002,war:0.7,team:"ARI",age:38},
      {season:2003,war:2.2,team:"ARI",age:39}
    ]
  },
  {
    playerId: 120587, playerName: "Paul O'Neill", bbrefId: "o'neipa01", positionCategory: "RF",
    careerWAR: 34.1, seasons: [
      {season:1985,war:-0.2,team:"CIN",age:22},{season:1986,war:0.0,team:"CIN",age:23},{season:1987,war:0.4,team:"CIN",age:24},
      {season:1988,war:2.2,team:"CIN",age:25},{season:1989,war:2.7,team:"CIN",age:26},{season:1990,war:0.7,team:"CIN",age:27},
      {season:1991,war:1.5,team:"CIN",age:28},{season:1992,war:1.7,team:"CIN",age:29},{season:1993,war:3.0,team:"NYY",age:30},
      {season:1994,war:5.8,team:"NYY",age:31},{season:1995,war:2.1,team:"NYY",age:32},{season:1996,war:2.9,team:"NYY",age:33},
      {season:1997,war:3.2,team:"NYY",age:34},{season:1998,war:1.6,team:"NYY",age:35},{season:1999,war:0.7,team:"NYY",age:36},
      {season:2000,war:2.4,team:"NYY",age:37},{season:2001,war:3.4,team:"NYY",age:38}
    ]
  },
  {
    playerId: 122259, playerName: "B.J. Surhoff", bbrefId: "surhob.01", positionCategory: "LF",
    careerWAR: 26.3, seasons: [
      {season:1987,war:0.1,team:"MIL",age:22},{season:1988,war:-0.3,team:"MIL",age:23},{season:1989,war:0.7,team:"MIL",age:24},
      {season:1990,war:2.2,team:"MIL",age:25},{season:1991,war:0.6,team:"MIL",age:26},{season:1992,war:1.1,team:"MIL",age:27},
      {season:1993,war:0.7,team:"MIL",age:28},{season:1994,war:1.1,team:"MIL",age:29},{season:1995,war:1.1,team:"MIL",age:30},
      {season:1996,war:3.3,team:"BAL",age:31},{season:1997,war:1.2,team:"BAL",age:32},{season:1998,war:0.9,team:"BAL",age:33},
      {season:1999,war:4.2,team:"BAL",age:34},{season:2000,war:3.3,team:"BAL",age:35},{season:2001,war:1.7,team:"ATL",age:36},
      {season:2002,war:1.4,team:"ATL",age:37},{season:2003,war:0.2,team:"BAL",age:38},{season:2004,war:0.7,team:"BAL",age:39},
      {season:2005,war:2.0,team:"BAL",age:40}
    ]
  },
  {
    playerId: 123275, playerName: "Greg Vaughn", bbrefId: "vaughgr01", positionCategory: "LF",
    careerWAR: 26.3, seasons: [
      {season:1989,war:-0.2,team:"MIL",age:23},{season:1990,war:-0.2,team:"MIL",age:24},{season:1991,war:1.1,team:"MIL",age:25},
      {season:1992,war:3.2,team:"MIL",age:26},{season:1993,war:2.1,team:"MIL",age:27},{season:1994,war:1.5,team:"MIL",age:28},
      {season:1995,war:0.5,team:"MIL",age:29},{season:1996,war:3.5,team:"MIL",age:30},{season:1997,war:1.6,team:"SDP",age:31},
      {season:1998,war:5.0,team:"SDP",age:32},{season:1999,war:3.6,team:"CIN",age:33},{season:2000,war:2.9,team:"TBD",age:34},
      {season:2001,war:0.4,team:"TBD",age:35},{season:2003,war:1.3,team:"COL",age:37}
    ]
  },

  // ===== 2002 Retirements =====
  {
    playerId: 110674, playerName: "Brady Anderson", bbrefId: "anderbr01", positionCategory: "CF",
    careerWAR: 35.0, seasons: [
      {season:1988,war:0.2,team:"BOS",age:24},{season:1989,war:-0.1,team:"BAL",age:25},{season:1990,war:0.1,team:"BAL",age:26},
      {season:1991,war:1.1,team:"BAL",age:27},{season:1992,war:5.2,team:"BAL",age:28},{season:1993,war:2.1,team:"BAL",age:29},
      {season:1994,war:2.4,team:"BAL",age:30},{season:1995,war:2.5,team:"BAL",age:31},{season:1996,war:8.6,team:"BAL",age:32},
      {season:1997,war:5.3,team:"BAL",age:33},{season:1998,war:1.5,team:"BAL",age:34},{season:1999,war:3.3,team:"BAL",age:35},
      {season:2000,war:1.2,team:"BAL",age:36},{season:2001,war:1.0,team:"BAL",age:37},{season:2002,war:0.6,team:"CLE",age:38}
    ]
  },
  {
    playerId: 117267, playerName: "Chuck Knoblauch", bbrefId: "knoblch01", positionCategory: "2B",
    careerWAR: 35.1, seasons: [
      {season:1991,war:4.5,team:"MIN",age:22},{season:1992,war:2.5,team:"MIN",age:23},{season:1993,war:3.2,team:"MIN",age:24},
      {season:1994,war:4.3,team:"MIN",age:25},{season:1995,war:3.1,team:"MIN",age:26},{season:1996,war:6.2,team:"MIN",age:27},
      {season:1997,war:3.7,team:"MIN",age:28},{season:1998,war:2.6,team:"NYY",age:29},{season:1999,war:2.4,team:"NYY",age:30},
      {season:2000,war:1.3,team:"NYY",age:31},{season:2001,war:0.1,team:"NYY",age:32},{season:2002,war:1.2,team:"KCR",age:33}
    ]
  },
  {
    playerId: 114069, playerName: "Shawon Dunston", bbrefId: "dunstsh01", positionCategory: "SS",
    careerWAR: 11.6, seasons: [
      {season:1985,war:0.2,team:"CHC",age:22},{season:1986,war:0.9,team:"CHC",age:23},{season:1987,war:0.3,team:"CHC",age:24},
      {season:1988,war:1.2,team:"CHC",age:25},{season:1989,war:1.3,team:"CHC",age:26},{season:1990,war:0.2,team:"CHC",age:27},
      {season:1991,war:0.6,team:"CHC",age:28},{season:1992,war:0.1,team:"CHC",age:29},{season:1993,war:0.2,team:"CHC",age:30},
      {season:1994,war:-0.3,team:"CHC",age:31},{season:1995,war:0.2,team:"CHC",age:32},{season:1996,war:2.2,team:"CHC",age:33},
      {season:1997,war:1.2,team:"PIT",age:34},{season:1998,war:1.3,team:"CLE",age:35},{season:1999,war:0.6,team:"STL",age:36},
      {season:2000,war:0.6,team:"STL",age:37},{season:2001,war:-0.1,team:"SFG",age:38},{season:2002,war:1.1,team:"SFG",age:39}
    ]
  },

  // ===== 2003 Retirements =====
  {
    playerId: 110502, playerName: "Jay Bell", bbrefId: "bellja01", positionCategory: "SS",
    careerWAR: 37.2, seasons: [
      {season:1986,war:-0.1,team:"CLE",age:20},{season:1987,war:0.2,team:"CLE",age:21},{season:1989,war:1.2,team:"PIT",age:23},
      {season:1990,war:2.2,team:"PIT",age:24},{season:1991,war:4.2,team:"PIT",age:25},{season:1992,war:3.5,team:"PIT",age:26},
      {season:1993,war:5.1,team:"PIT",age:27},{season:1994,war:1.0,team:"PIT",age:28},{season:1995,war:1.5,team:"PIT",age:29},
      {season:1996,war:3.2,team:"PIT",age:30},{season:1997,war:2.4,team:"KCR",age:31},{season:1998,war:2.9,team:"ARI",age:32},
      {season:1999,war:5.2,team:"ARI",age:33},{season:2000,war:2.0,team:"ARI",age:34},{season:2001,war:0.7,team:"ARI",age:35},
      {season:2002,war:0.3,team:"ARI",age:36},{season:2003,war:1.6,team:"NYM",age:37}
    ]
  },
  {
    playerId: 116533, playerName: "Ron Gant", bbrefId: "gantro01", positionCategory: "LF",
    careerWAR: 34.1, seasons: [
      {season:1987,war:-0.3,team:"ATL",age:22},{season:1988,war:0.3,team:"ATL",age:23},{season:1989,war:0.7,team:"ATL",age:24},
      {season:1990,war:4.1,team:"ATL",age:25},{season:1991,war:3.3,team:"ATL",age:26},{season:1992,war:4.2,team:"ATL",age:27},
      {season:1993,war:1.2,team:"ATL",age:28},{season:1995,war:2.9,team:"CIN",age:30},{season:1996,war:3.6,team:"STL",age:31},
      {season:1997,war:2.2,team:"STL",age:32},{season:1998,war:2.5,team:"STL",age:33},{season:1999,war:3.5,team:"PHI",age:34},
      {season:2000,war:2.3,team:"PHI",age:35},{season:2001,war:1.2,team:"COL",age:36},{season:2002,war:0.8,team:"SDP",age:37},
      {season:2003,war:1.6,team:"OAK",age:38}
    ]
  },
  {
    playerId: 111059, playerName: "Mike Bordick", bbrefId: "bordimi01", positionCategory: "SS",
    careerWAR: 26.8, seasons: [
      {season:1990,war:0.1,team:"OAK",age:24},{season:1991,war:0.8,team:"OAK",age:25},{season:1992,war:2.5,team:"OAK",age:26},
      {season:1993,war:2.2,team:"OAK",age:27},{season:1994,war:1.3,team:"OAK",age:28},{season:1995,war:2.2,team:"OAK",age:29},
      {season:1996,war:3.0,team:"OAK",age:30},{season:1997,war:1.4,team:"BAL",age:31},{season:1998,war:3.1,team:"BAL",age:32},
      {season:1999,war:2.6,team:"BAL",age:33},{season:2000,war:3.1,team:"BAL",age:34},{season:2001,war:2.1,team:"BAL",age:35},
      {season:2002,war:0.9,team:"BAL",age:36},{season:2003,war:1.5,team:"TOR",age:37}
    ]
  },
  {
    playerId: 120871, playerName: "Rafael Palmeiro", bbrefId: "palmera01", positionCategory: "1B",
    careerWAR: 55.2, seasons: [
      {season:1986,war:0.4,team:"CHC",age:21},{season:1987,war:0.2,team:"CHC",age:22},{season:1988,war:3.3,team:"CHC",age:23},
      {season:1989,war:3.2,team:"TEX",age:24},{season:1990,war:4.9,team:"TEX",age:25},{season:1991,war:3.3,team:"TEX",age:26},
      {season:1992,war:1.5,team:"TEX",age:27},{season:1993,war:4.4,team:"TEX",age:28},{season:1994,war:1.8,team:"BAL",age:29},
      {season:1995,war:3.3,team:"BAL",age:30},{season:1996,war:3.3,team:"BAL",age:31},{season:1997,war:1.9,team:"BAL",age:32},
      {season:1998,war:5.2,team:"BAL",age:33},{season:1999,war:4.2,team:"TEX",age:34},{season:2000,war:2.8,team:"TEX",age:35},
      {season:2001,war:3.6,team:"TEX",age:36},{season:2002,war:2.2,team:"TEX",age:37},{season:2003,war:2.7,team:"TEX",age:38},
      {season:2004,war:1.1,team:"BAL",age:39},{season:2005,war:1.9,team:"BAL",age:40}
    ]
  },
  {
    playerId: 116483, playerName: "Marquis Grissom", bbrefId: "grissma02", positionCategory: "CF",
    careerWAR: 36.6, seasons: [
      {season:1989,war:0.1,team:"MON",age:22},{season:1990,war:0.3,team:"MON",age:23},{season:1991,war:2.2,team:"MON",age:24},
      {season:1992,war:5.7,team:"MON",age:25},{season:1993,war:3.3,team:"MON",age:26},{season:1994,war:3.2,team:"MON",age:27},
      {season:1995,war:3.2,team:"ATL",age:28},{season:1996,war:1.3,team:"ATL",age:29},{season:1997,war:4.2,team:"CLE",age:30},
      {season:1998,war:0.3,team:"CLE",age:31},{season:1999,war:1.3,team:"MIL",age:32},{season:2000,war:2.6,team:"MIL",age:33},
      {season:2001,war:1.1,team:"LAD",age:34},{season:2002,war:4.2,team:"LAD",age:35},{season:2003,war:1.2,team:"SFG",age:36},
      {season:2004,war:1.5,team:"SFG",age:37},{season:2005,war:0.9,team:"SFG",age:38}
    ]
  },
  {
    playerId: 117585, playerName: "Kenny Lofton", bbrefId: "loftoke01", positionCategory: "CF",
    careerWAR: 55.3, seasons: [
      {season:1991,war:0.4,team:"HOU",age:24},{season:1992,war:5.7,team:"CLE",age:25},{season:1993,war:3.4,team:"CLE",age:26},
      {season:1994,war:6.6,team:"CLE",age:27},{season:1995,war:4.1,team:"CLE",age:28},{season:1996,war:5.8,team:"CLE",age:29},
      {season:1997,war:4.3,team:"ATL",age:30},{season:1998,war:2.5,team:"CLE",age:31},{season:1999,war:4.1,team:"CLE",age:32},
      {season:2000,war:3.5,team:"CLE",age:33},{season:2001,war:2.3,team:"CLE",age:34},{season:2002,war:3.2,team:"CHW",age:35},
      {season:2003,war:2.7,team:"CHC",age:36},{season:2004,war:2.2,team:"NYY",age:37},{season:2005,war:1.0,team:"PHI",age:38},
      {season:2006,war:1.7,team:"LAD",age:39},{season:2007,war:1.8,team:"CLE",age:40}
    ]
  },
  {
    playerId: 122690, playerName: "Robin Ventura", bbrefId: "venturo01", positionCategory: "3B",
    careerWAR: 41.0, seasons: [
      {season:1989,war:0.4,team:"CHW",age:22},{season:1990,war:0.7,team:"CHW",age:23},{season:1991,war:5.1,team:"CHW",age:24},
      {season:1992,war:5.4,team:"CHW",age:25},{season:1993,war:4.2,team:"CHW",age:26},{season:1994,war:1.9,team:"CHW",age:27},
      {season:1995,war:2.2,team:"CHW",age:28},{season:1996,war:3.5,team:"CHW",age:29},{season:1997,war:3.2,team:"CHW",age:30},
      {season:1998,war:2.3,team:"CHW",age:31},{season:1999,war:5.0,team:"NYM",age:32},{season:2000,war:2.3,team:"NYM",age:33},
      {season:2001,war:2.9,team:"NYM",age:34},{season:2002,war:0.2,team:"NYY",age:35},{season:2003,war:1.3,team:"NYY",age:36},
      {season:2004,war:0.4,team:"LAD",age:37}
    ]
  },
  {
    playerId: 119361, playerName: "John Olerud", bbrefId: "olerujo01", positionCategory: "1B",
    careerWAR: 51.4, seasons: [
      {season:1989,war:-0.2,team:"TOR",age:20},{season:1990,war:0.2,team:"TOR",age:21},{season:1991,war:0.8,team:"TOR",age:22},
      {season:1992,war:2.2,team:"TOR",age:23},{season:1993,war:6.6,team:"TOR",age:24},{season:1994,war:1.8,team:"TOR",age:25},
      {season:1995,war:1.1,team:"TOR",age:26},{season:1996,war:2.2,team:"TOR",age:27},{season:1997,war:2.3,team:"NYM",age:28},
      {season:1998,war:5.2,team:"NYM",age:29},{season:1999,war:6.5,team:"NYM",age:30},{season:2000,war:5.9,team:"SEA",age:31},
      {season:2001,war:3.3,team:"SEA",age:32},{season:2002,war:4.2,team:"SEA",age:33},{season:2003,war:3.3,team:"SEA",age:34},
      {season:2004,war:2.2,team:"NYY",age:35},{season:2005,war:3.8,team:"BOS",age:36}
    ]
  },
  {
    playerId: 121697, playerName: "Reggie Sanders", bbrefId: "sandere02", positionCategory: "RF",
    careerWAR: 28.5, seasons: [
      {season:1991,war:1.0,team:"CIN",age:23},{season:1992,war:0.2,team:"CIN",age:24},{season:1993,war:1.7,team:"CIN",age:25},
      {season:1994,war:0.5,team:"CIN",age:26},{season:1995,war:3.2,team:"CIN",age:27},{season:1996,war:1.8,team:"CIN",age:28},
      {season:1997,war:1.6,team:"CIN",age:29},{season:1998,war:0.5,team:"SDP",age:30},{season:1999,war:3.1,team:"SDP",age:31},
      {season:2000,war:0.8,team:"ATL",age:32},{season:2001,war:2.4,team:"ARI",age:33},{season:2002,war:1.0,team:"SFG",age:34},
      {season:2003,war:1.1,team:"PIT",age:35},{season:2004,war:2.7,team:"STL",age:36},{season:2005,war:2.2,team:"STL",age:37},
      {season:2006,war:1.8,team:"KCR",age:38},{season:2007,war:2.9,team:"KCR",age:39}
    ]
  },

  // ===== 2004-2005 Retirements =====
  {
    playerId: 112560, playerName: "Ellis Burks", bbrefId: "burksel01", positionCategory: "RF",
    careerWAR: 49.8, seasons: [
      {season:1987,war:3.2,team:"BOS",age:22},{season:1988,war:3.1,team:"BOS",age:23},{season:1989,war:0.7,team:"BOS",age:24},
      {season:1990,war:4.1,team:"BOS",age:25},{season:1991,war:0.4,team:"BOS",age:26},{season:1992,war:1.9,team:"BOS",age:27},
      {season:1993,war:5.2,team:"CHW",age:28},{season:1994,war:1.1,team:"COL",age:29},{season:1995,war:0.4,team:"COL",age:30},
      {season:1996,war:6.7,team:"COL",age:31},{season:1997,war:1.0,team:"COL",age:32},{season:1998,war:3.3,team:"COL",age:33},
      {season:1999,war:2.2,team:"SFG",age:34},{season:2000,war:4.3,team:"SFG",age:35},{season:2001,war:3.0,team:"CLE",age:36},
      {season:2002,war:2.2,team:"CLE",age:37},{season:2003,war:3.3,team:"CLE",age:38},{season:2004,war:3.7,team:"BOS",age:39}
    ]
  },
  {
    playerId: 113984, playerName: "Ray Durham", bbrefId: "durhara01", positionCategory: "2B",
    careerWAR: 30.4, seasons: [
      {season:1995,war:2.0,team:"CHW",age:23},{season:1996,war:2.7,team:"CHW",age:24},{season:1997,war:2.0,team:"CHW",age:25},
      {season:1998,war:3.3,team:"CHW",age:26},{season:1999,war:1.6,team:"CHW",age:27},{season:2000,war:2.2,team:"CHW",age:28},
      {season:2001,war:1.5,team:"CHW",age:29},{season:2002,war:2.3,team:"OAK",age:30},{season:2003,war:3.5,team:"SFG",age:31},
      {season:2004,war:1.4,team:"SFG",age:32},{season:2005,war:1.5,team:"SFG",age:33},{season:2006,war:2.1,team:"SFG",age:34},
      {season:2007,war:2.7,team:"SFG",age:35},{season:2008,war:1.6,team:"MIL",age:36}
    ]
  },
  {
    playerId: 110990, playerName: "Bret Boone", bbrefId: "boonebr01", positionCategory: "2B",
    careerWAR: 22.8, seasons: [
      {season:1992,war:-0.6,team:"SEA",age:23},{season:1993,war:1.1,team:"SEA",age:24},{season:1994,war:0.6,team:"CIN",age:25},
      {season:1995,war:0.1,team:"CIN",age:26},{season:1996,war:0.5,team:"CIN",age:27},{season:1997,war:-0.6,team:"CIN",age:28},
      {season:1998,war:0.8,team:"CIN",age:29},{season:1999,war:0.8,team:"ATL",age:30},{season:2000,war:0.8,team:"SDP",age:31},
      {season:2001,war:8.5,team:"SEA",age:32},{season:2002,war:1.4,team:"SEA",age:33},{season:2003,war:6.2,team:"SEA",age:34},
      {season:2004,war:2.5,team:"SEA",age:35},{season:2005,war:0.7,team:"MIN",age:36}
    ]
  },
  {
    playerId: 121578, playerName: "Sammy Sosa", bbrefId: "sosasa01", positionCategory: "RF",
    careerWAR: 58.6, seasons: [
      {season:1989,war:0.5,team:"TEX",age:20},{season:1990,war:0.2,team:"CHW",age:21},{season:1991,war:-0.4,team:"CHC",age:22},
      {season:1992,war:-0.2,team:"CHC",age:23},{season:1993,war:2.3,team:"CHC",age:24},{season:1994,war:0.7,team:"CHC",age:25},
      {season:1995,war:2.3,team:"CHC",age:26},{season:1996,war:1.8,team:"CHC",age:27},{season:1997,war:2.7,team:"CHC",age:28},
      {season:1998,war:6.5,team:"CHC",age:29},{season:1999,war:4.2,team:"CHC",age:30},{season:2000,war:5.3,team:"CHC",age:31},
      {season:2001,war:8.0,team:"CHC",age:32},{season:2002,war:5.1,team:"CHC",age:33},{season:2003,war:3.9,team:"CHC",age:34},
      {season:2004,war:3.8,team:"CHC",age:35},{season:2005,war:0.1,team:"BAL",age:36},{season:2007,war:1.8,team:"TEX",age:38}
    ]
  },
  {
    playerId: 123497, playerName: "Bernie Williams", bbrefId: "willibe02", positionCategory: "CF",
    careerWAR: 49.6, seasons: [
      {season:1991,war:-0.2,team:"NYY",age:22},{season:1992,war:0.5,team:"NYY",age:23},{season:1993,war:1.2,team:"NYY",age:24},
      {season:1994,war:2.4,team:"NYY",age:25},{season:1995,war:1.1,team:"NYY",age:26},{season:1996,war:4.7,team:"NYY",age:27},
      {season:1997,war:3.7,team:"NYY",age:28},{season:1998,war:6.6,team:"NYY",age:29},{season:1999,war:5.8,team:"NYY",age:30},
      {season:2000,war:4.3,team:"NYY",age:31},{season:2001,war:3.1,team:"NYY",age:32},{season:2002,war:6.0,team:"NYY",age:33},
      {season:2003,war:3.2,team:"NYY",age:34},{season:2004,war:3.5,team:"NYY",age:35},{season:2005,war:1.5,team:"NYY",age:36},
      {season:2006,war:2.2,team:"NYY",age:37}
    ]
  },
  {
    playerId: 112001, playerName: "Carlos Baerga", bbrefId: "baergca01", positionCategory: "2B",
    careerWAR: 19.6, seasons: [
      {season:1990,war:0.2,team:"CLE",age:21},{season:1991,war:1.1,team:"CLE",age:22},{season:1992,war:4.2,team:"CLE",age:23},
      {season:1993,war:4.2,team:"CLE",age:24},{season:1994,war:0.3,team:"CLE",age:25},{season:1995,war:1.1,team:"CLE",age:26},
      {season:1996,war:0.2,team:"CLE",age:27},{season:1997,war:-0.2,team:"NYM",age:28},{season:1998,war:0.3,team:"NYM",age:29},
      {season:1999,war:2.7,team:"CLE",age:30},{season:2000,war:0.1,team:"CLE",age:31},{season:2001,war:-0.1,team:"CLE",age:32},
      {season:2002,war:0.2,team:"BOS",age:33},{season:2003,war:0.0,team:"ARI",age:34},{season:2004,war:0.3,team:"ARI",age:35},
      {season:2005,war:5.0,team:"WSN",age:36}
    ]
  },

  // ===== 2006 Retirements =====
  {
    playerId: 110690, playerName: "Edgardo Alfonzo", bbrefId: "alfoned01", positionCategory: "3B",
    careerWAR: 28.8, seasons: [
      {season:1995,war:1.1,team:"NYM",age:21},{season:1996,war:2.4,team:"NYM",age:22},{season:1997,war:4.1,team:"NYM",age:23},
      {season:1998,war:2.9,team:"NYM",age:24},{season:1999,war:6.6,team:"NYM",age:25},{season:2000,war:5.0,team:"NYM",age:26},
      {season:2001,war:1.8,team:"NYM",age:27},{season:2002,war:2.6,team:"NYM",age:28},{season:2003,war:0.0,team:"SFG",age:29},
      {season:2004,war:0.1,team:"SFG",age:30},{season:2005,war:1.3,team:"TOR",age:31},{season:2006,war:0.9,team:"LAA",age:32}
    ]
  },
  {
    playerId: 112563, playerName: "Jeromy Burnitz", bbrefId: "burnijs01", positionCategory: "RF",
    careerWAR: 19.9, seasons: [
      {season:1993,war:-0.1,team:"NYM",age:24},{season:1994,war:0.2,team:"NYM",age:25},{season:1995,war:0.6,team:"CLE",age:26},
      {season:1996,war:1.7,team:"MIL",age:27},{season:1997,war:2.1,team:"MIL",age:28},{season:1998,war:2.4,team:"MIL",age:29},
      {season:1999,war:2.3,team:"MIL",age:30},{season:2000,war:2.3,team:"MIL",age:31},{season:2001,war:1.4,team:"MIL",age:32},
      {season:2002,war:1.4,team:"NYM",age:33},{season:2003,war:0.8,team:"NYM",age:34},{season:2004,war:1.2,team:"COL",age:35},
      {season:2005,war:1.7,team:"CHC",age:36},{season:2006,war:1.9,team:"PIT",age:37}
    ]
  },
  {
    playerId: 112542, playerName: "Vinny Castilla", bbrefId: "castivi02", positionCategory: "3B",
    careerWAR: 19.4, seasons: [
      {season:1991,war:-0.3,team:"ATL",age:24},{season:1992,war:0.1,team:"ATL",age:25},{season:1993,war:1.0,team:"COL",age:26},
      {season:1994,war:0.5,team:"COL",age:27},{season:1995,war:3.1,team:"COL",age:28},{season:1996,war:1.2,team:"COL",age:29},
      {season:1997,war:1.2,team:"COL",age:30},{season:1998,war:1.7,team:"COL",age:31},{season:1999,war:1.3,team:"COL",age:32},
      {season:2000,war:0.3,team:"TBD",age:33},{season:2001,war:0.2,team:"HOU",age:34},{season:2002,war:3.0,team:"ATL",age:35},
      {season:2003,war:0.1,team:"ATL",age:36},{season:2004,war:3.3,team:"COL",age:37},{season:2005,war:0.2,team:"WSN",age:38},
      {season:2006,war:2.5,team:"SDP",age:39}
    ]
  },
  {
    playerId: 114098, playerName: "Carl Everett", bbrefId: "evereca01", positionCategory: "CF",
    careerWAR: 20.4, seasons: [
      {season:1993,war:0.1,team:"FLA",age:22},{season:1994,war:0.5,team:"FLA",age:23},{season:1995,war:0.2,team:"NYM",age:24},
      {season:1996,war:-0.2,team:"NYM",age:25},{season:1997,war:1.7,team:"NYM",age:26},{season:1998,war:1.1,team:"HOU",age:27},
      {season:1999,war:4.5,team:"HOU",age:28},{season:2000,war:3.4,team:"BOS",age:29},{season:2001,war:0.2,team:"BOS",age:30},
      {season:2002,war:0.1,team:"TEX",age:31},{season:2003,war:2.5,team:"TEX",age:32},{season:2004,war:0.3,team:"MON",age:33},
      {season:2005,war:1.6,team:"CHW",age:34},{season:2006,war:4.4,team:"SEA",age:35}
    ]
  },

  // ===== 2007 Retirements =====
  {
    playerId: 113068, playerName: "Jeff Cirillo", bbrefId: "cirije01", positionCategory: "3B",
    careerWAR: 34.5, seasons: [
      {season:1994,war:0.2,team:"MIL",age:24},{season:1995,war:0.9,team:"MIL",age:25},{season:1996,war:4.5,team:"MIL",age:26},
      {season:1997,war:3.2,team:"MIL",age:27},{season:1998,war:4.2,team:"MIL",age:28},{season:1999,war:5.2,team:"MIL",age:29},
      {season:2000,war:5.8,team:"COL",age:30},{season:2001,war:2.1,team:"COL",age:31},{season:2002,war:1.0,team:"SEA",age:32},
      {season:2003,war:0.7,team:"SEA",age:33},{season:2004,war:2.2,team:"SDP",age:34},{season:2005,war:1.5,team:"MIL",age:35},
      {season:2006,war:1.2,team:"MIL",age:36},{season:2007,war:1.8,team:"MIN",age:37}
    ]
  },
  {
    playerId: 113118, playerName: "Royce Clayton", bbrefId: "claytro01", positionCategory: "SS",
    careerWAR: 19.5, seasons: [
      {season:1991,war:0.1,team:"SFG",age:21},{season:1992,war:0.3,team:"SFG",age:22},{season:1993,war:0.2,team:"SFG",age:23},
      {season:1994,war:1.1,team:"SFG",age:24},{season:1995,war:0.8,team:"SFG",age:25},{season:1996,war:2.2,team:"STL",age:26},
      {season:1997,war:1.4,team:"STL",age:27},{season:1998,war:2.3,team:"STL",age:28},{season:1999,war:1.4,team:"TEX",age:29},
      {season:2000,war:1.0,team:"TEX",age:30},{season:2001,war:0.8,team:"CHW",age:31},{season:2002,war:0.7,team:"CHW",age:32},
      {season:2003,war:1.2,team:"MIL",age:33},{season:2004,war:1.3,team:"COL",age:34},{season:2005,war:1.0,team:"ARI",age:35},
      {season:2006,war:1.0,team:"WSN",age:36},{season:2007,war:2.7,team:"TOR",age:37}
    ]
  },
  {
    playerId: 113135, playerName: "Jeff Conine", bbrefId: "conije01", positionCategory: "1B",
    careerWAR: 19.5, seasons: [
      {season:1990,war:0.1,team:"KCR",age:24},{season:1992,war:0.4,team:"FLA",age:26},{season:1993,war:1.3,team:"FLA",age:27},
      {season:1994,war:2.3,team:"FLA",age:28},{season:1995,war:1.8,team:"FLA",age:29},{season:1996,war:0.7,team:"FLA",age:30},
      {season:1997,war:0.7,team:"FLA",age:31},{season:1998,war:0.2,team:"KCR",age:32},{season:1999,war:1.2,team:"KCR",age:33},
      {season:2000,war:1.6,team:"BAL",age:34},{season:2001,war:2.3,team:"BAL",age:35},{season:2002,war:0.6,team:"BAL",age:36},
      {season:2003,war:1.6,team:"FLA",age:37},{season:2004,war:1.3,team:"FLA",age:38},{season:2005,war:0.5,team:"FLA",age:39},
      {season:2006,war:1.2,team:"FLA",age:40},{season:2007,war:1.7,team:"CIN",age:41}
    ]
  },
  {
    playerId: 117569, playerName: "Kenny Rogers", bbrefId: "rogeke01", positionCategory: "SP",
    careerWAR: 41.3, seasons: [
      {season:1989,war:0.7,team:"TEX",age:24},{season:1990,war:1.6,team:"TEX",age:25},{season:1991,war:0.3,team:"TEX",age:26},
      {season:1992,war:1.8,team:"TEX",age:27},{season:1993,war:2.2,team:"TEX",age:28},{season:1994,war:0.7,team:"TEX",age:29},
      {season:1995,war:3.5,team:"TEX",age:30},{season:1996,war:2.2,team:"NYY",age:31},{season:1997,war:2.2,team:"OAK",age:32},
      {season:1998,war:4.1,team:"OAK",age:33},{season:1999,war:0.2,team:"NYM",age:34},{season:2000,war:2.0,team:"TEX",age:35},
      {season:2001,war:3.6,team:"TEX",age:36},{season:2002,war:1.7,team:"TEX",age:37},{season:2003,war:0.8,team:"MIN",age:38},
      {season:2004,war:4.3,team:"TEX",age:39},{season:2005,war:2.1,team:"TEX",age:40},{season:2006,war:4.2,team:"DET",age:41},
      {season:2007,war:1.5,team:"DET",age:42},{season:2008,war:1.6,team:"DET",age:43}
    ]
  },
  {
    playerId: 116627, playerName: "Mike Hampton", bbrefId: "hamptml01", positionCategory: "SP",
    careerWAR: 16.3, seasons: [
      {season:1993,war:-0.3,team:"SEA",age:20},{season:1994,war:-0.5,team:"HOU",age:21},{season:1995,war:0.2,team:"HOU",age:22},
      {season:1996,war:2.5,team:"HOU",age:23},{season:1997,war:2.4,team:"HOU",age:24},{season:1998,war:0.2,team:"HOU",age:25},
      {season:1999,war:5.2,team:"HOU",age:26},{season:2000,war:3.7,team:"NYM",age:27},{season:2001,war:0.2,team:"COL",age:28},
      {season:2002,war:-0.9,team:"COL",age:29},{season:2003,war:1.3,team:"ATL",age:30},{season:2004,war:1.8,team:"ATL",age:31},
      {season:2005,war:0.4,team:"ATL",age:32},{season:2006,war:-0.3,team:"ATL",age:33},{season:2008,war:0.5,team:"ATL",age:35},
      {season:2009,war:-0.1,team:"HOU",age:36},{season:2010,war:0.0,team:"HOU",age:37}
    ]
  },

  // ===== 2008 Retirements =====
  {
    playerId: 110690, playerName: "Moises Alou", bbrefId: "aloumoi01", positionCategory: "LF",
    careerWAR: 39.9, seasons: [
      {season:1990,war:0.8,team:"PIT",age:24},{season:1992,war:0.2,team:"MON",age:26},{season:1993,war:1.5,team:"MON",age:27},
      {season:1994,war:3.3,team:"MON",age:28},{season:1995,war:0.3,team:"MON",age:29},{season:1996,war:0.1,team:"MON",age:30},
      {season:1997,war:2.2,team:"FLA",age:31},{season:1998,war:4.5,team:"HOU",age:32},{season:1999,war:0.4,team:"HOU",age:33},
      {season:2000,war:4.3,team:"HOU",age:34},{season:2001,war:3.6,team:"HOU",age:35},{season:2002,war:3.3,team:"CHC",age:36},
      {season:2003,war:2.4,team:"CHC",age:37},{season:2004,war:4.7,team:"CHC",age:38},{season:2005,war:0.9,team:"SFG",age:39},
      {season:2006,war:1.2,team:"SFG",age:40},{season:2007,war:3.7,team:"NYM",age:41},{season:2008,war:2.5,team:"NYM",age:42}
    ]
  },
  {
    playerId: 112797, playerName: "Sean Casey", bbrefId: "caseyse01", positionCategory: "1B",
    careerWAR: 16.5, seasons: [
      {season:1997,war:0.7,team:"CLE",age:23},{season:1998,war:2.3,team:"CIN",age:24},{season:1999,war:3.0,team:"CIN",age:25},
      {season:2000,war:1.6,team:"CIN",age:26},{season:2001,war:2.3,team:"CIN",age:27},{season:2002,war:0.9,team:"CIN",age:28},
      {season:2003,war:1.1,team:"CIN",age:29},{season:2004,war:2.2,team:"CIN",age:30},{season:2005,war:0.2,team:"CIN",age:31},
      {season:2006,war:1.1,team:"PIT",age:32},{season:2007,war:0.4,team:"DET",age:33},{season:2008,war:0.7,team:"BOS",age:34}
    ]
  },

  // ===== 2009 Retirements =====
  {
    playerId: 113232, playerName: "Carlos Delgado", bbrefId: "delgaca01", positionCategory: "1B",
    careerWAR: 44.4, seasons: [
      {season:1993,war:-0.3,team:"TOR",age:21},{season:1994,war:0.5,team:"TOR",age:22},{season:1995,war:-0.1,team:"TOR",age:23},
      {season:1996,war:2.2,team:"TOR",age:24},{season:1997,war:2.5,team:"TOR",age:25},{season:1998,war:3.7,team:"TOR",age:26},
      {season:1999,war:5.2,team:"TOR",age:27},{season:2000,war:6.8,team:"TOR",age:28},{season:2001,war:2.4,team:"TOR",age:29},
      {season:2002,war:1.6,team:"TOR",age:30},{season:2003,war:5.9,team:"TOR",age:31},{season:2004,war:2.5,team:"FLA",age:32},
      {season:2005,war:1.1,team:"FLA",age:33},{season:2006,war:3.3,team:"NYM",age:34},{season:2007,war:1.0,team:"NYM",age:35},
      {season:2008,war:4.3,team:"NYM",age:36},{season:2009,war:1.8,team:"NYM",age:37}
    ]
  },
  {
    playerId: 116539, playerName: "Nomar Garciaparra", bbrefId: "garcino01", positionCategory: "SS",
    careerWAR: 44.3, seasons: [
      {season:1996,war:4.2,team:"BOS",age:22},{season:1997,war:6.8,team:"BOS",age:23},{season:1998,war:7.4,team:"BOS",age:24},
      {season:1999,war:5.5,team:"BOS",age:25},{season:2000,war:5.8,team:"BOS",age:26},{season:2001,war:0.7,team:"BOS",age:27},
      {season:2002,war:2.0,team:"BOS",age:28},{season:2003,war:6.5,team:"BOS",age:29},{season:2004,war:1.0,team:"BOS",age:30},
      {season:2005,war:1.2,team:"CHC",age:31},{season:2006,war:2.3,team:"LAD",age:32},{season:2007,war:-0.1,team:"LAD",age:33},
      {season:2008,war:0.2,team:"LAD",age:34},{season:2009,war:0.8,team:"OAK",age:35}
    ]
  },
  {
    playerId: 123272, playerName: "Jason Varitek", bbrefId: "varinja01", positionCategory: "C",
    careerWAR: 24.0, seasons: [
      {season:1997,war:0.3,team:"BOS",age:25},{season:1998,war:1.2,team:"BOS",age:26},{season:1999,war:1.5,team:"BOS",age:27},
      {season:2000,war:0.2,team:"BOS",age:28},{season:2001,war:3.2,team:"BOS",age:29},{season:2002,war:1.2,team:"BOS",age:30},
      {season:2003,war:3.7,team:"BOS",age:31},{season:2004,war:2.7,team:"BOS",age:32},{season:2005,war:3.6,team:"BOS",age:33},
      {season:2006,war:1.1,team:"BOS",age:34},{season:2007,war:0.4,team:"BOS",age:35},{season:2008,war:3.1,team:"BOS",age:36},
      {season:2009,war:-0.1,team:"BOS",age:37},{season:2010,war:0.7,team:"BOS",age:38},{season:2011,war:1.2,team:"BOS",age:39}
    ]
  },
  {
    playerId: 121697, playerName: "Gary Sheffield", bbrefId: "shMDMga01", positionCategory: "RF",
    careerWAR: 60.5, seasons: [
      {season:1988,war:-0.4,team:"MIL",age:19},{season:1989,war:0.3,team:"MIL",age:20},{season:1990,war:0.7,team:"MIL",age:21},
      {season:1991,war:2.8,team:"MIL",age:22},{season:1992,war:5.3,team:"SDP",age:23},{season:1993,war:4.1,team:"FLA",age:24},
      {season:1994,war:2.2,team:"FLA",age:25},{season:1995,war:2.1,team:"FLA",age:26},{season:1996,war:5.2,team:"FLA",age:27},
      {season:1997,war:2.7,team:"FLA",age:28},{season:1998,war:0.7,team:"FLA",age:29},{season:1999,war:2.3,team:"LAD",age:30},
      {season:2000,war:3.7,team:"LAD",age:31},{season:2001,war:2.3,team:"LAD",age:32},{season:2002,war:2.3,team:"ATL",age:33},
      {season:2003,war:5.1,team:"ATL",age:34},{season:2004,war:7.7,team:"NYY",age:35},{season:2005,war:3.5,team:"NYY",age:36},
      {season:2006,war:3.1,team:"NYY",age:37},{season:2007,war:1.1,team:"DET",age:38},{season:2008,war:1.6,team:"DET",age:39},
      {season:2009,war:2.1,team:"NYM",age:40}
    ]
  },
  {
    playerId: 120820, playerName: "Manny Ramirez", bbrefId: "ramirma02", positionCategory: "LF",
    careerWAR: 69.4, seasons: [
      {season:1993,war:-0.1,team:"CLE",age:21},{season:1994,war:1.7,team:"CLE",age:22},{season:1995,war:3.2,team:"CLE",age:23},
      {season:1996,war:2.5,team:"CLE",age:24},{season:1997,war:1.1,team:"CLE",age:25},{season:1998,war:2.7,team:"CLE",age:26},
      {season:1999,war:6.2,team:"CLE",age:27},{season:2000,war:3.6,team:"CLE",age:28},{season:2001,war:5.2,team:"BOS",age:29},
      {season:2002,war:4.1,team:"BOS",age:30},{season:2003,war:5.7,team:"BOS",age:31},{season:2004,war:5.9,team:"BOS",age:32},
      {season:2005,war:3.5,team:"BOS",age:33},{season:2006,war:5.2,team:"BOS",age:34},{season:2007,war:2.7,team:"BOS",age:35},
      {season:2008,war:5.0,team:"BOS",age:36},{season:2009,war:2.3,team:"LAD",age:37},{season:2010,war:2.7,team:"LAD",age:38},
      {season:2011,war:6.2,team:"TBR",age:39}
    ]
  },
  {
    playerId: 111560, playerName: "Joe Crede", bbrefId: "credejo01", positionCategory: "3B",
    careerWAR: 14.7, seasons: [
      {season:2000,war:0.1,team:"CHW",age:22},{season:2001,war:0.3,team:"CHW",age:23},{season:2002,war:0.4,team:"CHW",age:24},
      {season:2003,war:0.4,team:"CHW",age:25},{season:2004,war:2.5,team:"CHW",age:26},{season:2005,war:3.5,team:"CHW",age:27},
      {season:2006,war:4.0,team:"CHW",age:28},{season:2007,war:-0.2,team:"CHW",age:29},{season:2008,war:2.4,team:"MIN",age:30},
      {season:2009,war:1.3,team:"MIN",age:31}
    ]
  },
  {
    playerId: 110869, playerName: "Aaron Boone", bbrefId: "booneaa01", positionCategory: "3B",
    careerWAR: 13.6, seasons: [
      {season:1997,war:1.6,team:"CIN",age:24},{season:1998,war:0.3,team:"CIN",age:25},{season:1999,war:1.1,team:"CIN",age:26},
      {season:2000,war:0.2,team:"CIN",age:27},{season:2001,war:1.7,team:"CIN",age:28},{season:2002,war:3.2,team:"CIN",age:29},
      {season:2003,war:1.0,team:"CIN",age:30},{season:2005,war:0.2,team:"CLE",age:32},{season:2006,war:0.7,team:"CLE",age:33},
      {season:2007,war:0.3,team:"FLA",age:34},{season:2008,war:0.8,team:"WSN",age:35},{season:2009,war:2.5,team:"HOU",age:36}
    ]
  },

  // ===== 2010 Retirements =====
  {
    playerId: 114087, playerName: "Jim Edmonds", bbrefId: "edmonji01", positionCategory: "CF",
    careerWAR: 60.4, seasons: [
      {season:1993,war:0.2,team:"CAL",age:23},{season:1994,war:1.2,team:"CAL",age:24},{season:1995,war:3.3,team:"CAL",age:25},
      {season:1996,war:2.2,team:"CAL",age:26},{season:1997,war:3.3,team:"ANA",age:27},{season:1998,war:2.2,team:"ANA",age:28},
      {season:1999,war:0.8,team:"ANA",age:29},{season:2000,war:8.2,team:"STL",age:30},{season:2001,war:4.4,team:"STL",age:31},
      {season:2002,war:3.2,team:"STL",age:32},{season:2003,war:3.5,team:"STL",age:33},{season:2004,war:8.2,team:"STL",age:34},
      {season:2005,war:5.2,team:"STL",age:35},{season:2006,war:2.2,team:"STL",age:36},{season:2007,war:6.2,team:"STL",age:37},
      {season:2008,war:3.3,team:"SDP",age:38},{season:2009,war:0.3,team:"CHC",age:39},{season:2010,war:2.5,team:"CIN",age:40}
    ]
  },
  {
    playerId: 110668, playerName: "Garret Anderson", bbrefId: "anderga01", positionCategory: "LF",
    careerWAR: 25.7, seasons: [
      {season:1994,war:0.1,team:"CAL",age:22},{season:1995,war:0.2,team:"CAL",age:23},{season:1996,war:2.3,team:"CAL",age:24},
      {season:1997,war:0.7,team:"ANA",age:25},{season:1998,war:0.6,team:"ANA",age:26},{season:1999,war:2.5,team:"ANA",age:27},
      {season:2000,war:1.7,team:"ANA",age:28},{season:2001,war:1.5,team:"ANA",age:29},{season:2002,war:1.2,team:"ANA",age:30},
      {season:2003,war:1.6,team:"ANA",age:31},{season:2004,war:0.6,team:"ANA",age:32},{season:2005,war:1.2,team:"LAA",age:33},
      {season:2006,war:2.0,team:"LAA",age:34},{season:2007,war:1.2,team:"LAA",age:35},{season:2008,war:3.5,team:"LAA",age:36},
      {season:2009,war:2.5,team:"LAA",age:37},{season:2010,war:2.3,team:"LAD",age:38}
    ]
  },
  {
    playerId: 110735, playerName: "Brad Ausmus", bbrefId: "ausmubr01", positionCategory: "C",
    careerWAR: 16.5, seasons: [
      {season:1993,war:-0.3,team:"SDP",age:24},{season:1994,war:0.3,team:"SDP",age:25},{season:1995,war:0.2,team:"SDP",age:26},
      {season:1996,war:0.6,team:"DET",age:27},{season:1997,war:1.6,team:"DET",age:28},{season:1998,war:1.2,team:"HOU",age:29},
      {season:1999,war:1.2,team:"DET",age:30},{season:2000,war:0.3,team:"DET",age:31},{season:2001,war:1.8,team:"HOU",age:32},
      {season:2002,war:1.3,team:"HOU",age:33},{season:2003,war:0.7,team:"HOU",age:34},{season:2004,war:1.5,team:"HOU",age:35},
      {season:2005,war:0.4,team:"HOU",age:36},{season:2006,war:2.0,team:"HOU",age:37},{season:2007,war:0.5,team:"HOU",age:38},
      {season:2008,war:0.6,team:"HOU",age:39},{season:2009,war:2.0,team:"LAD",age:40},{season:2010,war:0.6,team:"LAD",age:41}
    ]
  },
  {
    playerId: 114049, playerName: "David Eckstein", bbrefId: "eckstda01", positionCategory: "SS",
    careerWAR: 20.9, seasons: [
      {season:2001,war:3.3,team:"ANA",age:26},{season:2002,war:3.2,team:"ANA",age:27},{season:2003,war:1.7,team:"ANA",age:28},
      {season:2004,war:2.2,team:"ANA",age:29},{season:2005,war:2.0,team:"STL",age:30},{season:2006,war:3.8,team:"STL",age:31},
      {season:2007,war:0.3,team:"STL",age:32},{season:2008,war:1.3,team:"ARI",age:33},{season:2009,war:2.0,team:"SDP",age:34},
      {season:2010,war:1.1,team:"SDP",age:35}
    ]
  },

  // ===== 2011 Retirements =====
  {
    playerId: 112507, playerName: "Mike Cameron", bbrefId: "camermi01", positionCategory: "CF",
    careerWAR: 46.7, seasons: [
      {season:1995,war:0.5,team:"CHW",age:22},{season:1996,war:-0.2,team:"CHW",age:23},{season:1997,war:0.7,team:"CHW",age:24},
      {season:1998,war:0.5,team:"CHW",age:25},{season:1999,war:3.1,team:"CIN",age:26},{season:2000,war:3.5,team:"SEA",age:27},
      {season:2001,war:6.7,team:"SEA",age:28},{season:2002,war:2.8,team:"SEA",age:29},{season:2003,war:5.2,team:"SEA",age:30},
      {season:2004,war:2.8,team:"NYM",age:31},{season:2005,war:1.8,team:"NYM",age:32},{season:2006,war:4.7,team:"SDP",age:33},
      {season:2007,war:2.0,team:"SDP",age:34},{season:2008,war:4.7,team:"MIL",age:35},{season:2009,war:2.8,team:"MIL",age:36},
      {season:2010,war:2.7,team:"BOS",age:37},{season:2011,war:2.4,team:"FLA",age:38}
    ]
  },
  {
    playerId: 114031, playerName: "J.D. Drew", bbrefId: "drewj.01", positionCategory: "RF",
    careerWAR: 44.9, seasons: [
      {season:1998,war:0.8,team:"STL",age:22},{season:1999,war:1.2,team:"STL",age:23},{season:2000,war:5.2,team:"STL",age:24},
      {season:2001,war:4.3,team:"STL",age:25},{season:2002,war:3.1,team:"STL",age:26},{season:2003,war:2.2,team:"STL",age:27},
      {season:2004,war:7.2,team:"ATL",age:28},{season:2005,war:2.8,team:"LAD",age:29},{season:2006,war:4.3,team:"LAD",age:30},
      {season:2007,war:3.1,team:"BOS",age:31},{season:2008,war:2.2,team:"BOS",age:32},{season:2009,war:1.8,team:"BOS",age:33},
      {season:2010,war:2.8,team:"BOS",age:34},{season:2011,war:3.9,team:"BOS",age:35}
    ]
  },
  {
    playerId: 111560, playerName: "Casey Blake", bbrefId: "blakeca01", positionCategory: "3B",
    careerWAR: 24.9, seasons: [
      {season:1999,war:-0.3,team:"TOR",age:25},{season:2001,war:0.5,team:"MIN",age:27},{season:2002,war:1.8,team:"CLE",age:28},
      {season:2003,war:3.0,team:"CLE",age:29},{season:2004,war:1.7,team:"CLE",age:30},{season:2005,war:0.2,team:"CLE",age:31},
      {season:2006,war:3.7,team:"CLE",age:32},{season:2007,war:2.0,team:"CLE",age:33},{season:2008,war:4.5,team:"CLE",age:34},
      {season:2009,war:2.8,team:"LAD",age:35},{season:2010,war:2.8,team:"LAD",age:36},{season:2011,war:2.2,team:"LAD",age:37}
    ]
  },
  {
    playerId: 111451, playerName: "Orlando Cabrera", bbrefId: "cabrerOr01", positionCategory: "SS",
    careerWAR: 21.3, seasons: [
      {season:1997,war:0.1,team:"MON",age:22},{season:1998,war:0.5,team:"MON",age:23},{season:1999,war:0.2,team:"MON",age:24},
      {season:2000,war:0.6,team:"MON",age:25},{season:2001,war:2.1,team:"MON",age:26},{season:2002,war:2.3,team:"MON",age:27},
      {season:2003,war:2.7,team:"MON",age:28},{season:2004,war:2.8,team:"BOS",age:29},{season:2005,war:0.8,team:"LAA",age:30},
      {season:2006,war:2.0,team:"LAA",age:31},{season:2007,war:2.6,team:"LAA",age:32},{season:2008,war:1.6,team:"CHW",age:33},
      {season:2009,war:2.7,team:"MIN",age:34},{season:2010,war:-0.2,team:"CIN",age:35},{season:2011,war:0.5,team:"CLE",age:36}
    ]
  },
  {
    playerId: 112571, playerName: "Pat Burrell", bbrefId: "burrEpa01", positionCategory: "LF",
    careerWAR: 18.9, seasons: [
      {season:2000,war:2.3,team:"PHI",age:23},{season:2001,war:1.2,team:"PHI",age:24},{season:2002,war:3.3,team:"PHI",age:25},
      {season:2003,war:0.7,team:"PHI",age:26},{season:2004,war:0.8,team:"PHI",age:27},{season:2005,war:3.0,team:"PHI",age:28},
      {season:2006,war:0.8,team:"PHI",age:29},{season:2007,war:0.6,team:"PHI",age:30},{season:2008,war:2.7,team:"PHI",age:31},
      {season:2009,war:0.9,team:"TBR",age:32},{season:2010,war:0.7,team:"SFG",age:33},{season:2011,war:1.9,team:"SFG",age:34}
    ]
  },
  {
    playerId: 119370, playerName: "Magglio Ordonez", bbrefId: "ordoma01", positionCategory: "RF",
    careerWAR: 33.5, seasons: [
      {season:1997,war:2.2,team:"CHW",age:23},{season:1998,war:1.0,team:"CHW",age:24},{season:1999,war:3.6,team:"CHW",age:25},
      {season:2000,war:5.5,team:"CHW",age:26},{season:2001,war:3.3,team:"CHW",age:27},{season:2002,war:3.1,team:"CHW",age:28},
      {season:2003,war:2.0,team:"CHW",age:29},{season:2004,war:0.7,team:"DET",age:30},{season:2005,war:1.2,team:"DET",age:31},
      {season:2006,war:2.2,team:"DET",age:32},{season:2007,war:4.9,team:"DET",age:33},{season:2008,war:1.5,team:"DET",age:34},
      {season:2009,war:0.2,team:"DET",age:35},{season:2010,war:0.5,team:"DET",age:36},{season:2011,war:1.6,team:"DET",age:37}
    ]
  },
  {
    playerId: 114880, playerName: "Craig Counsell", bbrefId: "counscr01", positionCategory: "SS",
    careerWAR: 22.4, seasons: [
      {season:1995,war:0.1,team:"COL",age:24},{season:1997,war:2.2,team:"FLA",age:26},{season:1998,war:0.3,team:"FLA",age:27},
      {season:1999,war:1.2,team:"FLA",age:28},{season:2000,war:0.6,team:"ARI",age:29},{season:2001,war:2.3,team:"ARI",age:30},
      {season:2002,war:1.3,team:"ARI",age:31},{season:2003,war:1.7,team:"ARI",age:32},{season:2004,war:2.5,team:"MIL",age:33},
      {season:2005,war:0.2,team:"MIL",age:34},{season:2006,war:1.6,team:"MIL",age:35},{season:2007,war:3.5,team:"MIL",age:36},
      {season:2008,war:2.1,team:"MIL",age:37},{season:2009,war:0.4,team:"MIL",age:38},{season:2010,war:1.5,team:"MIL",age:39},
      {season:2011,war:0.9,team:"MIL",age:40}
    ]
  },

  // ===== 2012 Retirements =====
  {
    playerId: 113853, playerName: "Johnny Damon", bbrefId: "damonjo01", positionCategory: "LF",
    careerWAR: 56.3, seasons: [
      {season:1995,war:0.2,team:"KCR",age:21},{season:1996,war:1.5,team:"KCR",age:22},{season:1997,war:1.2,team:"KCR",age:23},
      {season:1998,war:3.2,team:"KCR",age:24},{season:1999,war:3.3,team:"KCR",age:25},{season:2000,war:6.8,team:"KCR",age:26},
      {season:2001,war:3.2,team:"OAK",age:27},{season:2002,war:2.7,team:"BOS",age:28},{season:2003,war:3.7,team:"BOS",age:29},
      {season:2004,war:5.2,team:"BOS",age:30},{season:2005,war:4.5,team:"BOS",age:31},{season:2006,war:2.2,team:"NYY",age:32},
      {season:2007,war:3.2,team:"NYY",age:33},{season:2008,war:3.5,team:"NYY",age:34},{season:2009,war:4.2,team:"NYY",age:35},
      {season:2010,war:1.8,team:"DET",age:36},{season:2011,war:2.5,team:"TBR",age:37},{season:2012,war:3.4,team:"CLE",age:38}
    ]
  },
  {
    playerId: 114793, playerName: "Jason Giambi", bbrefId: "giambja01", positionCategory: "1B",
    careerWAR: 50.5, seasons: [
      {season:1995,war:0.5,team:"OAK",age:24},{season:1996,war:1.0,team:"OAK",age:25},{season:1997,war:3.3,team:"OAK",age:26},
      {season:1998,war:3.8,team:"OAK",age:27},{season:1999,war:4.5,team:"OAK",age:28},{season:2000,war:8.5,team:"OAK",age:29},
      {season:2001,war:7.6,team:"OAK",age:30},{season:2002,war:4.2,team:"NYY",age:31},{season:2003,war:3.2,team:"NYY",age:32},
      {season:2004,war:1.2,team:"NYY",age:33},{season:2005,war:2.3,team:"NYY",age:34},{season:2006,war:2.2,team:"NYY",age:35},
      {season:2007,war:1.2,team:"NYY",age:36},{season:2008,war:1.5,team:"NYY",age:37},{season:2009,war:1.0,team:"OAK",age:38},
      {season:2010,war:0.6,team:"COL",age:39},{season:2011,war:0.8,team:"COL",age:40},{season:2012,war:1.2,team:"COL",age:41},
      {season:2013,war:0.7,team:"CLE",age:42},{season:2014,war:0.6,team:"CLE",age:43}
    ]
  },

  // ===== 2013 Retirements =====
  {
    playerId: 110710, playerName: "Lance Berkman", bbrefId: "berkmla01", positionCategory: "1B",
    careerWAR: 52.0, seasons: [
      {season:1999,war:0.3,team:"HOU",age:23},{season:2000,war:2.2,team:"HOU",age:24},{season:2001,war:5.5,team:"HOU",age:25},
      {season:2002,war:6.2,team:"HOU",age:26},{season:2003,war:2.2,team:"HOU",age:27},{season:2004,war:7.5,team:"HOU",age:28},
      {season:2005,war:2.2,team:"HOU",age:29},{season:2006,war:6.5,team:"HOU",age:30},{season:2007,war:4.3,team:"HOU",age:31},
      {season:2008,war:5.5,team:"HOU",age:32},{season:2009,war:0.2,team:"HOU",age:33},{season:2010,war:2.7,team:"NYY",age:34},
      {season:2011,war:4.5,team:"STL",age:35},{season:2012,war:0.7,team:"STL",age:36},{season:2013,war:1.5,team:"STL",age:37}
    ]
  },
  {
    playerId: 110811, playerName: "Jason Bay", bbrefId: "bayja01", positionCategory: "LF",
    careerWAR: 24.7, seasons: [
      {season:2003,war:0.3,team:"SDP",age:24},{season:2004,war:5.2,team:"PIT",age:25},{season:2005,war:4.5,team:"PIT",age:26},
      {season:2006,war:3.3,team:"PIT",age:27},{season:2007,war:1.7,team:"PIT",age:28},{season:2008,war:3.8,team:"PIT",age:29},
      {season:2009,war:5.1,team:"BOS",age:30},{season:2010,war:-0.2,team:"NYM",age:31},{season:2011,war:-0.2,team:"NYM",age:32},
      {season:2012,war:0.2,team:"NYM",age:33},{season:2013,war:1.0,team:"SEA",age:34}
    ]
  },
  {
    playerId: 120485, playerName: "Andy Pettitte", bbrefId: "pettian01", positionCategory: "SP",
    careerWAR: 60.7, seasons: [
      {season:1995,war:2.7,team:"NYY",age:23},{season:1996,war:5.4,team:"NYY",age:24},{season:1997,war:4.2,team:"NYY",age:25},
      {season:1998,war:1.2,team:"NYY",age:26},{season:1999,war:1.4,team:"NYY",age:27},{season:2000,war:3.1,team:"NYY",age:28},
      {season:2001,war:1.2,team:"NYY",age:29},{season:2002,war:3.7,team:"NYY",age:30},{season:2003,war:3.2,team:"NYY",age:31},
      {season:2004,war:3.3,team:"HOU",age:32},{season:2005,war:5.6,team:"HOU",age:33},{season:2006,war:3.2,team:"HOU",age:34},
      {season:2007,war:3.1,team:"NYY",age:35},{season:2008,war:2.2,team:"NYY",age:36},{season:2009,war:4.7,team:"NYY",age:37},
      {season:2010,war:3.2,team:"NYY",age:38},{season:2012,war:3.7,team:"NYY",age:40},{season:2013,war:5.6,team:"NYY",age:41}
    ]
  },
  {
    playerId: 136860, playerName: "Michael Young", bbrefId: "youngmi02", positionCategory: "SS",
    careerWAR: 26.8, seasons: [
      {season:2000,war:0.2,team:"TEX",age:23},{season:2001,war:1.5,team:"TEX",age:24},{season:2002,war:0.3,team:"TEX",age:25},
      {season:2003,war:3.2,team:"TEX",age:26},{season:2004,war:2.0,team:"TEX",age:27},{season:2005,war:4.7,team:"TEX",age:28},
      {season:2006,war:1.1,team:"TEX",age:29},{season:2007,war:1.5,team:"TEX",age:30},{season:2008,war:2.2,team:"TEX",age:31},
      {season:2009,war:2.6,team:"TEX",age:32},{season:2010,war:0.8,team:"TEX",age:33},{season:2011,war:2.5,team:"TEX",age:34},
      {season:2012,war:1.6,team:"TEX",age:35},{season:2013,war:2.6,team:"PHI",age:36}
    ]
  },
  {
    playerId: 285078, playerName: "Hideki Matsui", bbrefId: "matsuhi01", positionCategory: "LF",
    careerWAR: 21.4, seasons: [
      {season:2003,war:2.7,team:"NYY",age:29},{season:2004,war:2.5,team:"NYY",age:30},{season:2005,war:2.2,team:"NYY",age:31},
      {season:2006,war:1.8,team:"NYY",age:32},{season:2007,war:3.7,team:"NYY",age:33},{season:2008,war:1.8,team:"NYY",age:34},
      {season:2009,war:2.3,team:"NYY",age:35},{season:2010,war:1.1,team:"LAA",age:36},{season:2011,war:1.2,team:"OAK",age:37},
      {season:2012,war:2.1,team:"TBR",age:38}
    ]
  },

  // ===== 2014 Retirements =====
  {
    playerId: 110253, playerName: "Bobby Abreu", bbrefId: "abreubo01", positionCategory: "RF",
    careerWAR: 60.2, seasons: [
      {season:1996,war:0.2,team:"HOU",age:22},{season:1997,war:0.5,team:"HOU",age:23},{season:1998,war:4.2,team:"PHI",age:24},
      {season:1999,war:3.3,team:"PHI",age:25},{season:2000,war:3.5,team:"PHI",age:26},{season:2001,war:5.5,team:"PHI",age:27},
      {season:2002,war:4.3,team:"PHI",age:28},{season:2003,war:3.3,team:"PHI",age:29},{season:2004,war:7.8,team:"PHI",age:30},
      {season:2005,war:5.2,team:"PHI",age:31},{season:2006,war:3.2,team:"NYY",age:32},{season:2007,war:3.1,team:"NYY",age:33},
      {season:2008,war:4.3,team:"NYY",age:34},{season:2009,war:2.5,team:"LAA",age:35},{season:2010,war:2.5,team:"LAA",age:36},
      {season:2011,war:1.6,team:"LAA",age:37},{season:2012,war:2.7,team:"LAD",age:38},{season:2013,war:1.2,team:"PHI",age:39},
      {season:2014,war:1.3,team:"NYM",age:40}
    ]
  },
  {
    playerId: 113012, playerName: "Eric Chavez", bbrefId: "chaveer01", positionCategory: "3B",
    careerWAR: 38.3, seasons: [
      {season:1998,war:-0.3,team:"OAK",age:20},{season:1999,war:1.0,team:"OAK",age:21},{season:2000,war:2.5,team:"OAK",age:22},
      {season:2001,war:5.8,team:"OAK",age:23},{season:2002,war:6.0,team:"OAK",age:24},{season:2003,war:3.2,team:"OAK",age:25},
      {season:2004,war:5.2,team:"OAK",age:26},{season:2005,war:5.5,team:"OAK",age:27},{season:2006,war:4.5,team:"OAK",age:28},
      {season:2007,war:0.7,team:"OAK",age:29},{season:2008,war:0.2,team:"OAK",age:30},{season:2010,war:1.2,team:"NYY",age:32},
      {season:2011,war:0.8,team:"NYY",age:33},{season:2012,war:1.2,team:"NYY",age:34},{season:2013,war:0.5,team:"ARI",age:35},
      {season:2014,war:0.3,team:"ARI",age:36}
    ]
  },
  {
    playerId: 114015, playerName: "Adam Dunn", bbrefId: "dunnad01", positionCategory: "LF",
    careerWAR: 18.0, seasons: [
      {season:2001,war:1.5,team:"CIN",age:21},{season:2002,war:1.2,team:"CIN",age:22},{season:2003,war:1.0,team:"CIN",age:23},
      {season:2004,war:3.7,team:"CIN",age:24},{season:2005,war:1.2,team:"CIN",age:25},{season:2006,war:1.2,team:"CIN",age:26},
      {season:2007,war:1.2,team:"CIN",age:27},{season:2008,war:1.5,team:"CIN",age:28},{season:2009,war:0.2,team:"WSN",age:29},
      {season:2010,war:1.5,team:"WSN",age:30},{season:2011,war:-1.5,team:"CHW",age:31},{season:2012,war:2.4,team:"CHW",age:32},
      {season:2013,war:0.7,team:"CHW",age:33},{season:2014,war:2.2,team:"OAK",age:34}
    ]
  },
  {
    playerId: 110898, playerName: "Jason Bartlett", bbrefId: "bartlja01", positionCategory: "SS",
    careerWAR: 18.4, seasons: [
      {season:2004,war:0.6,team:"MIN",age:24},{season:2005,war:0.7,team:"MIN",age:25},{season:2006,war:1.2,team:"MIN",age:26},
      {season:2007,war:2.6,team:"MIN",age:27},{season:2008,war:1.5,team:"TBR",age:28},{season:2009,war:6.5,team:"TBR",age:29},
      {season:2010,war:2.4,team:"TBR",age:30},{season:2011,war:0.7,team:"SDP",age:31},{season:2012,war:1.0,team:"SDP",age:32},
      {season:2014,war:1.2,team:"MIN",age:34}
    ]
  },
];

// Read existing data
const existingData = JSON.parse(fs.readFileSync(WAR_DATA_PATH, 'utf-8'));
const existingIds = new Set(existingData.map(p => p.playerId));
const existingNames = new Set(existingData.map(p => p.playerName.toLowerCase()));

let added = 0;
let skipped = 0;
const duplicateIds = [];

for (const player of MISSING_PLAYERS) {
  // Check for duplicate by ID or name
  if (existingIds.has(player.playerId)) {
    // Check if this is a different player sharing an ID (Moises Alou vs Edgardo Alfonzo share 110690)
    const existing = existingData.find(p => p.playerId === player.playerId);
    if (existing && existing.playerName.toLowerCase() !== player.playerName.toLowerCase()) {
      // Different player, need a unique ID — offset by 1
      player.playerId = player.playerId + 100000;
    } else {
      duplicateIds.push(player.playerName + ' (id:' + player.playerId + ')');
      skipped++;
      continue;
    }
  }
  if (existingNames.has(player.playerName.toLowerCase())) {
    duplicateIds.push(player.playerName + ' (name already exists)');
    skipped++;
    continue;
  }

  existingData.push(player);
  existingIds.add(player.playerId);
  existingNames.add(player.playerName.toLowerCase());
  added++;
}

// Write updated data
fs.writeFileSync(WAR_DATA_PATH, JSON.stringify(existingData, null, 2));

console.log(`Added ${added} new players`);
console.log(`Skipped ${skipped} duplicates`);
if (duplicateIds.length > 0) {
  console.log('Duplicates:', duplicateIds);
}
console.log(`Total players now: ${existingData.length}`);
