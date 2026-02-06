export interface HOFBallotInfo {
  inductionYear: number | null  // null for players who fell off ballot without induction
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
  113340: { // Bill Dickey
    inductionYear: 1954, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 80.2,
  },
  115572: { // Gabby Hartnett
    inductionYear: 1955, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 77.7,
  },
  112437: { // Mickey Cochrane
    inductionYear: 1947, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 79.5,
  },

  // === First Basemen ===
  110432: { // Jeff Bagwell
    inductionYear: 2017, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 86.2,
  },
  114367: { // Jimmie Foxx
    inductionYear: 1951, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 79.2,
  },
  123203: { // Bill Terry
    inductionYear: 1954, ballotType: 'BBWAA', ballotNumber: 8,
    ballotLabel: '8th Ballot', votePercentage: 77.4,
  },
  115096: { // Hank Greenberg
    inductionYear: 1956, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 85.0,
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
  122280: { // George Sisler
    inductionYear: 1939, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 85.8,
  },
  117051: { // Harmon Killebrew
    inductionYear: 1984, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 83.1,
  },
  120404: { // Tony Perez
    inductionYear: 2000, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 77.2,
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
  116156: { // Rogers Hornsby
    inductionYear: 1942, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 78.1,
  },
  114448: { // Frankie Frisch
    inductionYear: 1947, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 84.5,
  },
  114682: { // Charlie Gehringer
    inductionYear: 1949, ballotType: 'BBWAA', ballotNumber: 8,
    ballotLabel: '8th Ballot', votePercentage: 85.0,
  },
  117414: { // Nap Lajoie
    inductionYear: 1937, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 83.6,
  },
  112506: { // Eddie Collins Sr.
    inductionYear: 1939, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 77.7,
  },
  121314: { // Jackie Robinson
    inductionYear: 1962, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 77.5,
  },

  // === Shortstops ===
  121222: { // Cal Ripken Jr.
    inductionYear: 2007, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 98.5,
  },
  112854: { // Joe Cronin
    inductionYear: 1956, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 78.8,
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
  123784: { // Honus Wagner
    inductionYear: 1936, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot (Inaugural)', votePercentage: 95.1,
  },
  110297: { // Luke Appling
    inductionYear: 1964, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 94.0,
  },
  111272: { // Lou Boudreau
    inductionYear: 1970, ballotType: 'BBWAA', ballotNumber: 12,
    ballotLabel: '12th Ballot', votePercentage: 77.3,
  },
  110290: { // Luis Aparicio
    inductionYear: 1984, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 84.6,
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
  123446: { // Pie Traynor
    inductionYear: 1948, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 76.9,
  },
  118416: { // Eddie Mathews
    inductionYear: 1978, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 79.4,
  },
  121301: { // Brooks Robinson
    inductionYear: 1983, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 92.0,
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
  112431: { // Ty Cobb
    inductionYear: 1936, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot (Inaugural)', votePercentage: 98.2,
  },
  122566: { // Tris Speaker
    inductionYear: 1937, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 82.1,
  },
  122488: { // Duke Snider
    inductionYear: 1980, ballotType: 'BBWAA', ballotNumber: 11,
    ballotLabel: '11th Ballot', votePercentage: 86.5,
  },
  120790: { // Kirby Puckett
    inductionYear: 2001, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 82.1,
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
  119602: { // Stan Musial
    inductionYear: 1969, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 93.2,
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
  120117: { // Mel Ott
    inductionYear: 1951, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 87.2,
  },
  123905: { // Paul Waner
    inductionYear: 1952, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 83.3,
  },
  115705: { // Harry Heilmann
    inductionYear: 1952, ballotType: 'BBWAA', ballotNumber: 14,
    ballotLabel: '14th Ballot', votePercentage: 86.8,
  },
  112806: { // Sam Crawford
    inductionYear: 1957, ballotType: 'Veterans Committee', ballotNumber: null,
    ballotLabel: 'Veterans Committee', votePercentage: null,
  },
  116891: { // Willie Keeler
    inductionYear: 1939, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 75.6,
  },
  116822: { // Al Kaline
    inductionYear: 1980, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 88.3,
  },
  124290: { // Billy Williams
    inductionYear: 1987, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 85.7,
  },
  113151: { // Andre Dawson
    inductionYear: 2010, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 77.9,
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
  122240: { // Al Simmons
    inductionYear: 1953, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: '7th Ballot', votePercentage: 75.4,
  },
  124134: { // Zack Wheat
    inductionYear: 1959, ballotType: 'Veterans Committee', ballotNumber: null,
    ballotLabel: 'Veterans Committee', votePercentage: null,
  },
  118904: { // Joe Medwick
    inductionYear: 1968, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 84.8,
  },
  117072: { // Ralph Kiner
    inductionYear: 1975, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: '15th Ballot', votePercentage: 75.4,
  },
  111495: { // Lou Brock
    inductionYear: 1985, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 79.7,
  },
  122685: { // Willie Stargell
    inductionYear: 1988, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 82.4,
  },
  121140: { // Jim Rice
    inductionYear: 2009, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: '15th Ballot', votePercentage: 76.4,
  },
  120891: { // Tim Raines Sr.
    inductionYear: 2017, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 86.0,
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
  113168: { // Dizzy Dean
    inductionYear: 1953, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 79.2,
  },
  118055: { // Ted Lyons
    inductionYear: 1955, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 86.5,
  },
  123630: { // Dazzy Vance
    inductionYear: 1955, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 81.7,
  },
  115201: { // Lefty Grove
    inductionYear: 1947, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 76.4,
  },
  116249: { // Carl Hubbell
    inductionYear: 1947, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 87.0,
  },
  120386: { // Herb Pennock
    inductionYear: 1948, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 77.7,
  },
  116635: { // Walter Johnson
    inductionYear: 1936, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot (Inaugural)', votePercentage: 83.6,
  },
  118422: { // Christy Mathewson
    inductionYear: 1936, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot (Inaugural)', votePercentage: 90.7,
  },
  124692: { // Cy Young
    inductionYear: 1937, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 76.1,
  },
  110127: { // Grover Alexander
    inductionYear: 1938, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 80.9,
  },
  114055: { // Bob Feller
    inductionYear: 1962, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 93.8,
  },
  121547: { // Red Ruffing
    inductionYear: 1967, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: '15th Ballot (Runoff)', votePercentage: 86.9,
  },
  124633: { // Early Wynn
    inductionYear: 1972, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 76.0,
  },
  122557: { // Warren Spahn
    inductionYear: 1973, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 82.9,
  },
  114299: { // Whitey Ford
    inductionYear: 1974, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 77.8,
  },
  117671: { // Bob Lemon
    inductionYear: 1976, ballotType: 'BBWAA', ballotNumber: 14,
    ballotLabel: '14th Ballot', votePercentage: 78.6,
  },
  121283: { // Robin Roberts
    inductionYear: 1976, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 86.9,
  },
  118283: { // Juan Marichal
    inductionYear: 1983, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 83.7,
  },
  113581: { // Don Drysdale
    inductionYear: 1984, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 78.4,
  },
  116334: { // Catfish Hunter
    inductionYear: 1987, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 76.3,
  },
  120196: { // Jim Palmer
    inductionYear: 1990, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 92.6,
  },
  120438: { // Gaylord Perry
    inductionYear: 1991, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 77.2,
  },
  116522: { // Fergie Jenkins
    inductionYear: 1991, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: '3rd Ballot', votePercentage: 75.4,
  },
  119786: { // Phil Niekro
    inductionYear: 1997, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 80.3,
  },
  111126: { // Bert Blyleven
    inductionYear: 2011, ballotType: 'BBWAA', ballotNumber: 14,
    ballotLabel: '14th Ballot', votePercentage: 79.7,
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
  124261: { // Hoyt Wilhelm
    inductionYear: 1985, ballotType: 'BBWAA', ballotNumber: 8,
    ballotLabel: '8th Ballot', votePercentage: 83.8,
  },
  123004: { // Bruce Sutter
    inductionYear: 2006, ballotType: 'BBWAA', ballotNumber: 13,
    ballotLabel: '13th Ballot', votePercentage: 76.9,
  },
  114989: { // Goose Gossage
    inductionYear: 2008, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 85.8,
  },

  // === Designated Hitters ===
  119236: { // Paul Molitor
    inductionYear: 2004, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 85.2,
  },
  118365: { // Edgar Martinez
    inductionYear: 2019, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 85.4,
  },
  120074: { // David Ortiz
    inductionYear: 2022, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 77.9,
  },

  // === 2020s Inductees (missing from above sections) ===
  115732: { // Todd Helton - 1B
    inductionYear: 2024, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: '6th Ballot', votePercentage: 79.7,
  },
  118730: { // Fred McGriff - 1B
    inductionYear: 2023, ballotType: 'Era Committee', ballotNumber: null,
    ballotLabel: 'Era Committee (Unanimous)', votePercentage: 100.0,
  },
  282332: { // CC Sabathia - SP
    inductionYear: 2025, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 86.8,
  },
  123790: { // Billy Wagner - RP
    inductionYear: 2025, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: '10th Ballot', votePercentage: 82.5,
  },
  136860: { // Carlos Beltrán - CF
    inductionYear: 2026, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: '4th Ballot', votePercentage: 84.2,
  },
  116662: { // Andruw Jones - CF
    inductionYear: 2026, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: '9th Ballot', votePercentage: 78.4,
  },

  // === Notable Ballot Candidates (5%+ votes, not inducted via BBWAA) ===
  111188: { // Barry Bonds - LF (fell off ballot 2022)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 66.0,
  },
  112388: { // Roger Clemens - SP (fell off ballot 2022)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 65.2,
  },
  121811: { // Curt Schilling - SP (fell off ballot 2022)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 58.6,
  },
  122544: { // Sammy Sosa - RF (fell off ballot 2022)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 18.5,
  },
  118743: { // Mark McGwire - 1B (fell off ballot 2016)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 12.3,
  },
  221697: { // Gary Sheffield - RF (fell off ballot 2024)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 63.9,
  },
}
