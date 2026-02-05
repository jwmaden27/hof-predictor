export interface HOFBallotInfo {
  inductionYear: number
  ballotType: 'BBWAA' | 'Veterans Committee' | 'Era Committee' | 'Special Election'
  ballotNumber: number | null
  ballotLabel: string
  votePercentage: number | null
}

/**
 * Historical Hall of Fame ballot/induction data for all HOF players
 * in the war-data.json dataset. Keyed by MLB playerId.
 *
 * Sources: Baseball Reference, National Baseball Hall of Fame
 */
export const HOF_BALLOT_DATA: Record<number, HOFBallotInfo> = {
  // === Catchers ===
  110849: { // Johnny Bench
    inductionYear: 1989, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 96.4,
  },
  110925: { // Yogi Berra
    inductionYear: 1972, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 85.6,
  },
  111915: { // Roy Campanella
    inductionYear: 1969, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 79.4,
  },
  112061: { // Gary Carter
    inductionYear: 2003, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 78.0,
  },
  114182: { // Carlton Fisk
    inductionYear: 2000, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 79.6,
  },
  120536: { // Mike Piazza
    inductionYear: 2016, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 83.0,
  },
  121358: { // Ivan Rodriguez
    inductionYear: 2017, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 76.0,
  },
  408045: { // Joe Mauer
    inductionYear: 2025, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 76.3,
  },

  // === First Basemen ===
  110432: { // Jeff Bagwell
    inductionYear: 2017, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 86.2,
  },
  123272: { // Jim Thome
    inductionYear: 2018, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 89.8,
  },
  123245: { // Frank Thomas
    inductionYear: 2014, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 83.7,
  },
  119579: { // Eddie Murray
    inductionYear: 2003, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 85.3,
  },
  118605: { // Willie McCovey
    inductionYear: 1986, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 81.4,
  },

  // === Second Basemen ===
  110987: { // Craig Biggio
    inductionYear: 2015, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 82.7,
  },
  110183: { // Roberto Alomar
    inductionYear: 2011, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 90.0,
  },
  121665: { // Ryne Sandberg
    inductionYear: 2005, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 76.2,
  },
  119371: { // Joe Morgan
    inductionYear: 1990, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 81.8,
  },
  111986: { // Rod Carew
    inductionYear: 1991, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 90.5,
  },

  // === Shortstops ===
  121222: { // Cal Ripken Jr.
    inductionYear: 2007, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 98.5,
  },
  116539: { // Derek Jeter
    inductionYear: 2020, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 99.7,
  },
  122439: { // Ozzie Smith
    inductionYear: 2002, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 91.7,
  },
  117501: { // Barry Larkin
    inductionYear: 2012, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 86.4,
  },
  124721: { // Robin Yount
    inductionYear: 1999, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 77.5,
  },
  110533: { // Ernie Banks
    inductionYear: 1977, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 83.8,
  },
  123437: { // Alan Trammell
    inductionYear: 2018, ballotType: 'Era Committee', ballotNumber: null,
    ballotLabel: 'Era Committee', votePercentage: null,
  },

  // === Third Basemen ===
  116706: { // Chipper Jones
    inductionYear: 2018, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 97.2,
  },
  111153: { // Wade Boggs
    inductionYear: 2005, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 91.9,
  },
  111437: { // George Brett
    inductionYear: 1999, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 98.2,
  },
  121836: { // Mike Schmidt
    inductionYear: 1995, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 96.5,
  },
  134181: { // Adrian Beltre
    inductionYear: 2024, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 95.1,
  },
  121409: { // Scott Rolen
    inductionYear: 2023, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 76.3,
  },

  // === Center Fielders ===
  115135: { // Ken Griffey Jr.
    inductionYear: 2016, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 99.3,
  },
  118495: { // Willie Mays
    inductionYear: 1979, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 94.7,
  },
  118258: { // Mickey Mantle
    inductionYear: 1974, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 88.2,
  },
  113376: { // Joe DiMaggio
    inductionYear: 1955, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 88.8,
  },

  // === Right Fielders ===
  110001: { // Hank Aaron
    inductionYear: 1982, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 97.8,
  },
  121578: { // Babe Ruth
    inductionYear: 1936, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot (Inaugural)', votePercentage: 95.1,
  },
  112391: { // Roberto Clemente
    inductionYear: 1973, ballotType: 'Special Election', ballotNumber: null,
    ballotLabel: 'Special Election', votePercentage: 92.7,
  },
  121311: { // Frank Robinson
    inductionYear: 1982, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 89.2,
  },
  115270: { // Tony Gwynn
    inductionYear: 2007, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 97.6,
  },
  115223: { // Vladimir Guerrero
    inductionYear: 2018, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 92.9,
  },
  400085: { // Ichiro Suzuki
    inductionYear: 2025, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 99.7,
  },
  123833: { // Larry Walker
    inductionYear: 2020, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 76.6,
  },

  // === Left Fielders ===
  124341: { // Ted Williams
    inductionYear: 1966, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 93.4,
  },
  115749: { // Rickey Henderson
    inductionYear: 2009, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 94.8,
  },
  124650: { // Carl Yastrzemski
    inductionYear: 1989, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 94.6,
  },
  124448: { // Dave Winfield
    inductionYear: 2001, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 84.5,
  },

  // === Starting Pitchers ===
  118120: { // Greg Maddux
    inductionYear: 2014, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 97.2,
  },
  121961: { // Tom Seaver
    inductionYear: 1992, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 98.8,
  },
  114756: { // Bob Gibson
    inductionYear: 1981, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 84.0,
  },
  117277: { // Sandy Koufax
    inductionYear: 1972, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 86.9,
  },
  118377: { // Pedro Martinez
    inductionYear: 2015, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 91.1,
  },
  116615: { // Randy Johnson
    inductionYear: 2015, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 97.3,
  },
  121597: { // Nolan Ryan
    inductionYear: 1999, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 98.8,
  },
  112008: { // Steve Carlton
    inductionYear: 1994, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 95.8,
  },
  122477: { // John Smoltz
    inductionYear: 2015, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 82.9,
  },
  136880: { // Roy Halladay
    inductionYear: 2019, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 85.4,
  },
  119608: { // Mike Mussina
    inductionYear: 2019, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 76.7,
  },
  114849: { // Tom Glavine
    inductionYear: 2014, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 91.9,
  },

  // === Relief Pitchers ===
  121250: { // Mariano Rivera
    inductionYear: 2019, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 100.0,
  },
  116034: { // Trevor Hoffman
    inductionYear: 2018, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 79.9,
  },
  113726: { // Dennis Eckersley
    inductionYear: 2004, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 83.2,
  },
}
