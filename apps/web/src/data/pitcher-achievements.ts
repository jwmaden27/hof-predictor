export interface PitcherAchievements {
  noHitters: number
  perfectGames: number
}

/**
 * Pitcher no-hitter and perfect game data for players in the dataset.
 * Keyed by MLB playerId.
 *
 * Sources: Baseball Reference, MLB.com, Baseball Almanac
 */
export const PITCHER_ACHIEVEMENTS: Record<number, PitcherAchievements> = {
  // === Multiple No-Hitter Pitchers ===

  121597: { // Nolan Ryan — 7 no-hitters (1973, 1973, 1974, 1975, 1981, 1990, 1991)
    noHitters: 7, perfectGames: 0,
  },
  117277: { // Sandy Koufax — 4 no-hitters incl. perfect game (1962, 1963, 1964, 1965)
    noHitters: 4, perfectGames: 1,
  },
  124692: { // Cy Young — 3 no-hitters incl. perfect game (1897, 1904, 1908)
    noHitters: 3, perfectGames: 1,
  },
  114055: { // Bob Feller — 3 no-hitters (1940, 1946, 1951)
    noHitters: 3, perfectGames: 0,
  },
  434378: { // Justin Verlander — 3 no-hitters (2007, 2011, 2019)
    noHitters: 3, perfectGames: 0,
  },
  116615: { // Randy Johnson — 2 no-hitters incl. perfect game (1990, 2004)
    noHitters: 2, perfectGames: 1,
  },
  111691: { // Jim Bunning — 2 no-hitters incl. perfect game (1958, 1964)
    noHitters: 2, perfectGames: 1,
  },
  453286: { // Max Scherzer — 2 no-hitters (2015, 2015)
    noHitters: 2, perfectGames: 0,
  },
  136880: { // Roy Halladay — 2 no-hitters incl. perfect game (2010 regular season, 2010 NLDS)
    noHitters: 2, perfectGames: 1,
  },
  122557: { // Warren Spahn — 2 no-hitters (1960, 1961)
    noHitters: 2, perfectGames: 0,
  },
  118422: { // Christy Mathewson — 2 no-hitters (1901, 1905)
    noHitters: 2, perfectGames: 0,
  },
  116772: { // Addie Joss — 2 no-hitters incl. perfect game (1908, 1910)
    noHitters: 2, perfectGames: 1,
  },
  279824: { // Mark Buehrle — 2 no-hitters incl. perfect game (2007, 2009)
    noHitters: 2, perfectGames: 1,
  },
  119827: { // Hideo Nomo — 2 no-hitters (1996, 2001)
    noHitters: 2, perfectGames: 0,
  },
  453562: { // Jake Arrieta — 2 no-hitters (2015, 2016)
    noHitters: 2, perfectGames: 0,
  },
  453311: { // Tim Lincecum — 2 no-hitters (2013, 2014)
    noHitters: 2, perfectGames: 0,
  },
  456701: { // Homer Bailey — 2 no-hitters (2012, 2013)
    noHitters: 2, perfectGames: 0,
  },

  // === Single No-Hitter / Perfect Game HOF Pitchers ===

  116635: { // Walter Johnson — 1 no-hitter (1920)
    noHitters: 1, perfectGames: 0,
  },
  121961: { // Tom Seaver — 1 no-hitter (1978)
    noHitters: 1, perfectGames: 0,
  },
  114756: { // Bob Gibson — 1 no-hitter (1971)
    noHitters: 1, perfectGames: 0,
  },
  120438: { // Gaylord Perry — 1 no-hitter (1968)
    noHitters: 1, perfectGames: 0,
  },
  120196: { // Jim Palmer — 1 no-hitter (1969)
    noHitters: 1, perfectGames: 0,
  },
  111126: { // Bert Blyleven — 1 no-hitter (1977)
    noHitters: 1, perfectGames: 0,
  },
  119786: { // Phil Niekro — 1 no-hitter (1973)
    noHitters: 1, perfectGames: 0,
  },
  118283: { // Juan Marichal — 1 no-hitter (1963)
    noHitters: 1, perfectGames: 0,
  },
  118055: { // Ted Lyons — 1 no-hitter (1926)
    noHitters: 1, perfectGames: 0,
  },
  123630: { // Dazzy Vance — 1 no-hitter (1925)
    noHitters: 1, perfectGames: 0,
  },
  113726: { // Dennis Eckersley — 1 no-hitter (1977)
    noHitters: 1, perfectGames: 0,
  },
  116249: { // Carl Hubbell — 1 no-hitter (1929)
    noHitters: 1, perfectGames: 0,
  },
  117671: { // Bob Lemon — 1 no-hitter (1948)
    noHitters: 1, perfectGames: 0,
  },
  119399: { // Jack Morris — 1 no-hitter (1984)
    noHitters: 1, perfectGames: 0,
  },
  123878: { // Ed Walsh — 1 no-hitter (1911)
    noHitters: 1, perfectGames: 0,
  },
  116334: { // Catfish Hunter — 1 perfect game (1968)
    noHitters: 1, perfectGames: 1,
  },
  124261: { // Hoyt Wilhelm — 1 no-hitter (1958)
    noHitters: 1, perfectGames: 0,
  },
  118295: { // Rube Marquard — 1 no-hitter (1915)
    noHitters: 1, perfectGames: 0,
  },
  115314: { // Jesse Haines — 1 no-hitter (1924)
    noHitters: 1, perfectGames: 0,
  },
  121559: { // Amos Rusie — 1 no-hitter (1891)
    noHitters: 1, perfectGames: 0,
  },
  110850: { // Chief Bender — 1 no-hitter (1910)
    noHitters: 1, perfectGames: 0,
  },

  // === Non-HOF Pitchers with Perfect Games or Notable No-Hitters ===

  124071: { // David Wells — 1 perfect game (1998)
    noHitters: 1, perfectGames: 1,
  },
  112552: { // David Cone — 1 perfect game (1999)
    noHitters: 1, perfectGames: 1,
  },
  433587: { // Felix Hernandez — 1 perfect game (2012)
    noHitters: 1, perfectGames: 1,
  },
  118371: { // Dennis Martinez — 1 perfect game (1991)
    noHitters: 1, perfectGames: 1,
  },
  117569: { // Kenny Rogers — 1 perfect game (1994)
    noHitters: 1, perfectGames: 1,
  },
  430912: { // Matt Cain — 1 perfect game (2012)
    noHitters: 1, perfectGames: 1,
  },
  477132: { // Clayton Kershaw — 1 no-hitter (2014)
    noHitters: 1, perfectGames: 0,
  },
  430935: { // Cole Hamels — 1 no-hitter (2015)
    noHitters: 1, perfectGames: 0,
  },
}
