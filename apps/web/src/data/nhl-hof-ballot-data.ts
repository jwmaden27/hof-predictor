export interface NHLHOFInfo {
  name: string                  // Player display name
  inductionYear: number | null  // null if not yet inducted
  inductionCategory: string     // 'Player' | 'Builder' | 'Official'
  description: string           // e.g., "Inducted 2017"
}

/**
 * Comprehensive Hockey Hall of Fame player induction data.
 * Keyed by NHL API player ID (api-web.nhle.com).
 *
 * The HHOF uses a selection committee rather than a ballot/voting
 * percentage system like the Baseball HOF.
 *
 * Sources: Hockey Hall of Fame (hhof.com), Hockey Reference, NHL Records
 * Last updated: February 2025 (through 2025 induction class)
 */
export const NHL_HOF_DATA: Record<number, NHLHOFInfo> = {

  // =====================================================================
  // 2025 INDUCTION CLASS
  // =====================================================================
  8465009: {
    name: 'Zdeno Chara', inductionYear: 2025, inductionCategory: 'Player',
    description: 'Inducted 2025',
  },
  8470281: {
    name: 'Duncan Keith', inductionYear: 2025, inductionCategory: 'Player',
    description: 'Inducted 2025',
  },
  8449654: {
    name: 'Alexander Mogilny', inductionYear: 2025, inductionCategory: 'Player',
    description: 'Inducted 2025',
  },
  8466138: {
    name: 'Joe Thornton', inductionYear: 2025, inductionCategory: 'Player',
    description: 'Inducted 2025',
  },

  // =====================================================================
  // 2024 INDUCTION CLASS
  // =====================================================================
  8467514: {
    name: 'Pavel Datsyuk', inductionYear: 2024, inductionCategory: 'Player',
    description: 'Inducted 2024',
  },
  8450978: {
    name: 'Jeremy Roenick', inductionYear: 2024, inductionCategory: 'Player',
    description: 'Inducted 2024',
  },
  8470642: {
    name: 'Shea Weber', inductionYear: 2024, inductionCategory: 'Player',
    description: 'Inducted 2024',
  },

  // =====================================================================
  // 2023 INDUCTION CLASS
  // =====================================================================
  8468685: {
    name: 'Henrik Lundqvist', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },
  8467876: {
    name: 'Henrik Sedin', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },
  8467875: {
    name: 'Daniel Sedin', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },
  8445275: {
    name: 'Tom Barrasso', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },
  8451991: {
    name: 'Pierre Turgeon', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },
  8452217: {
    name: 'Mike Vernon', inductionYear: 2023, inductionCategory: 'Player',
    description: 'Inducted 2023',
  },

  // =====================================================================
  // 2022 INDUCTION CLASS
  // =====================================================================
  8466141: {
    name: 'Roberto Luongo', inductionYear: 2022, inductionCategory: 'Player',
    description: 'Inducted 2022',
  },
  8460621: {
    name: 'Daniel Alfredsson', inductionYear: 2022, inductionCategory: 'Player',
    description: 'Inducted 2022',
  },

  // =====================================================================
  // 2020 INDUCTION CLASS (ceremony held 2021 due to COVID)
  // =====================================================================
  8462042: {
    name: 'Jarome Iginla', inductionYear: 2020, inductionCategory: 'Player',
    description: 'Inducted 2020',
  },
  8466148: {
    name: 'Marian Hossa', inductionYear: 2020, inductionCategory: 'Player',
    description: 'Inducted 2020',
  },
  8448884: {
    name: 'Kevin Lowe', inductionYear: 2020, inductionCategory: 'Player',
    description: 'Inducted 2020',
  },
  8452489: {
    name: 'Doug Wilson', inductionYear: 2020, inductionCategory: 'Player',
    description: 'Inducted 2020',
  },

  // =====================================================================
  // 2019 INDUCTION CLASS
  // =====================================================================
  8458494: {
    name: 'Sergei Zubov', inductionYear: 2019, inductionCategory: 'Player',
    description: 'Inducted 2019',
  },
  8446036: {
    name: 'Guy Carbonneau', inductionYear: 2019, inductionCategory: 'Player',
    description: 'Inducted 2019',
  },

  // =====================================================================
  // 2018 INDUCTION CLASS
  // =====================================================================
  8455710: {
    name: 'Martin Brodeur', inductionYear: 2018, inductionCategory: 'Player',
    description: 'Inducted 2018',
  },
  8466378: {
    name: 'Martin St. Louis', inductionYear: 2018, inductionCategory: 'Player',
    description: 'Inducted 2018',
  },

  // =====================================================================
  // 2017 INDUCTION CLASS
  // =====================================================================
  8457981: {
    name: 'Teemu Selanne', inductionYear: 2017, inductionCategory: 'Player',
    description: 'Inducted 2017',
  },
  8450725: {
    name: 'Mark Recchi', inductionYear: 2017, inductionCategory: 'Player',
    description: 'Inducted 2017',
  },
  8459426: {
    name: 'Paul Kariya', inductionYear: 2017, inductionCategory: 'Player',
    description: 'Inducted 2017',
  },
  8445000: {
    name: 'Dave Andreychuk', inductionYear: 2017, inductionCategory: 'Player',
    description: 'Inducted 2017',
  },

  // =====================================================================
  // 2016 INDUCTION CLASS
  // =====================================================================
  8458515: {
    name: 'Eric Lindros', inductionYear: 2016, inductionCategory: 'Player',
    description: 'Inducted 2016',
  },
  8449163: {
    name: 'Sergei Makarov', inductionYear: 2016, inductionCategory: 'Player',
    description: 'Inducted 2016',
  },

  // =====================================================================
  // 2015 INDUCTION CLASS
  // =====================================================================
  8457063: {
    name: 'Nicklas Lidstrom', inductionYear: 2015, inductionCategory: 'Player',
    description: 'Inducted 2015',
  },
  8459424: {
    name: 'Chris Pronger', inductionYear: 2015, inductionCategory: 'Player',
    description: 'Inducted 2015',
  },
  8446788: {
    name: 'Sergei Fedorov', inductionYear: 2015, inductionCategory: 'Player',
    description: 'Inducted 2015',
  },
  8447989: {
    name: 'Phil Housley', inductionYear: 2015, inductionCategory: 'Player',
    description: 'Inducted 2015',
  },

  // =====================================================================
  // 2014 INDUCTION CLASS
  // =====================================================================
  8447687: {
    name: 'Dominik Hasek', inductionYear: 2014, inductionCategory: 'Player',
    description: 'Inducted 2014',
  },
  8458520: {
    name: 'Peter Forsberg', inductionYear: 2014, inductionCategory: 'Player',
    description: 'Inducted 2014',
  },
  8449645: {
    name: 'Mike Modano', inductionYear: 2014, inductionCategory: 'Player',
    description: 'Inducted 2014',
  },
  8445550: {
    name: 'Rob Blake', inductionYear: 2014, inductionCategory: 'Player',
    description: 'Inducted 2014',
  },

  // =====================================================================
  // 2013 INDUCTION CLASS
  // =====================================================================
  8458517: {
    name: 'Scott Niedermayer', inductionYear: 2013, inductionCategory: 'Player',
    description: 'Inducted 2013',
  },
  8446053: {
    name: 'Chris Chelios', inductionYear: 2013, inductionCategory: 'Player',
    description: 'Inducted 2013',
  },
  8451302: {
    name: 'Brendan Shanahan', inductionYear: 2013, inductionCategory: 'Player',
    description: 'Inducted 2013',
  },

  // =====================================================================
  // 2012 INDUCTION CLASS
  // =====================================================================
  8451101: {
    name: 'Joe Sakic', inductionYear: 2012, inductionCategory: 'Player',
    description: 'Inducted 2012',
  },
  8451774: {
    name: 'Mats Sundin', inductionYear: 2012, inductionCategory: 'Player',
    description: 'Inducted 2012',
  },
  8449951: {
    name: 'Adam Oates', inductionYear: 2012, inductionCategory: 'Player',
    description: 'Inducted 2012',
  },
  8455738: {
    name: 'Pavel Bure', inductionYear: 2012, inductionCategory: 'Player',
    description: 'Inducted 2012',
  },

  // =====================================================================
  // 2011 INDUCTION CLASS
  // =====================================================================
  8449893: {
    name: 'Joe Nieuwendyk', inductionYear: 2011, inductionCategory: 'Player',
    description: 'Inducted 2011',
  },
  8447206: {
    name: 'Doug Gilmour', inductionYear: 2011, inductionCategory: 'Player',
    description: 'Inducted 2011',
  },
  8448002: {
    name: 'Mark Howe', inductionYear: 2011, inductionCategory: 'Player',
    description: 'Inducted 2011',
  },
  8445386: {
    name: 'Ed Belfour', inductionYear: 2011, inductionCategory: 'Player',
    description: 'Inducted 2011',
  },

  // =====================================================================
  // 2010 INDUCTION CLASS
  // =====================================================================
  8446063: {
    name: 'Dino Ciccarelli', inductionYear: 2010, inductionCategory: 'Player',
    description: 'Inducted 2010',
  },

  // =====================================================================
  // 2009 INDUCTION CLASS
  // =====================================================================
  8452578: {
    name: 'Steve Yzerman', inductionYear: 2009, inductionCategory: 'Player',
    description: 'Inducted 2009',
  },
  8448769: {
    name: 'Brian Leetch', inductionYear: 2009, inductionCategory: 'Player',
    description: 'Inducted 2009',
  },
  8450941: {
    name: 'Luc Robitaille', inductionYear: 2009, inductionCategory: 'Player',
    description: 'Inducted 2009',
  },
  8448091: {
    name: 'Brett Hull', inductionYear: 2009, inductionCategory: 'Player',
    description: 'Inducted 2009',
  },

  // =====================================================================
  // 2008 INDUCTION CLASS
  // =====================================================================
  8444945: {
    name: 'Glenn Anderson', inductionYear: 2008, inductionCategory: 'Player',
    description: 'Inducted 2008',
  },
  8448669: {
    name: 'Igor Larionov', inductionYear: 2008, inductionCategory: 'Player',
    description: 'Inducted 2008',
  },

  // =====================================================================
  // 2007 INDUCTION CLASS
  // =====================================================================
  8449573: {
    name: 'Mark Messier', inductionYear: 2007, inductionCategory: 'Player',
    description: 'Inducted 2007',
  },
  8446951: {
    name: 'Ron Francis', inductionYear: 2007, inductionCategory: 'Player',
    description: 'Inducted 2007',
  },
  8448960: {
    name: 'Al MacInnis', inductionYear: 2007, inductionCategory: 'Player',
    description: 'Inducted 2007',
  },
  8451715: {
    name: 'Scott Stevens', inductionYear: 2007, inductionCategory: 'Player',
    description: 'Inducted 2007',
  },

  // =====================================================================
  // 2006 INDUCTION CLASS
  // =====================================================================
  8451033: {
    name: 'Patrick Roy', inductionYear: 2006, inductionCategory: 'Player',
    description: 'Inducted 2006',
  },
  8445957: {
    name: 'Dick Duff', inductionYear: 2006, inductionCategory: 'Player',
    description: 'Inducted 2006',
  },

  // =====================================================================
  // 2005 INDUCTION CLASS
  // =====================================================================
  8449812: {
    name: 'Cam Neely', inductionYear: 2005, inductionCategory: 'Player',
    description: 'Inducted 2005',
  },

  // =====================================================================
  // 2004 INDUCTION CLASS
  // =====================================================================
  8445621: {
    name: 'Ray Bourque', inductionYear: 2004, inductionCategory: 'Player',
    description: 'Inducted 2004',
  },
  8446117: {
    name: 'Paul Coffey', inductionYear: 2004, inductionCategory: 'Player',
    description: 'Inducted 2004',
  },
  8449745: {
    name: 'Larry Murphy', inductionYear: 2004, inductionCategory: 'Player',
    description: 'Inducted 2004',
  },

  // =====================================================================
  // 2003 INDUCTION CLASS
  // =====================================================================
  8448626: {
    name: 'Pat LaFontaine', inductionYear: 2003, inductionCategory: 'Player',
    description: 'Inducted 2003',
  },
  8446991: {
    name: 'Grant Fuhr', inductionYear: 2003, inductionCategory: 'Player',
    description: 'Inducted 2003',
  },

  // =====================================================================
  // 2002 INDUCTION CLASS
  // =====================================================================
  8446803: {
    name: 'Bernie Federko', inductionYear: 2002, inductionCategory: 'Player',
    description: 'Inducted 2002',
  },
  8447193: {
    name: 'Clark Gillies', inductionYear: 2002, inductionCategory: 'Player',
    description: 'Inducted 2002',
  },
  8448651: {
    name: 'Rod Langway', inductionYear: 2002, inductionCategory: 'Player',
    description: 'Inducted 2002',
  },

  // =====================================================================
  // 2001 INDUCTION CLASS
  // =====================================================================
  8447685: {
    name: 'Dale Hawerchuk', inductionYear: 2001, inductionCategory: 'Player',
    description: 'Inducted 2001',
  },
  8448569: {
    name: 'Jari Kurri', inductionYear: 2001, inductionCategory: 'Player',
    description: 'Inducted 2001',
  },
  8447067: {
    name: 'Mike Gartner', inductionYear: 2001, inductionCategory: 'Player',
    description: 'Inducted 2001',
  },
  8446789: {
    name: 'Viacheslav Fetisov', inductionYear: 2001, inductionCategory: 'Player',
    description: 'Inducted 2001',
  },

  // =====================================================================
  // 2000 INDUCTION CLASS
  // =====================================================================
  8451146: {
    name: 'Denis Savard', inductionYear: 2000, inductionCategory: 'Player',
    description: 'Inducted 2000',
  },
  8449743: {
    name: 'Joe Mullen', inductionYear: 2000, inductionCategory: 'Player',
    description: 'Inducted 2000',
  },

  // =====================================================================
  // 1999 INDUCTION CLASS
  // =====================================================================
  8447400: {
    name: 'Wayne Gretzky', inductionYear: 1999, inductionCategory: 'Player',
    description: 'Inducted 1999 (waiting period waived)',
  },

  // =====================================================================
  // 1998 INDUCTION CLASS
  // =====================================================================
  8447310: {
    name: 'Michel Goulet', inductionYear: 1998, inductionCategory: 'Player',
    description: 'Inducted 1998',
  },
  8451689: {
    name: 'Peter Stastny', inductionYear: 1998, inductionCategory: 'Player',
    description: 'Inducted 1998',
  },

  // =====================================================================
  // 1997 INDUCTION CLASS
  // =====================================================================
  8448782: {
    name: 'Mario Lemieux', inductionYear: 1997, inductionCategory: 'Player',
    description: 'Inducted 1997 (waiting period waived)',
  },
  8451965: {
    name: 'Bryan Trottier', inductionYear: 1997, inductionCategory: 'Player',
    description: 'Inducted 1997',
  },

  // =====================================================================
  // 1996 INDUCTION CLASS
  // =====================================================================
  8451102: {
    name: 'Borje Salming', inductionYear: 1996, inductionCategory: 'Player',
    description: 'Inducted 1996',
  },

  // =====================================================================
  // 1995 INDUCTION CLASS
  // =====================================================================
  8450936: {
    name: 'Larry Robinson', inductionYear: 1995, inductionCategory: 'Player',
    description: 'Inducted 1995',
  },

  // =====================================================================
  // 1992 INDUCTION CLASS
  // =====================================================================
  8446430: {
    name: 'Marcel Dionne', inductionYear: 1992, inductionCategory: 'Player',
    description: 'Inducted 1992',
  },
  8449423: {
    name: 'Lanny McDonald', inductionYear: 1992, inductionCategory: 'Player',
    description: 'Inducted 1992',
  },
  8446998: {
    name: 'Bob Gainey', inductionYear: 1992, inductionCategory: 'Player',
    description: 'Inducted 1992',
  },

  // =====================================================================
  // 1991 INDUCTION CLASS
  // =====================================================================
  8445611: {
    name: 'Mike Bossy', inductionYear: 1991, inductionCategory: 'Player',
    description: 'Inducted 1991',
  },
  8450505: {
    name: 'Denis Potvin', inductionYear: 1991, inductionCategory: 'Player',
    description: 'Inducted 1991',
  },
  8448227: {
    name: 'Bob Pulford', inductionYear: 1991, inductionCategory: 'Player',
    description: 'Inducted 1991',
  },

  // =====================================================================
  // 1990 INDUCTION CLASS
  // =====================================================================
  8450308: {
    name: 'Gilbert Perreault', inductionYear: 1990, inductionCategory: 'Player',
    description: 'Inducted 1990',
  },
  8445252: {
    name: 'Bill Barber', inductionYear: 1990, inductionCategory: 'Player',
    description: 'Inducted 1990',
  },

  // =====================================================================
  // 1989 INDUCTION CLASS
  // =====================================================================
  8451386: {
    name: 'Darryl Sittler', inductionYear: 1989, inductionCategory: 'Player',
    description: 'Inducted 1989',
  },

  // =====================================================================
  // 1988 INDUCTION CLASS
  // =====================================================================
  8448624: {
    name: 'Guy Lafleur', inductionYear: 1988, inductionCategory: 'Player',
    description: 'Inducted 1988',
  },
  8446720: {
    name: 'Tony Esposito', inductionYear: 1988, inductionCategory: 'Player',
    description: 'Inducted 1988',
  },
  8450206: {
    name: 'Brad Park', inductionYear: 1988, inductionCategory: 'Player',
    description: 'Inducted 1988',
  },

  // =====================================================================
  // 1987 INDUCTION CLASS
  // =====================================================================
  8446098: {
    name: 'Bobby Clarke', inductionYear: 1987, inductionCategory: 'Player',
    description: 'Inducted 1987',
  },

  // =====================================================================
  // 1986 INDUCTION CLASS
  // =====================================================================
  8451150: {
    name: 'Serge Savard', inductionYear: 1986, inductionCategory: 'Player',
    description: 'Inducted 1986',
  },
  8448468: {
    name: 'Dave Keon', inductionYear: 1986, inductionCategory: 'Player',
    description: 'Inducted 1986',
  },

  // =====================================================================
  // 1985 INDUCTION CLASS
  // =====================================================================
  8449853: {
    name: 'Gerry Cheevers', inductionYear: 1985, inductionCategory: 'Player',
    description: 'Inducted 1985',
  },
  8450646: {
    name: 'Jean Ratelle', inductionYear: 1985, inductionCategory: 'Player',
    description: 'Inducted 1985',
  },

  // =====================================================================
  // 1984 INDUCTION CLASS
  // =====================================================================
  8446722: {
    name: 'Phil Esposito', inductionYear: 1984, inductionCategory: 'Player',
    description: 'Inducted 1984',
  },
  8448756: {
    name: 'Jacques Lemaire', inductionYear: 1984, inductionCategory: 'Player',
    description: 'Inducted 1984',
  },
  8450178: {
    name: 'Bernie Parent', inductionYear: 1984, inductionCategory: 'Player',
    description: 'Inducted 1984',
  },

  // =====================================================================
  // 1983 INDUCTION CLASS
  // =====================================================================
  8448108: {
    name: 'Bobby Hull', inductionYear: 1983, inductionCategory: 'Player',
    description: 'Inducted 1983',
  },
  8449602: {
    name: 'Stan Mikita', inductionYear: 1983, inductionCategory: 'Player',
    description: 'Inducted 1983',
  },
  8446490: {
    name: 'Ken Dryden', inductionYear: 1983, inductionCategory: 'Player',
    description: 'Inducted 1983',
  },

  // =====================================================================
  // 1982 INDUCTION CLASS
  // =====================================================================
  8446200: {
    name: 'Yvan Cournoyer', inductionYear: 1982, inductionCategory: 'Player',
    description: 'Inducted 1982',
  },
  8447172: {
    name: 'Rod Gilbert', inductionYear: 1982, inductionCategory: 'Player',
    description: 'Inducted 1982',
  },
  8449274: {
    name: 'Norm Ullman', inductionYear: 1982, inductionCategory: 'Player',
    description: 'Inducted 1982',
  },

  // =====================================================================
  // 1981 INDUCTION CLASS
  // =====================================================================
  8445240: {
    name: 'Johnny Bucyk', inductionYear: 1981, inductionCategory: 'Player',
    description: 'Inducted 1981',
  },
  8449044: {
    name: 'Frank Mahovlich', inductionYear: 1981, inductionCategory: 'Player',
    description: 'Inducted 1981',
  },

  // =====================================================================
  // 1979 INDUCTION CLASS
  // =====================================================================
  8450070: {
    name: 'Bobby Orr', inductionYear: 1979, inductionCategory: 'Player',
    description: 'Inducted 1979 (waiting period waived)',
  },

  // =====================================================================
  // 1978 INDUCTION CLASS
  // =====================================================================
  8445032: {
    name: 'Andy Bathgate', inductionYear: 1978, inductionCategory: 'Player',
    description: 'Inducted 1978',
  },
  8450066: {
    name: 'Jacques Plante', inductionYear: 1978, inductionCategory: 'Player',
    description: 'Inducted 1978',
  },
  8448214: {
    name: 'Marcel Pronovost', inductionYear: 1978, inductionCategory: 'Player',
    description: 'Inducted 1978',
  },

  // =====================================================================
  // 1977 INDUCTION CLASS
  // =====================================================================
  8445865: {
    name: 'Alex Delvecchio', inductionYear: 1977, inductionCategory: 'Player',
    description: 'Inducted 1977',
  },
  8446917: {
    name: 'Tim Horton', inductionYear: 1977, inductionCategory: 'Player',
    description: 'Inducted 1977',
  },

  // =====================================================================
  // 1975 INDUCTION CLASS
  // =====================================================================
  8449988: {
    name: 'Glenn Hall', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },

  // =====================================================================
  // 1972 INDUCTION CLASS
  // =====================================================================
  8445408: {
    name: 'Jean Beliveau', inductionYear: 1972, inductionCategory: 'Player',
    description: 'Inducted 1972',
  },
  8446579: {
    name: 'Bernie Geoffrion', inductionYear: 1972, inductionCategory: 'Player',
    description: 'Inducted 1972',
  },
  8448000: {
    name: 'Gordie Howe', inductionYear: 1972, inductionCategory: 'Player',
    description: 'Inducted 1972',
  },

  // =====================================================================
  // 1969 INDUCTION CLASS
  // =====================================================================
  8447149: {
    name: 'Red Kelly', inductionYear: 1969, inductionCategory: 'Player',
    description: 'Inducted 1969',
  },

  // =====================================================================
  // PRE-1960s (select inductees with NHL API IDs)
  // =====================================================================
  8451354: {
    name: 'Steve Shutt', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
  },
  8448694: {
    name: 'Guy Lapointe', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
  },
  8458361: {
    name: 'Doug Weight', inductionYear: null, inductionCategory: 'Player',
    description: 'Not inducted',
  },

  // =====================================================================
  // NOTABLE ACTIVE / NOT-YET-ELIGIBLE PLAYERS
  // =====================================================================
  8471675: {
    name: 'Sidney Crosby', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet eligible (active)',
  },
  8471214: {
    name: 'Alex Ovechkin', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet eligible (active)',
  },
  8474141: {
    name: 'Patrick Kane', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet eligible (active through 2024-25)',
  },
  8473604: {
    name: 'Jonathan Toews', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet inducted (retired 2023)',
  },
  8448208: {
    name: 'Jaromir Jagr', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet inducted (retired 2018)',
  },
  8470638: {
    name: 'Patrice Bergeron', inductionYear: null, inductionCategory: 'Player',
    description: 'Not yet eligible (retired 2023)',
  },
}
