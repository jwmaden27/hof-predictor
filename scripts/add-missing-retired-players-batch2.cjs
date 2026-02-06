/**
 * Script to add more missing retired players (2000-2014) with 10+ career WAR
 * to war-data.json. This is batch 2 following the initial script.
 *
 * Data sourced from Baseball Reference and Hall of Stats.
 * Run: node scripts/add-missing-retired-players-batch2.cjs
 */
const fs = require('fs');
const path = require('path');

const WAR_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'war-data.json');

// Missing players with 10+ career WAR who retired 2000-2014
// Format: { playerId, playerName, bbrefId, positionCategory, careerWAR, seasons: [{season, war, team, age}] }
const MISSING_PLAYERS = [
  // ===== STARTING PITCHERS =====
  {
    playerId: 121811, playerName: "Curt Schilling", bbrefId: "schilcu01", positionCategory: "SP",
    careerWAR: 79.5, seasons: [
      {season:1988,war:-0.8,team:"BAL",age:21},{season:1989,war:-0.1,team:"BAL",age:22},{season:1990,war:1.2,team:"BAL",age:23},
      {season:1991,war:-0.1,team:"HOU",age:24},{season:1992,war:5.8,team:"PHI",age:25},{season:1993,war:2.6,team:"PHI",age:26},
      {season:1994,war:1.1,team:"PHI",age:27},{season:1995,war:2.2,team:"PHI",age:28},{season:1996,war:4.8,team:"PHI",age:29},
      {season:1997,war:6.3,team:"PHI",age:30},{season:1998,war:6.0,team:"PHI",age:31},{season:1999,war:4.8,team:"PHI",age:32},
      {season:2000,war:5.2,team:"ARI",age:33},{season:2001,war:8.5,team:"ARI",age:34},{season:2002,war:8.5,team:"ARI",age:35},
      {season:2003,war:5.7,team:"ARI",age:36},{season:2004,war:7.7,team:"BOS",age:37},{season:2005,war:0.4,team:"BOS",age:38},
      {season:2006,war:5.6,team:"BOS",age:39},{season:2007,war:4.0,team:"BOS",age:40}
    ]
  },
  {
    playerId: 111554, playerName: "Kevin Brown", bbrefId: "brownke01", positionCategory: "SP",
    careerWAR: 68.0, seasons: [
      {season:1986,war:0.2,team:"TEX",age:21},{season:1988,war:-0.2,team:"TEX",age:23},{season:1989,war:3.6,team:"TEX",age:24},
      {season:1990,war:2.1,team:"TEX",age:25},{season:1991,war:1.6,team:"TEX",age:26},{season:1992,war:4.8,team:"TEX",age:27},
      {season:1993,war:4.0,team:"TEX",age:28},{season:1994,war:1.6,team:"TEX",age:29},{season:1995,war:4.3,team:"BAL",age:30},
      {season:1996,war:7.8,team:"FLA",age:31},{season:1997,war:6.8,team:"FLA",age:32},{season:1998,war:9.1,team:"SDP",age:33},
      {season:1999,war:5.6,team:"LAD",age:34},{season:2000,war:6.7,team:"LAD",age:35},{season:2001,war:3.2,team:"LAD",age:36},
      {season:2002,war:-0.1,team:"LAD",age:37},{season:2003,war:4.5,team:"LAD",age:38},{season:2004,war:2.8,team:"NYY",age:39},
      {season:2005,war:-0.4,team:"NYY",age:40}
    ]
  },
  {
    playerId: 112552, playerName: "David Cone", bbrefId: "coneda01", positionCategory: "SP",
    careerWAR: 62.1, seasons: [
      {season:1986,war:-0.1,team:"KCR",age:23},{season:1987,war:0.8,team:"NYM",age:24},{season:1988,war:5.7,team:"NYM",age:25},
      {season:1989,war:1.9,team:"NYM",age:26},{season:1990,war:4.3,team:"NYM",age:27},{season:1991,war:4.3,team:"NYM",age:28},
      {season:1992,war:4.8,team:"TOR",age:29},{season:1993,war:7.2,team:"KCR",age:30},{season:1994,war:6.9,team:"KCR",age:31},
      {season:1995,war:7.0,team:"NYY",age:32},{season:1996,war:2.8,team:"NYY",age:33},{season:1997,war:6.7,team:"NYY",age:34},
      {season:1998,war:3.9,team:"NYY",age:35},{season:1999,war:5.1,team:"NYY",age:36},{season:2000,war:-0.9,team:"NYY",age:37},
      {season:2001,war:1.8,team:"BOS",age:38},{season:2003,war:-0.1,team:"NYM",age:40}
    ]
  },
  {
    playerId: 114133, playerName: "Chuck Finley", bbrefId: "finlech01", positionCategory: "SP",
    careerWAR: 57.8, seasons: [
      {season:1986,war:0.6,team:"CAL",age:23},{season:1987,war:-0.1,team:"CAL",age:24},{season:1988,war:2.0,team:"CAL",age:25},
      {season:1989,war:4.9,team:"CAL",age:26},{season:1990,war:7.7,team:"CAL",age:27},{season:1991,war:4.1,team:"CAL",age:28},
      {season:1992,war:2.2,team:"CAL",age:29},{season:1993,war:7.1,team:"CAL",age:30},{season:1994,war:3.4,team:"CAL",age:31},
      {season:1995,war:3.0,team:"CAL",age:32},{season:1996,war:4.2,team:"CAL",age:33},{season:1997,war:3.1,team:"ANA",age:34},
      {season:1998,war:7.1,team:"ANA",age:35},{season:1999,war:2.4,team:"ANA",age:36},{season:2000,war:4.4,team:"CLE",age:37},
      {season:2001,war:-0.1,team:"CLE",age:38},{season:2002,war:1.8,team:"STL",age:39}
    ]
  },
  {
    playerId: 115861, playerName: "Orel Hershiser", bbrefId: "hershor01", positionCategory: "SP",
    careerWAR: 56.0, seasons: [
      {season:1983,war:-0.1,team:"LAD",age:24},{season:1984,war:4.6,team:"LAD",age:25},{season:1985,war:6.3,team:"LAD",age:26},
      {season:1986,war:2.8,team:"LAD",age:27},{season:1987,war:7.3,team:"LAD",age:28},{season:1988,war:7.1,team:"LAD",age:29},
      {season:1989,war:7.3,team:"LAD",age:30},{season:1990,war:-0.1,team:"LAD",age:31},{season:1991,war:2.5,team:"LAD",age:32},
      {season:1992,war:2.7,team:"LAD",age:33},{season:1993,war:3.8,team:"LAD",age:34},{season:1994,war:2.3,team:"LAD",age:35},
      {season:1995,war:3.7,team:"CLE",age:36},{season:1996,war:2.6,team:"CLE",age:37},{season:1997,war:2.3,team:"CLE",age:38},
      {season:1998,war:1.4,team:"SFG",age:39},{season:1999,war:1.6,team:"NYM",age:40},{season:2000,war:-2.1,team:"LAD",age:41}
    ]
  },
  {
    playerId: 124071, playerName: "David Wells", bbrefId: "wellsda01", positionCategory: "SP",
    careerWAR: 53.4, seasons: [
      {season:1987,war:0.4,team:"TOR",age:24},{season:1988,war:-0.7,team:"TOR",age:25},{season:1989,war:2.1,team:"TOR",age:26},
      {season:1990,war:4.3,team:"TOR",age:27},{season:1991,war:3.1,team:"TOR",age:28},{season:1992,war:-1.9,team:"TOR",age:29},
      {season:1993,war:2.9,team:"DET",age:30},{season:1994,war:2.7,team:"DET",age:31},{season:1995,war:5.2,team:"CIN",age:32},
      {season:1996,war:2.9,team:"BAL",age:33},{season:1997,war:4.3,team:"NYY",age:34},{season:1998,war:4.8,team:"NYY",age:35},
      {season:1999,war:2.9,team:"TOR",age:36},{season:2000,war:4.8,team:"TOR",age:37},{season:2001,war:1.3,team:"CHW",age:38},
      {season:2002,war:3.7,team:"NYY",age:39},{season:2003,war:4.3,team:"NYY",age:40},{season:2004,war:2.7,team:"SDP",age:41},
      {season:2005,war:3.3,team:"BOS",age:42},{season:2006,war:0.9,team:"SDP",age:43},{season:2007,war:-0.5,team:"LAD",age:44}
    ]
  },
  {
    playerId: 119469, playerName: "Jamie Moyer", bbrefId: "moyerja01", positionCategory: "SP",
    careerWAR: 49.6, seasons: [
      {season:1986,war:0.8,team:"CHC",age:23},{season:1987,war:1.4,team:"CHC",age:24},{season:1988,war:3.1,team:"CHC",age:25},
      {season:1989,war:-0.6,team:"TEX",age:26},{season:1990,war:0.0,team:"TEX",age:27},{season:1991,war:-0.6,team:"STL",age:28},
      {season:1993,war:3.0,team:"BAL",age:30},{season:1994,war:1.8,team:"BAL",age:31},{season:1995,war:0.5,team:"BAL",age:32},
      {season:1996,war:2.6,team:"SEA",age:33},{season:1997,war:3.7,team:"SEA",age:34},{season:1998,war:5.5,team:"SEA",age:35},
      {season:1999,war:6.6,team:"SEA",age:36},{season:2000,war:-0.2,team:"SEA",age:37},{season:2001,war:3.3,team:"SEA",age:38},
      {season:2002,war:5.6,team:"SEA",age:39},{season:2003,war:4.8,team:"SEA",age:40},{season:2004,war:0.4,team:"SEA",age:41},
      {season:2005,war:2.4,team:"SEA",age:42},{season:2006,war:1.9,team:"PHI",age:43},{season:2007,war:0.1,team:"PHI",age:44},
      {season:2008,war:2.8,team:"PHI",age:45},{season:2009,war:0.4,team:"PHI",age:46},{season:2010,war:0.2,team:"PHI",age:47},
      {season:2012,war:0.1,team:"COL",age:49}
    ]
  },
  {
    playerId: 120878, playerName: "Brad Radke", bbrefId: "radkebr01", positionCategory: "SP",
    careerWAR: 45.3, seasons: [
      {season:1995,war:1.6,team:"MIN",age:22},{season:1996,war:3.5,team:"MIN",age:23},{season:1997,war:4.5,team:"MIN",age:24},
      {season:1998,war:5.2,team:"MIN",age:25},{season:1999,war:6.5,team:"MIN",age:26},{season:2000,war:6.2,team:"MIN",age:27},
      {season:2001,war:4.5,team:"MIN",age:28},{season:2002,war:0.6,team:"MIN",age:29},{season:2003,war:2.5,team:"MIN",age:30},
      {season:2004,war:5.8,team:"MIN",age:31},{season:2005,war:2.7,team:"MIN",age:32},{season:2006,war:1.7,team:"MIN",age:33}
    ]
  },
  {
    playerId: 134320, playerName: "Javier Vazquez", bbrefId: "vazquja01", positionCategory: "SP",
    careerWAR: 45.6, seasons: [
      {season:1998,war:-1.8,team:"MON",age:21},{season:1999,war:1.2,team:"MON",age:22},{season:2000,war:5.2,team:"MON",age:23},
      {season:2001,war:6.3,team:"MON",age:24},{season:2002,war:2.9,team:"MON",age:25},{season:2003,war:6.0,team:"MON",age:26},
      {season:2004,war:2.6,team:"NYY",age:27},{season:2005,war:2.5,team:"ARI",age:28},{season:2006,war:2.9,team:"CHW",age:29},
      {season:2007,war:6.1,team:"CHW",age:30},{season:2008,war:3.1,team:"CHW",age:31},{season:2009,war:6.4,team:"ATL",age:32},
      {season:2010,war:-0.5,team:"NYY",age:33},{season:2011,war:2.7,team:"FLA",age:34}
    ]
  },
  {
    playerId: 117652, playerName: "Al Leiter", bbrefId: "leiteal01", positionCategory: "SP",
    careerWAR: 40.2, seasons: [
      {season:1987,war:-0.1,team:"NYY",age:21},{season:1988,war:0.8,team:"NYY",age:22},{season:1989,war:-0.5,team:"TOR",age:23},
      {season:1990,war:0.3,team:"TOR",age:24},{season:1991,war:-0.2,team:"TOR",age:25},{season:1992,war:0.0,team:"TOR",age:26},
      {season:1993,war:1.4,team:"TOR",age:27},{season:1994,war:1.4,team:"TOR",age:28},{season:1995,war:5.7,team:"TOR",age:29},
      {season:1996,war:5.2,team:"FLA",age:30},{season:1997,war:1.0,team:"FLA",age:31},{season:1998,war:6.8,team:"NYM",age:32},
      {season:1999,war:2.2,team:"NYM",age:33},{season:2000,war:4.3,team:"NYM",age:34},{season:2001,war:2.6,team:"NYM",age:35},
      {season:2002,war:2.8,team:"NYM",age:36},{season:2003,war:3.0,team:"NYM",age:37},{season:2004,war:4.7,team:"NYM",age:38},
      {season:2005,war:-1.2,team:"NYY",age:39}
    ]
  },
  {
    playerId: 117955, playerName: "Derek Lowe", bbrefId: "lowede01", positionCategory: "SP",
    careerWAR: 34.3, seasons: [
      {season:1997,war:-0.5,team:"BOS",age:24},{season:1998,war:0.6,team:"BOS",age:25},{season:1999,war:3.5,team:"BOS",age:26},
      {season:2000,war:3.5,team:"BOS",age:27},{season:2001,war:2.2,team:"BOS",age:28},{season:2002,war:7.3,team:"BOS",age:29},
      {season:2003,war:2.7,team:"BOS",age:30},{season:2004,war:-0.7,team:"BOS",age:31},{season:2005,war:1.7,team:"LAD",age:32},
      {season:2006,war:4.5,team:"LAD",age:33},{season:2007,war:2.3,team:"LAD",age:34},{season:2008,war:4.5,team:"LAD",age:35},
      {season:2009,war:1.4,team:"ATL",age:36},{season:2010,war:2.2,team:"ATL",age:37},{season:2011,war:-0.5,team:"ATL",age:38},
      {season:2012,war:0.0,team:"NYY",age:39},{season:2013,war:-0.5,team:"TEX",age:40}
    ]
  },
  {
    playerId: 124315, playerName: "Woody Williams", bbrefId: "williwo02", positionCategory: "SP",
    careerWAR: 30.2, seasons: [
      {season:1993,war:0.4,team:"TOR",age:26},{season:1994,war:1.5,team:"TOR",age:27},{season:1995,war:1.3,team:"TOR",age:28},
      {season:1996,war:0.8,team:"TOR",age:29},{season:1997,war:3.1,team:"TOR",age:30},{season:1998,war:2.6,team:"TOR",age:31},
      {season:1999,war:2.3,team:"SDP",age:32},{season:2000,war:3.4,team:"SDP",age:33},{season:2001,war:3.3,team:"STL",age:34},
      {season:2002,war:3.0,team:"STL",age:35},{season:2003,war:4.2,team:"STL",age:36},{season:2004,war:1.9,team:"STL",age:37},
      {season:2005,war:-0.3,team:"SDP",age:38},{season:2006,war:1.7,team:"SDP",age:39},{season:2007,war:1.0,team:"HOU",age:40}
    ]
  },
  {
    playerId: 115817, playerName: "Livan Hernandez", bbrefId: "hernali01", positionCategory: "SP",
    careerWAR: 29.9, seasons: [
      {season:1996,war:0.2,team:"FLA",age:21},{season:1997,war:1.8,team:"FLA",age:22},{season:1998,war:0.8,team:"FLA",age:23},
      {season:1999,war:2.6,team:"SFG",age:24},{season:2000,war:3.8,team:"SFG",age:25},{season:2001,war:0.1,team:"SFG",age:26},
      {season:2002,war:0.7,team:"SFG",age:27},{season:2003,war:6.4,team:"MON",age:28},{season:2004,war:5.7,team:"MON",age:29},
      {season:2005,war:3.7,team:"WSN",age:30},{season:2006,war:2.2,team:"ARI",age:31},{season:2007,war:1.6,team:"ARI",age:32},
      {season:2008,war:-1.1,team:"COL",age:33},{season:2009,war:-0.1,team:"WSN",age:34},{season:2010,war:3.1,team:"WSN",age:35},
      {season:2011,war:-0.1,team:"WSN",age:36},{season:2012,war:-1.5,team:"MIL",age:37}
    ]
  },
  {
    playerId: 150404, playerName: "Ted Lilly", bbrefId: "lillyte01", positionCategory: "SP",
    careerWAR: 27.2, seasons: [
      {season:1999,war:-0.4,team:"MON",age:23},{season:2000,war:0.0,team:"NYY",age:24},{season:2001,war:0.0,team:"NYY",age:25},
      {season:2002,war:2.4,team:"OAK",age:26},{season:2003,war:2.2,team:"OAK",age:27},{season:2004,war:4.2,team:"TOR",age:28},
      {season:2005,war:0.2,team:"TOR",age:29},{season:2006,war:1.6,team:"TOR",age:30},{season:2007,war:3.8,team:"CHC",age:31},
      {season:2008,war:4.0,team:"CHC",age:32},{season:2009,war:4.6,team:"CHC",age:33},{season:2010,war:3.5,team:"LAD",age:34},
      {season:2011,war:1.1,team:"LAD",age:35},{season:2012,war:0.5,team:"LAD",age:36},{season:2013,war:-0.5,team:"LAD",age:37}
    ]
  },
  {
    playerId: 282656, playerName: "Ben Sheets", bbrefId: "sheetbe01", positionCategory: "SP",
    careerWAR: 23.1, seasons: [
      {season:2001,war:0.4,team:"MIL",age:22},{season:2002,war:2.3,team:"MIL",age:23},{season:2003,war:1.8,team:"MIL",age:24},
      {season:2004,war:7.3,team:"MIL",age:25},{season:2005,war:2.8,team:"MIL",age:26},{season:2006,war:1.7,team:"MIL",age:27},
      {season:2007,war:2.5,team:"MIL",age:28},{season:2008,war:3.9,team:"MIL",age:29},{season:2010,war:0.2,team:"OAK",age:31},
      {season:2012,war:0.2,team:"ATL",age:33}
    ]
  },
  {
    playerId: 119827, playerName: "Hideo Nomo", bbrefId: "nomohi01", positionCategory: "SP",
    careerWAR: 20.9, seasons: [
      {season:1995,war:4.1,team:"LAD",age:26},{season:1996,war:4.6,team:"LAD",age:27},{season:1997,war:1.9,team:"LAD",age:28},
      {season:1998,war:0.8,team:"NYM",age:29},{season:1999,war:2.4,team:"MIL",age:30},{season:2000,war:2.5,team:"DET",age:31},
      {season:2001,war:3.1,team:"BOS",age:32},{season:2002,war:2.4,team:"LAD",age:33},{season:2003,war:3.5,team:"LAD",age:34},
      {season:2004,war:-2.4,team:"LAD",age:35},{season:2005,war:-1.5,team:"TBD",age:36},{season:2008,war:-0.5,team:"KCR",age:39}
    ]
  },
  {
    playerId: 117046, playerName: "Darryl Kile", bbrefId: "kileda01", positionCategory: "SP",
    careerWAR: 20.3, seasons: [
      {season:1991,war:-0.8,team:"HOU",age:22},{season:1992,war:0.0,team:"HOU",age:23},{season:1993,war:1.8,team:"HOU",age:24},
      {season:1994,war:-0.5,team:"HOU",age:25},{season:1995,war:-0.5,team:"HOU",age:26},{season:1996,war:0.9,team:"HOU",age:27},
      {season:1997,war:5.3,team:"HOU",age:28},{season:1998,war:2.6,team:"COL",age:29},{season:1999,war:1.7,team:"COL",age:30},
      {season:2000,war:3.8,team:"STL",age:31},{season:2001,war:5.0,team:"STL",age:32},{season:2002,war:1.0,team:"STL",age:33}
    ]
  },
  // ===== RELIEF PITCHERS =====
  {
    playerId: 114374, playerName: "John Franco", bbrefId: "francjo01", positionCategory: "RP",
    careerWAR: 23.5, seasons: [
      {season:1984,war:1.9,team:"CIN",age:23},{season:1985,war:3.2,team:"CIN",age:24},{season:1986,war:1.6,team:"CIN",age:25},
      {season:1987,war:2.5,team:"CIN",age:26},{season:1988,war:2.9,team:"CIN",age:27},{season:1989,war:0.8,team:"CIN",age:28},
      {season:1990,war:1.5,team:"NYM",age:29},{season:1991,war:0.1,team:"NYM",age:30},{season:1992,war:1.7,team:"NYM",age:31},
      {season:1993,war:-0.8,team:"NYM",age:32},{season:1994,war:0.9,team:"NYM",age:33},{season:1995,war:1.3,team:"NYM",age:34},
      {season:1996,war:1.4,team:"NYM",age:35},{season:1997,war:1.5,team:"NYM",age:36},{season:1998,war:0.7,team:"NYM",age:37},
      {season:1999,war:1.0,team:"NYM",age:38},{season:2000,war:0.8,team:"NYM",age:39},{season:2001,war:0.3,team:"NYM",age:40},
      {season:2003,war:0.9,team:"NYM",age:42},{season:2004,war:-0.2,team:"NYM",age:43},{season:2005,war:-0.5,team:"HOU",age:44}
    ]
  },
  {
    playerId: 114342, playerName: "Keith Foulke", bbrefId: "foulkke01", positionCategory: "RP",
    careerWAR: 20.6, seasons: [
      {season:1997,war:-0.7,team:"CHW",age:24},{season:1998,war:0.8,team:"CHW",age:25},{season:1999,war:4.4,team:"CHW",age:26},
      {season:2000,war:3.0,team:"CHW",age:27},{season:2001,war:3.7,team:"CHW",age:28},{season:2002,war:1.7,team:"CHW",age:29},
      {season:2003,war:3.5,team:"OAK",age:30},{season:2004,war:3.5,team:"BOS",age:31},{season:2005,war:-0.2,team:"BOS",age:32},
      {season:2006,war:0.8,team:"BOS",age:33},{season:2008,war:0.1,team:"OAK",age:35}
    ]
  },
  {
    playerId: 120401, playerName: "Troy Percival", bbrefId: "percitr01", positionCategory: "RP",
    careerWAR: 17.1, seasons: [
      {season:1995,war:3.2,team:"CAL",age:25},{season:1996,war:3.4,team:"CAL",age:26},{season:1997,war:1.3,team:"ANA",age:27},
      {season:1998,war:1.5,team:"ANA",age:28},{season:1999,war:1.2,team:"ANA",age:29},{season:2000,war:0.3,team:"ANA",age:30},
      {season:2001,war:1.9,team:"ANA",age:31},{season:2002,war:2.4,team:"ANA",age:32},{season:2003,war:0.6,team:"ANA",age:33},
      {season:2004,war:1.1,team:"ANA",age:34},{season:2005,war:-0.4,team:"DET",age:35},{season:2007,war:1.1,team:"STL",age:37},
      {season:2008,war:-0.3,team:"TBR",age:38},{season:2009,war:-0.2,team:"TBR",age:39}
    ]
  },
  {
    playerId: 119718, playerName: "Robb Nen", bbrefId: "nenro01", positionCategory: "RP",
    careerWAR: 15.0, seasons: [
      {season:1993,war:-0.9,team:"FLA",age:23},{season:1994,war:1.4,team:"FLA",age:24},{season:1995,war:1.0,team:"FLA",age:25},
      {season:1996,war:2.6,team:"FLA",age:26},{season:1997,war:0.4,team:"FLA",age:27},{season:1998,war:3.3,team:"SFG",age:28},
      {season:1999,war:0.5,team:"SFG",age:29},{season:2000,war:2.5,team:"SFG",age:30},{season:2001,war:1.6,team:"SFG",age:31},
      {season:2002,war:2.4,team:"SFG",age:32}
    ]
  },
  // ===== CATCHERS =====
  {
    playerId: 120691, playerName: "Jorge Posada", bbrefId: "posadjo01", positionCategory: "C",
    careerWAR: 42.7, seasons: [
      {season:1995,war:0.0,team:"NYY",age:23},{season:1996,war:-0.3,team:"NYY",age:24},{season:1997,war:0.6,team:"NYY",age:25},
      {season:1998,war:2.9,team:"NYY",age:26},{season:1999,war:1.1,team:"NYY",age:27},{season:2000,war:5.5,team:"NYY",age:28},
      {season:2001,war:3.0,team:"NYY",age:29},{season:2002,war:4.0,team:"NYY",age:30},{season:2003,war:5.9,team:"NYY",age:31},
      {season:2004,war:3.5,team:"NYY",age:32},{season:2005,war:4.4,team:"NYY",age:33},{season:2006,war:4.0,team:"NYY",age:34},
      {season:2007,war:5.4,team:"NYY",age:35},{season:2008,war:0.2,team:"NYY",age:36},{season:2009,war:1.6,team:"NYY",age:37},
      {season:2010,war:1.3,team:"NYY",age:38},{season:2011,war:-0.4,team:"NYY",age:39}
    ]
  },
  {
    playerId: 116974, playerName: "Jason Kendall", bbrefId: "kendaja01", positionCategory: "C",
    careerWAR: 41.7, seasons: [
      {season:1996,war:1.6,team:"PIT",age:22},{season:1997,war:4.1,team:"PIT",age:23},{season:1998,war:5.6,team:"PIT",age:24},
      {season:1999,war:4.1,team:"PIT",age:25},{season:2000,war:4.5,team:"PIT",age:26},{season:2001,war:0.1,team:"PIT",age:27},
      {season:2002,war:2.3,team:"PIT",age:28},{season:2003,war:4.5,team:"PIT",age:29},{season:2004,war:3.9,team:"PIT",age:30},
      {season:2005,war:2.5,team:"OAK",age:31},{season:2006,war:3.7,team:"OAK",age:32},{season:2007,war:1.3,team:"CHC",age:33},
      {season:2008,war:2.9,team:"MIL",age:34},{season:2009,war:0.1,team:"MIL",age:35},{season:2010,war:0.5,team:"KCR",age:36}
    ]
  },
  {
    playerId: 117919, playerName: "Javy Lopez", bbrefId: "lopezja01", positionCategory: "C",
    careerWAR: 29.8, seasons: [
      {season:1992,war:0.1,team:"ATL",age:21},{season:1993,war:0.4,team:"ATL",age:22},{season:1994,war:-0.1,team:"ATL",age:23},
      {season:1995,war:1.8,team:"ATL",age:24},{season:1996,war:1.5,team:"ATL",age:25},{season:1997,war:3.5,team:"ATL",age:26},
      {season:1998,war:3.3,team:"ATL",age:27},{season:1999,war:2.1,team:"ATL",age:28},{season:2000,war:2.5,team:"ATL",age:29},
      {season:2001,war:1.5,team:"ATL",age:30},{season:2002,war:0.2,team:"ATL",age:31},{season:2003,war:6.8,team:"ATL",age:32},
      {season:2004,war:4.8,team:"BAL",age:33},{season:2005,war:2.0,team:"BAL",age:34},{season:2006,war:-0.6,team:"BOS",age:35}
    ]
  },
  // ===== INFIELDERS =====
  {
    playerId: 114789, playerName: "Brian Giles", bbrefId: "gilesbr02", positionCategory: "RF",
    careerWAR: 51.3, seasons: [
      {season:1995,war:0.3,team:"CLE",age:24},{season:1996,war:1.4,team:"CLE",age:25},{season:1997,war:2.0,team:"CLE",age:26},
      {season:1998,war:4.0,team:"CLE",age:27},{season:1999,war:6.7,team:"PIT",age:28},{season:2000,war:6.4,team:"PIT",age:29},
      {season:2001,war:5.4,team:"PIT",age:30},{season:2002,war:5.3,team:"PIT",age:31},{season:2003,war:3.4,team:"SDP",age:32},
      {season:2004,war:3.8,team:"SDP",age:33},{season:2005,war:4.9,team:"SDP",age:34},{season:2006,war:3.3,team:"SDP",age:35},
      {season:2007,war:1.5,team:"SDP",age:36},{season:2008,war:4.8,team:"SDP",age:37},{season:2009,war:-1.9,team:"SDP",age:38}
    ]
  },
  {
    playerId: 114935, playerName: "Luis Gonzalez", bbrefId: "gonzalu01", positionCategory: "LF",
    careerWAR: 51.8, seasons: [
      {season:1990,war:0.0,team:"HOU",age:22},{season:1991,war:3.6,team:"HOU",age:23},{season:1992,war:2.6,team:"HOU",age:24},
      {season:1993,war:5.3,team:"HOU",age:25},{season:1994,war:1.6,team:"HOU",age:26},{season:1995,war:2.3,team:"CHC",age:27},
      {season:1996,war:2.6,team:"CHC",age:28},{season:1997,war:2.0,team:"HOU",age:29},{season:1998,war:2.3,team:"DET",age:30},
      {season:1999,war:6.4,team:"ARI",age:31},{season:2000,war:4.2,team:"ARI",age:32},{season:2001,war:7.9,team:"ARI",age:33},
      {season:2002,war:3.2,team:"ARI",age:34},{season:2003,war:3.2,team:"ARI",age:35},{season:2004,war:1.5,team:"ARI",age:36},
      {season:2005,war:2.6,team:"ARI",age:37},{season:2006,war:1.0,team:"ARI",age:38},{season:2007,war:0.1,team:"LAD",age:39},
      {season:2008,war:-0.6,team:"FLA",age:40}
    ]
  },
  {
    playerId: 123173, playerName: "Miguel Tejada", bbrefId: "tejadmi01", positionCategory: "SS",
    careerWAR: 47.3, seasons: [
      {season:1997,war:-0.2,team:"OAK",age:21},{season:1998,war:-0.2,team:"OAK",age:22},{season:1999,war:3.6,team:"OAK",age:23},
      {season:2000,war:4.2,team:"OAK",age:24},{season:2001,war:4.2,team:"OAK",age:25},{season:2002,war:5.7,team:"OAK",age:26},
      {season:2003,war:4.9,team:"OAK",age:27},{season:2004,war:7.4,team:"BAL",age:28},{season:2005,war:5.9,team:"BAL",age:29},
      {season:2006,war:4.5,team:"BAL",age:30},{season:2007,war:2.3,team:"BAL",age:31},{season:2008,war:1.9,team:"HOU",age:32},
      {season:2009,war:1.9,team:"HOU",age:33},{season:2010,war:0.7,team:"SDP",age:34},{season:2011,war:0.2,team:"SFG",age:35},
      {season:2013,war:0.3,team:"KCR",age:37}
    ]
  },
  {
    playerId: 123744, playerName: "Omar Vizquel", bbrefId: "vizquom01", positionCategory: "SS",
    careerWAR: 45.5, seasons: [
      {season:1989,war:0.7,team:"SEA",age:22},{season:1990,war:1.5,team:"SEA",age:23},{season:1991,war:2.1,team:"SEA",age:24},
      {season:1992,war:3.5,team:"SEA",age:25},{season:1993,war:2.6,team:"SEA",age:26},{season:1994,war:0.8,team:"CLE",age:27},
      {season:1995,war:1.5,team:"CLE",age:28},{season:1996,war:3.3,team:"CLE",age:29},{season:1997,war:3.5,team:"CLE",age:30},
      {season:1998,war:3.4,team:"CLE",age:31},{season:1999,war:6.0,team:"CLE",age:32},{season:2000,war:2.8,team:"CLE",age:33},
      {season:2001,war:-0.2,team:"CLE",age:34},{season:2002,war:3.0,team:"CLE",age:35},{season:2003,war:2.0,team:"CLE",age:36},
      {season:2004,war:4.0,team:"CLE",age:37},{season:2005,war:1.5,team:"SFG",age:38},{season:2006,war:2.9,team:"SFG",age:39},
      {season:2007,war:0.7,team:"SFG",age:40},{season:2008,war:-0.5,team:"SFG",age:41},{season:2009,war:0.9,team:"TEX",age:42},
      {season:2010,war:0.2,team:"CHW",age:43},{season:2011,war:-0.4,team:"CHW",age:44},{season:2012,war:-0.3,team:"TOR",age:45}
    ]
  },
  {
    playerId: 135784, playerName: "Placido Polanco", bbrefId: "polanpl01", positionCategory: "2B",
    careerWAR: 41.8, seasons: [
      {season:1998,war:-0.4,team:"STL",age:22},{season:1999,war:-0.9,team:"STL",age:23},{season:2000,war:2.0,team:"STL",age:24},
      {season:2001,war:4.5,team:"STL",age:25},{season:2002,war:3.5,team:"PHI",age:26},{season:2003,war:4.6,team:"PHI",age:27},
      {season:2004,war:1.7,team:"PHI",age:28},{season:2005,war:6.1,team:"DET",age:29},{season:2006,war:1.9,team:"DET",age:30},
      {season:2007,war:6.1,team:"DET",age:31},{season:2008,war:4.4,team:"DET",age:32},{season:2009,war:2.5,team:"DET",age:33},
      {season:2010,war:3.2,team:"PHI",age:34},{season:2011,war:1.9,team:"PHI",age:35},{season:2012,war:0.4,team:"PHI",age:36},
      {season:2013,war:0.3,team:"MIA",age:37}
    ]
  },
  {
    playerId: 136267, playerName: "Troy Glaus", bbrefId: "glaustr01", positionCategory: "3B",
    careerWAR: 38.0, seasons: [
      {season:1998,war:-0.6,team:"ANA",age:21},{season:1999,war:3.1,team:"ANA",age:22},{season:2000,war:7.8,team:"ANA",age:23},
      {season:2001,war:5.2,team:"ANA",age:24},{season:2002,war:4.4,team:"ANA",age:25},{season:2003,war:1.3,team:"ANA",age:26},
      {season:2004,war:1.4,team:"ANA",age:27},{season:2005,war:3.4,team:"ARI",age:28},{season:2006,war:4.3,team:"TOR",age:29},
      {season:2007,war:3.3,team:"TOR",age:30},{season:2008,war:4.4,team:"STL",age:31},{season:2009,war:-0.2,team:"STL",age:32},
      {season:2010,war:0.2,team:"ATL",age:33}
    ]
  },
  {
    playerId: 115094, playerName: "Shawn Green", bbrefId: "greensh01", positionCategory: "RF",
    careerWAR: 34.8, seasons: [
      {season:1993,war:-0.1,team:"TOR",age:20},{season:1994,war:-0.7,team:"TOR",age:21},{season:1995,war:0.5,team:"TOR",age:22},
      {season:1996,war:1.0,team:"TOR",age:23},{season:1997,war:2.1,team:"TOR",age:24},{season:1998,war:4.0,team:"TOR",age:25},
      {season:1999,war:6.4,team:"TOR",age:26},{season:2000,war:3.1,team:"LAD",age:27},{season:2001,war:7.0,team:"LAD",age:28},
      {season:2002,war:6.9,team:"LAD",age:29},{season:2003,war:2.1,team:"LAD",age:30},{season:2004,war:2.0,team:"LAD",age:31},
      {season:2005,war:1.1,team:"ARI",age:32},{season:2006,war:-0.9,team:"NYM",age:33},{season:2007,war:0.3,team:"NYM",age:34}
    ]
  },
  {
    playerId: 117601, playerName: "Derrek Lee", bbrefId: "leede02", positionCategory: "1B",
    careerWAR: 34.6, seasons: [
      {season:1997,war:0.3,team:"SDP",age:21},{season:1998,war:0.8,team:"FLA",age:22},{season:1999,war:-0.9,team:"FLA",age:23},
      {season:2000,war:2.0,team:"FLA",age:24},{season:2001,war:2.1,team:"FLA",age:25},{season:2002,war:3.0,team:"FLA",age:26},
      {season:2003,war:2.9,team:"FLA",age:27},{season:2004,war:2.7,team:"CHC",age:28},{season:2005,war:7.7,team:"CHC",age:29},
      {season:2006,war:0.8,team:"CHC",age:30},{season:2007,war:3.5,team:"CHC",age:31},{season:2008,war:1.9,team:"CHC",age:32},
      {season:2009,war:5.4,team:"CHC",age:33},{season:2010,war:1.5,team:"ATL",age:34},{season:2011,war:0.9,team:"PIT",age:35}
    ]
  },
  {
    playerId: 113889, playerName: "Darin Erstad", bbrefId: "erstada01", positionCategory: "CF",
    careerWAR: 32.3, seasons: [
      {season:1996,war:0.9,team:"CAL",age:22},{season:1997,war:3.3,team:"ANA",age:23},{season:1998,war:2.6,team:"ANA",age:24},
      {season:1999,war:2.4,team:"ANA",age:25},{season:2000,war:8.4,team:"ANA",age:26},{season:2001,war:2.9,team:"ANA",age:27},
      {season:2002,war:6.3,team:"ANA",age:28},{season:2003,war:0.9,team:"ANA",age:29},{season:2004,war:2.8,team:"ANA",age:30},
      {season:2005,war:2.1,team:"LAA",age:31},{season:2006,war:0.0,team:"LAA",age:32},{season:2007,war:0.6,team:"CHW",age:33},
      {season:2008,war:0.0,team:"HOU",age:34},{season:2009,war:-0.9,team:"HOU",age:35}
    ]
  },
  {
    playerId: 123610, playerName: "Jose Valentin", bbrefId: "valenjo03", positionCategory: "SS",
    careerWAR: 31.7, seasons: [
      {season:1992,war:-0.1,team:"MIL",age:22},{season:1993,war:0.3,team:"MIL",age:23},{season:1994,war:2.5,team:"MIL",age:24},
      {season:1995,war:1.3,team:"MIL",age:25},{season:1996,war:3.9,team:"MIL",age:26},{season:1997,war:1.4,team:"MIL",age:27},
      {season:1998,war:2.0,team:"MIL",age:28},{season:1999,war:0.1,team:"MIL",age:29},{season:2000,war:4.9,team:"CHW",age:30},
      {season:2001,war:3.0,team:"CHW",age:31},{season:2002,war:3.3,team:"CHW",age:32},{season:2003,war:4.0,team:"CHW",age:33},
      {season:2004,war:1.8,team:"CHW",age:34},{season:2005,war:-0.2,team:"LAD",age:35},{season:2006,war:3.6,team:"NYM",age:36},
      {season:2007,war:-0.1,team:"NYM",age:37}
    ]
  },
  {
    playerId: 112116, playerName: "Luis Castillo", bbrefId: "castilu01", positionCategory: "2B",
    careerWAR: 29.2, seasons: [
      {season:1996,war:1.2,team:"FLA",age:20},{season:1997,war:-0.8,team:"FLA",age:21},{season:1998,war:-0.1,team:"FLA",age:22},
      {season:1999,war:2.3,team:"FLA",age:23},{season:2000,war:4.5,team:"FLA",age:24},{season:2001,war:1.5,team:"FLA",age:25},
      {season:2002,war:2.0,team:"FLA",age:26},{season:2003,war:4.4,team:"FLA",age:27},{season:2004,war:3.9,team:"FLA",age:28},
      {season:2005,war:3.6,team:"FLA",age:29},{season:2006,war:2.4,team:"MIN",age:30},{season:2007,war:3.0,team:"NYM",age:31},
      {season:2008,war:-0.4,team:"NYM",age:32},{season:2009,war:1.4,team:"NYM",age:33},{season:2010,war:0.3,team:"NYM",age:34}
    ]
  },
  {
    playerId: 114260, playerName: "Cliff Floyd", bbrefId: "floydcl01", positionCategory: "LF",
    careerWAR: 25.9, seasons: [
      {season:1993,war:-0.3,team:"MON",age:20},{season:1994,war:0.2,team:"MON",age:21},{season:1995,war:-1.0,team:"MON",age:22},
      {season:1996,war:0.1,team:"MON",age:23},{season:1997,war:0.7,team:"FLA",age:24},{season:1998,war:2.3,team:"FLA",age:25},
      {season:1999,war:1.4,team:"FLA",age:26},{season:2000,war:2.7,team:"FLA",age:27},{season:2001,war:6.6,team:"FLA",age:28},
      {season:2002,war:4.7,team:"FLA",age:29},{season:2003,war:2.7,team:"NYM",age:30},{season:2004,war:0.7,team:"NYM",age:31},
      {season:2005,war:4.7,team:"NYM",age:32},{season:2006,war:-0.4,team:"NYM",age:33},{season:2007,war:0.1,team:"CHC",age:34},
      {season:2008,war:0.9,team:"TBR",age:35},{season:2009,war:-0.2,team:"SDP",age:36}
    ]
  },
  // ===== OUTFIELDERS =====
  {
    playerId: 120989, playerName: "Tim Salmon", bbrefId: "salmoti01", positionCategory: "RF",
    careerWAR: 40.7, seasons: [
      {season:1992,war:-0.2,team:"CAL",age:23},{season:1993,war:5.3,team:"CAL",age:24},{season:1994,war:2.6,team:"CAL",age:25},
      {season:1995,war:6.6,team:"CAL",age:26},{season:1996,war:2.6,team:"CAL",age:27},{season:1997,war:5.0,team:"ANA",age:28},
      {season:1998,war:3.7,team:"ANA",age:29},{season:1999,war:2.3,team:"ANA",age:30},{season:2000,war:4.4,team:"ANA",age:31},
      {season:2001,war:1.2,team:"ANA",age:32},{season:2002,war:4.0,team:"ANA",age:33},{season:2003,war:2.8,team:"ANA",age:34},
      {season:2004,war:-0.3,team:"ANA",age:35},{season:2006,war:0.7,team:"LAA",age:37}
    ]
  },
  {
    playerId: 113679, playerName: "Jermaine Dye", bbrefId: "dyeje01", positionCategory: "RF",
    careerWAR: 20.4, seasons: [
      {season:1996,war:0.1,team:"ATL",age:22},{season:1997,war:-0.5,team:"KCR",age:23},{season:1998,war:-0.6,team:"KCR",age:24},
      {season:1999,war:4.7,team:"KCR",age:25},{season:2000,war:4.6,team:"KCR",age:26},{season:2001,war:2.6,team:"OAK",age:27},
      {season:2002,war:1.4,team:"OAK",age:28},{season:2003,war:-1.8,team:"OAK",age:29},{season:2004,war:1.4,team:"OAK",age:30},
      {season:2005,war:2.5,team:"CHW",age:31},{season:2006,war:4.6,team:"CHW",age:32},{season:2007,war:-1.6,team:"CHW",age:33},
      {season:2008,war:2.8,team:"CHW",age:34},{season:2009,war:0.2,team:"CHW",age:35}
    ]
  }
];

// Read existing data
const existingData = JSON.parse(fs.readFileSync(WAR_DATA_PATH, 'utf8'));
console.log(`Existing players: ${existingData.length}`);

// Create sets for duplicate checking
const existingIds = new Set(existingData.map(p => p.playerId));
const existingNames = new Set(existingData.map(p => p.playerName.toLowerCase()));

// Add new players
let added = 0;
let skipped = 0;

for (const player of MISSING_PLAYERS) {
  // Check for duplicates
  if (existingIds.has(player.playerId)) {
    console.log(`Skipping ${player.playerName}: playerId ${player.playerId} already exists`);
    // Try with offset
    const newId = player.playerId + 100000;
    if (!existingIds.has(newId)) {
      player.playerId = newId;
      console.log(`  -> Using offset playerId: ${newId}`);
    } else {
      skipped++;
      continue;
    }
  }

  if (existingNames.has(player.playerName.toLowerCase())) {
    console.log(`Skipping ${player.playerName}: name already exists`);
    skipped++;
    continue;
  }

  existingData.push(player);
  existingIds.add(player.playerId);
  existingNames.add(player.playerName.toLowerCase());
  added++;
  console.log(`Added: ${player.playerName} (${player.positionCategory}, ${player.careerWAR} WAR)`);
}

// Write updated data
fs.writeFileSync(WAR_DATA_PATH, JSON.stringify(existingData, null, 2));
console.log(`\nDone! Added ${added} players, skipped ${skipped} duplicates.`);
console.log(`Total players now: ${existingData.length}`);
