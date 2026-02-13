export interface HOFBallotInfo {
  inductionYear: number | null  // null for players who fell off ballot without induction
  ballotType: 'BBWAA' | 'Veterans Committee' | 'Era Committee' | 'Special Election' | null
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
  122111: { // Gary Sheffield - RF (fell off ballot 2024)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 63.9,
  },

  // === 1990s Ballot Candidates (not inducted via BBWAA) ===
  114641: { // Steve Garvey - 1B (fell off ballot 2000, inducted via Era Committee 2025)
    inductionYear: 2025, ballotType: 'Era Committee', ballotNumber: null,
    ballotLabel: 'Era Committee', votePercentage: null,
  },
  119545: { // Dale Murphy - CF (fell off ballot 2000)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2000)', votePercentage: 23.2,
  },
  116550: { // Tommy John - SP (fell off ballot 2009)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 31.7,
  },
  112549: { // Dave Concepcion - SS (fell off ballot 2008)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 12.7,
  },
  115826: { // Keith Hernandez - 1B (fell off ballot 2004)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2004)', votePercentage: 10.8,
  },
  119531: { // Thurman Munson - C (fell off ballot 1991)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'Fell Off Ballot (1991)', votePercentage: 15.5,
  },
  111189: { // Bobby Bonds - RF (fell off ballot 1999)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (1999)', votePercentage: 5.7,
  },
  123331: { // Luis Tiant - SP (fell off ballot 2002)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2002)', votePercentage: 29.5,
  },
  117875: { // Mickey Lolich - SP (fell off ballot 2000)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 15,
    ballotLabel: 'Fell Off Ballot (2000)', votePercentage: 9.0,
  },
  119720: { // Graig Nettles - 3B (fell off ballot 1997)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: 'Fell Off Ballot (1997)', votePercentage: 7.4,
  },
  113936: { // Dwight Evans - RF (fell off ballot 1999)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: 'Fell Off Ballot (1999)', votePercentage: 10.4,
  },
  114333: { // George Foster - LF (fell off ballot 1996)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: 'Fell Off Ballot (1996)', votePercentage: 6.1,
  },
  115228: { // Ron Guidry - SP (fell off ballot 2000)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 8,
    ballotLabel: 'Fell Off Ballot (2000)', votePercentage: 6.6,
  },
  111119: { // Vida Blue - SP (fell off ballot 1996)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: 'Fell Off Ballot (1996)', votePercentage: 7.5,
  },
  122699: { // Rusty Staub - RF (fell off ballot 1997)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: 'Fell Off Ballot (1997)', votePercentage: 5.9,
  },

  // === 1990–2009 era players with 10+ WAR (Group 1: highest WAR) ===

  121347: { // Alex Rodriguez - SS - WAR: 113.6 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: 'On Ballot (2026)', votePercentage: 40.0,
  },
  120903: { // Manny Ramirez - LF - WAR: 69.4 (10th/final year on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 10,
    ballotLabel: 'On Ballot (2026)', votePercentage: 38.8,
  },
  111554: { // Kevin Brown - SP - WAR: 68.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 2.1,
  },
  112552: { // David Cone - SP - WAR: 62.1
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 3.9,
  },
  400284: { // Chase Utley - 2B - WAR: 61.6 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: 'On Ballot (2026)', votePercentage: 59.1,
  },
  120485: { // Andy Pettitte - SP - WAR: 60.7 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 8,
    ballotLabel: 'On Ballot (2026)', votePercentage: 48.5,
  },
  114087: { // Jim Edmonds - CF - WAR: 60.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 2.5,
  },
  110029: { // Bobby Abreu - RF - WAR: 60.2 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 7,
    ballotLabel: 'On Ballot (2026)', votePercentage: 30.8,
  },
  121604: { // Bret Saberhagen - SP - WAR: 58.9
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 1.3,
  },
  114133: { // Chuck Finley - SP - WAR: 57.8
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.2,
  },
  116566: { // Will Clark - 1B - WAR: 56.5
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2006)', votePercentage: 4.4,
  },
  113853: { // Johnny Damon - LF - WAR: 56.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2018)', votePercentage: 1.9,
  },
  116999: { // Jeff Kent - 2B - WAR: 56.0 (inducted 2026 Veterans Committee)
    inductionYear: 2026, ballotType: 'Veterans Committee', ballotNumber: 10,
    ballotLabel: 'Veterans Committee (2026)', votePercentage: 46.5,
  },
  115861: { // Orel Hershiser - SP - WAR: 56.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 4.4,
  },
  117585: { // Kenny Lofton - CF - WAR: 55.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 3.2,
  },
  120871: { // Rafael Palmeiro - 1B - WAR: 55.2
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 4,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 4.4,
  },
  431145: { // Russell Martin - C - WAR: 54.6
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 2.3,
  },
  110681: { // Kevin Appier - SP - WAR: 54.5
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2010)', votePercentage: 0.2,
  },
  433587: { // Felix Hernandez - SP - WAR: 54.2 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'On Ballot (2026)', votePercentage: 46.1,
  },
  124071: { // David Wells - SP - WAR: 53.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.9,
  },
  400061: { // Roy Oswalt - SP - WAR: 52.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 0.9,
  },
  279824: { // Mark Buehrle - SP - WAR: 52.2 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: 'On Ballot (2026)', votePercentage: 20.0,
  },
  435263: { // Brian McCann - C - WAR: 52.1
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 1.8,
  },
  110710: { // Lance Berkman - 1B - WAR: 52.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 1.2,
  },
  114935: { // Luis Gonzalez - LF - WAR: 51.8
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 0.9,
  },
  119361: { // John Olerud - 1B - WAR: 51.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.7,
  },
  431151: { // David Wright - 3B - WAR: 51.3 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 3,
    ballotLabel: 'On Ballot (2026)', votePercentage: 14.8,
  },
  114789: { // Brian Giles - RF - WAR: 51.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.0,
  },
  112526: { // Bartolo Colon - SP - WAR: 51.1
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 1.3,
  },
  114793: { // Jason Giambi - 1B - WAR: 50.5
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2020)', votePercentage: 1.5,
  },
  112560: { // Ellis Burks - RF - WAR: 49.8
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2010)', votePercentage: 0.4,
  },
  276519: { // Jimmy Rollins - SS - WAR: 49.7 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: 'On Ballot (2026)', votePercentage: 25.4,
  },
  123497: { // Bernie Williams - CF - WAR: 49.6
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 3.3,
  },
  119469: { // Jamie Moyer - SP - WAR: 49.6
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2018)', votePercentage: 2.4,
  },
  407812: { // Matt Holliday - LF - WAR: 49.5
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 1.0,
  },
  218596: { // Tim Hudson - SP - WAR: 49.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 3.0,
  },
  118371: { // Dennis Martinez - SP - WAR: 48.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2004)', votePercentage: 3.2,
  },
  424324: { // Cliff Lee - SP - WAR: 48.2
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2020)', votePercentage: 0.5,
  },
  114085: { // Steve Finley - CF - WAR: 48.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.7,
  },
  435079: { // Ian Kinsler - 2B - WAR: 47.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 2.5,
  },
  123173: { // Miguel Tejada - SS - WAR: 47.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 1.2,
  },
  434158: { // Curtis Granderson - CF - WAR: 47.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 0.8,
  },
  112507: { // Mike Cameron - CF - WAR: 46.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  116610: { // Mark Grace - 1B - WAR: 46.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 4.1,
  },
  134320: { // Javier Vazquez - SP - WAR: 45.6 (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  123744: { // Omar Vizquel - SS - WAR: 45.5 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 9,
    ballotLabel: 'On Ballot (2026)', votePercentage: 18.4,
  },
  120878: { // Brad Radke - SP - WAR: 45.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 0.3,
  },
  407893: { // Mark Teixeira - 1B - WAR: 45.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 1.5,
  },
  114031: { // J.D. Drew - RF - WAR: 44.9
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  456030: { // Dustin Pedroia - 2B - WAR: 44.5 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'On Ballot (2026)', votePercentage: 20.7,
  },
  113232: { // Carlos Delgado - 1B - WAR: 44.4
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 3.8,
  },
  216539: { // Nomar Garciaparra - SS - WAR: 44.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 1.8,
  },
  408314: { // Jose Reyes - SS - WAR: 44.0
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 0.0,
  },
  408241: { // Jake Peavy - SP - WAR: 43.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 0.0,
  },
  407793: { // John Lackey - SP - WAR: 43.3
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2023)', votePercentage: 0.3,
  },
  116338: { // Torii Hunter - CF - WAR: 42.8 (currently on ballot)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 6,
    ballotLabel: 'On Ballot (2026)', votePercentage: 8.7,
  },
  450314: { // Ben Zobrist - 2B - WAR: 42.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 0.0,
  },
  120691: { // Jorge Posada - C - WAR: 42.7
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 3.8,
  },

  // === 1990–2009 era players with 10+ WAR (Group 2: 30-42 WAR range) ===

  150359: { // A.J. Burnett - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2021)', votePercentage: 0.0,
  },
  112466: { // Jose Canseco - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 1.1,
  },
  113686: { // Lenny Dykstra - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2002)', votePercentage: 0.2,
  },
  122864: { // Darryl Strawberry - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2005)', votePercentage: 1.2,
  },
  216156: { // Gary Gaetti - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2006)', votePercentage: 0.8,
  },
  434670: { // Hanley Ramirez - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 0.0,
  },
  135784: { // Placido Polanco - 2B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 0.5,
  },
  116974: { // Jason Kendall - C
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 0.5,
  },
  123357: { // Devon White - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.0,
  },
  408307: { // Carl Crawford - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 0.0,
  },
  117569: { // Kenny Rogers - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 0.2,
  },
  120225: { // Dave Parker - RF (inducted 2025 via Classic Baseball Era Committee)
    inductionYear: 2025, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2025)', votePercentage: 15.3,
  },
  122690: { // Robin Ventura - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2010)', votePercentage: 1.3,
  },
  120989: { // Tim Salmon - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 0.9,
  },
  429717: { // Dan Haren - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2021)', votePercentage: 0.0,
  },
  117652: { // Al Leiter - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.7,
  },
  110810: { // Albert Belle - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 3.5,
  },
  210690: { // Moises Alou - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 1.1,
  },
  150093: { // Alfonso Soriano - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2020)', votePercentage: 1.5,
  },
  114932: { // Juan Gonzalez - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 4.0,
  },
  110456: { // Harold Baines - DH (inducted 2019 via Today's Game Era Committee)
    inductionYear: 2019, ballotType: 'Era Committee', ballotNumber: 5,
    ballotLabel: 'Era Committee (2019)', votePercentage: 4.8,
  },
  133380: { // Aramis Ramirez - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2021)', votePercentage: 1.0,
  },
  113012: { // Eric Chavez - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2020)', votePercentage: 1.5,
  },
  117484: { // Ray Lankford - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2010)', votePercentage: 0.0,
  },
  116787: { // David Justice - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.2,
  },
  136267: { // Troy Glaus - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 0.0,
  },
  453064: { // Troy Tulowitzki - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2025)', votePercentage: 1.0,
  },
  110502: { // Jay Bell - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 0.4,
  },
  408236: { // Adrian Gonzalez - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 0.8,
  },
  116483: { // Marquis Grissom - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.7,
  },
  150029: { // Jayson Werth - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2023)', votePercentage: 0.0,
  },
  113858: { // Eric Davis - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.6,
  },
  430832: { // Jose Bautista - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2024)', votePercentage: 1.6,
  },
  117197: { // Chuck Knoblauch - 2B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.2,
  },
  110674: { // Brady Anderson - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.0,
  },
  115094: { // Shawn Green - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.4,
  },
  117601: { // Derrek Lee - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  113068: { // Jeff Cirillo - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  117955: { // Derek Lowe - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 0.0,
  },
  120587: { // Paul O'Neill - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 2.2,
  },
  116533: { // Ron Gant - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 0.0,
  },
  112473: { // Ken Caminiti - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.4,
  },
  119370: { // Magglio Ordonez - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.7,
  },
  122426: { // Lee Smith - RP (inducted 2019 via Today's Game Era Committee)
    inductionYear: 2019, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2019)', votePercentage: 34.2,
  },
  122775: { // Dave Stewart - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: 'Fell Off Ballot (2002)', votePercentage: 4.9,
  },
  123787: { // John Wetteland - RP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2006)', votePercentage: 0.8,
  },
  119718: { // Robb Nen - RP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.4,
  },
  114374: { // John Franco - RP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 4.6,
  },
  114342: { // Keith Foulke - RP (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  119399: { // Jack Morris - SP (inducted 2018 via Era Committee)
    inductionYear: 2018, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2018)', votePercentage: 67.7,
  },

  // === 1970s–1990s era HOF inductees missing from above sections ===

  123006: { // Don Sutton - SP (inducted 1998, 5th ballot)
    inductionYear: 1998, ballotType: 'BBWAA', ballotNumber: 5,
    ballotLabel: '5th Ballot', votePercentage: 81.6,
  },
  116439: { // Reggie Jackson - RF (inducted 1993, 1st ballot)
    inductionYear: 1993, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: '1st Ballot', votePercentage: 93.6,
  },
  121697: { // Ron Santo - 3B (inducted 2012 via Golden Era Committee)
    inductionYear: 2012, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2012)', votePercentage: 43.1,
  },
  116803: { // Jim Kaat - SP (inducted 2022 via Golden Days Era Committee)
    inductionYear: 2022, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2022)', votePercentage: null,
  },
  111691: { // Jim Bunning - SP (inducted 1996 via Veterans Committee)
    inductionYear: 1996, ballotType: 'Veterans Committee', ballotNumber: 15,
    ballotLabel: 'Veterans Committee (1996)', votePercentage: 74.2,
  },
  110157: { // Dick Allen - 1B (inducted 2025 via Classic Baseball Era Committee)
    inductionYear: 2025, ballotType: 'Era Committee', ballotNumber: 14,
    ballotLabel: 'Era Committee (2025)', votePercentage: null,
  },
  119176: { // Minnie Minoso - LF (inducted 2022 via Golden Days Era Committee)
    inductionYear: 2022, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2022)', votePercentage: null,
  },
  122247: { // Ted Simmons - C (inducted 2020 via Modern Baseball Era Committee)
    inductionYear: 2020, ballotType: 'Era Committee', ballotNumber: 1,
    ballotLabel: 'Era Committee (2020)', votePercentage: null,
  },
  112157: { // Orlando Cepeda - 1B (inducted 1999 via Veterans Committee)
    inductionYear: 1999, ballotType: 'Veterans Committee', ballotNumber: 15,
    ballotLabel: 'Veterans Committee (1999)', votePercentage: 73.5,
  },
  119980: { // Tony Oliva - RF (inducted 2022 via Golden Days Era Committee)
    inductionYear: 2022, ballotType: 'Era Committee', ballotNumber: 15,
    ballotLabel: 'Era Committee (2022)', votePercentage: 47.3,
  },
  118497: { // Bill Mazeroski - 2B (inducted 2001 via Veterans Committee)
    inductionYear: 2001, ballotType: 'Veterans Committee', ballotNumber: 15,
    ballotLabel: 'Veterans Committee (2001)', votePercentage: 42.3,
  },
  114129: { // Rollie Fingers - RP (inducted 1992, 2nd ballot)
    inductionYear: 1992, ballotType: 'BBWAA', ballotNumber: 2,
    ballotLabel: '2nd Ballot', votePercentage: 81.2,
  },

  // === 1970s–1990s era non-HOF players ===

  113889: { // Darin Erstad - CF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.2,
  },
  123610: { // Jose Valentin - SS (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  113984: { // Ray Durham - 2B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 0.0,
  },
  111072: { // Bobby Bonilla - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.4,
  },
  124315: { // Woody Williams - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  115817: { // Livan Hernandez - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2018)', votePercentage: 0.2,
  },
  117919: { // Javy Lopez - C
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 0.2,
  },
  110690: { // Edgardo Alfonzo - 3B (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  121673: { // Reggie Sanders - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  133225: { // Ryan Dempster - SP (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  150404: { // Ted Lilly - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2019)', votePercentage: 0.0,
  },
  111059: { // Mike Bordick - SS (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  123678: { // Mo Vaughn - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 1.1,
  },
  122259: { // B.J. Surhoff - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.3,
  },
  123275: { // Greg Vaughn - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2009)', votePercentage: 0.0,
  },
  114260: { // Cliff Floyd - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.0,
  },
  110668: { // Garret Anderson - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 0.2,
  },
  211560: { // Casey Blake - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  117244: { // Paul Konerko - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2020)', votePercentage: 2.5,
  },
  223272: { // Jason Varitek - C
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.5,
  },
  112234: { // Jay Buhner - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.2,
  },
  110990: { // Bret Boone - 2B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.2,
  },
  114880: { // Craig Counsell - SS (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  150229: { // A.J. Pierzynski - C
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2022)', votePercentage: 0.5,
  },
  111451: { // Orlando Cabrera - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  119827: { // Hideo Nomo - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 1.1,
  },
  114098: { // Carl Everett - CF (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  113679: { // Jermaine Dye - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.0,
  },
  117046: { // Darryl Kile - SP (died 2002)
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2003)', votePercentage: 1.4,
  },
  150040: { // José Molina - C (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  112563: { // Jeromy Burnitz - RF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 0.0,
  },
  112001: { // Carlos Baerga - 2B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2011)', votePercentage: 0.0,
  },
  113118: { // Royce Clayton - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  113135: { // Jeff Conine - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  112542: { // Vinny Castilla - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2012)', votePercentage: 1.0,
  },
  114106: { // Cecil Fielder - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2004)', votePercentage: 0.2,
  },
  120401: { // Troy Percival - RP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.7,
  },
  112797: { // Sean Casey - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2014)', votePercentage: 0.0,
  },
  110735: { // Brad Ausmus - C
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 0.0,
  },
  116627: { // Mike Hampton - SP
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2016)', votePercentage: 0.0,
  },
  111518: { // Scott Brosius - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2007)', votePercentage: 0.0,
  },
  110869: { // Aaron Boone - 3B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2015)', votePercentage: 0.4,
  },
  120194: { // Dean Palmer - 3B (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  110475: { // Tony Batista - 3B (never placed on ballot)
    inductionYear: null, ballotType: null, ballotNumber: null,
    ballotLabel: 'Not on Ballot', votePercentage: null,
  },
  120985: { // Matt Stairs - LF
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2017)', votePercentage: 0.0,
  },
  117134: { // Ryan Klesko - 1B
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2013)', votePercentage: 0.0,
  },
  114069: { // Shawon Dunston - SS
    inductionYear: null, ballotType: 'BBWAA', ballotNumber: 1,
    ballotLabel: 'Fell Off Ballot (2008)', votePercentage: 0.2,
  },
}
