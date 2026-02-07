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
 * Note: Only players with NHL API IDs are included. Pre-NHL era players
 * (mostly 1945-1962 induction classes) without API data are omitted.
 * Women's hockey inductees are also excluded (no NHL API IDs).
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
  8449809: {
    name: 'Vaclav Nedomansky', inductionYear: 2019, inductionCategory: 'Player',
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
  8448064: {
    name: 'Willie O\'Ree', inductionYear: 2018, inductionCategory: 'Player',
    description: 'Inducted 2018 (first Black NHL player)',
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
  8452122: {
    name: 'Rogie Vachon', inductionYear: 2016, inductionCategory: 'Player',
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
  8445517: {
    name: 'Roy Conacher', inductionYear: 1998, inductionCategory: 'Player',
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
  8445034: {
    name: 'Bobby Bauer', inductionYear: 1996, inductionCategory: 'Player',
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
  // 1994 INDUCTION CLASS
  // =====================================================================
  8445514: {
    name: 'Lionel Conacher', inductionYear: 1994, inductionCategory: 'Player',
    description: 'Inducted 1994',
  },
  8449369: {
    name: 'Harry Watson', inductionYear: 1994, inductionCategory: 'Player',
    description: 'Inducted 1994',
  },

  // =====================================================================
  // 1993 INDUCTION CLASS
  // =====================================================================
  8451354: {
    name: 'Steve Shutt', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
  },
  8448694: {
    name: 'Guy Lapointe', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
  },
  8451525: {
    name: 'Billy Smith', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
  },
  8447326: {
    name: 'Edgar Laprade', inductionYear: 1993, inductionCategory: 'Player',
    description: 'Inducted 1993',
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
  8445961: {
    name: 'Woody Dumart', inductionYear: 1992, inductionCategory: 'Player',
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
  8449068: {
    name: 'Clint Smith', inductionYear: 1991, inductionCategory: 'Player',
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
  8446318: {
    name: 'Fern Flaman', inductionYear: 1990, inductionCategory: 'Player',
    description: 'Inducted 1990',
  },

  // =====================================================================
  // 1989 INDUCTION CLASS
  // =====================================================================
  8451386: {
    name: 'Darryl Sittler', inductionYear: 1989, inductionCategory: 'Player',
    description: 'Inducted 1989',
  },
  8458257: {
    name: 'Vladislav Tretiak', inductionYear: 1989, inductionCategory: 'Player',
    description: 'Inducted 1989 (Soviet goaltender)',
  },
  8447484: {
    name: 'Herbie Lewis', inductionYear: 1989, inductionCategory: 'Player',
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
  8448042: {
    name: 'Buddy O\'Connor', inductionYear: 1988, inductionCategory: 'Player',
    description: 'Inducted 1988',
  },

  // =====================================================================
  // 1987 INDUCTION CLASS
  // =====================================================================
  8446098: {
    name: 'Bobby Clarke', inductionYear: 1987, inductionCategory: 'Player',
    description: 'Inducted 1987',
  },
  8449979: {
    name: 'Eddie Giacomin', inductionYear: 1987, inductionCategory: 'Player',
    description: 'Inducted 1987',
  },
  8447325: {
    name: 'Jacques Laperriere', inductionYear: 1987, inductionCategory: 'Player',
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
  8445111: {
    name: 'Leo Boivin', inductionYear: 1986, inductionCategory: 'Player',
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
  8448057: {
    name: 'Bert Olmstead', inductionYear: 1985, inductionCategory: 'Player',
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
  8449155: {
    name: 'Allan Stanley', inductionYear: 1981, inductionCategory: 'Player',
    description: 'Inducted 1981',
  },

  // =====================================================================
  // 1980 INDUCTION CLASS
  // =====================================================================
  8450019: {
    name: 'Harry Lumley', inductionYear: 1980, inductionCategory: 'Player',
    description: 'Inducted 1980',
  },
  8450152: {
    name: 'Gump Worsley', inductionYear: 1980, inductionCategory: 'Player',
    description: 'Inducted 1980',
  },

  // =====================================================================
  // 1979 INDUCTION CLASS
  // =====================================================================
  8450070: {
    name: 'Bobby Orr', inductionYear: 1979, inductionCategory: 'Player',
    description: 'Inducted 1979 (waiting period waived)',
  },
  8446926: {
    name: 'Harry Howell', inductionYear: 1979, inductionCategory: 'Player',
    description: 'Inducted 1979',
  },
  8448320: {
    name: 'Henri Richard', inductionYear: 1979, inductionCategory: 'Player',
    description: 'Inducted 1979',
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
  // 1976 INDUCTION CLASS
  // =====================================================================
  8449835: {
    name: 'Johnny Bower', inductionYear: 1976, inductionCategory: 'Player',
    description: 'Inducted 1976',
  },
  8448235: {
    name: 'Bill Quackenbush', inductionYear: 1976, inductionCategory: 'Player',
    description: 'Inducted 1976',
  },

  // =====================================================================
  // 1975 INDUCTION CLASS
  // =====================================================================
  8449988: {
    name: 'Glenn Hall', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },
  8444971: {
    name: 'George Armstrong', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },
  8444998: {
    name: 'Ace Bailey', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },
  8445950: {
    name: 'Gordie Drillon', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },
  8448152: {
    name: 'Pierre Pilote', inductionYear: 1975, inductionCategory: 'Player',
    description: 'Inducted 1975',
  },

  // =====================================================================
  // 1974 INDUCTION CLASS
  // =====================================================================
  8445255: {
    name: 'Billy Burch', inductionYear: 1974, inductionCategory: 'Player',
    description: 'Inducted 1974',
  },
  8445742: {
    name: 'Art Coulter', inductionYear: 1974, inductionCategory: 'Player',
    description: 'Inducted 1974',
  },
  8447886: {
    name: 'Dickie Moore', inductionYear: 1974, inductionCategory: 'Player',
    description: 'Inducted 1974',
  },

  // =====================================================================
  // 1973 INDUCTION CLASS
  // =====================================================================
  8446728: {
    name: 'Doug Harvey', inductionYear: 1973, inductionCategory: 'Player',
    description: 'Inducted 1973',
  },
  8450096: {
    name: 'Chuck Rayner', inductionYear: 1973, inductionCategory: 'Player',
    description: 'Inducted 1973',
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
  8449997: {
    name: 'Hap Holmes', inductionYear: 1972, inductionCategory: 'Player',
    description: 'Inducted 1972',
  },
  8449077: {
    name: 'Hooley Smith', inductionYear: 1972, inductionCategory: 'Player',
    description: 'Inducted 1972',
  },

  // =====================================================================
  // 1971 INDUCTION CLASS
  // =====================================================================
  8447025: {
    name: 'Busher Jackson', inductionYear: 1971, inductionCategory: 'Player',
    description: 'Inducted 1971',
  },
  8450111: {
    name: 'Terry Sawchuk', inductionYear: 1971, inductionCategory: 'Player',
    description: 'Inducted 1971',
  },
  8449381: {
    name: 'Cooney Weiland', inductionYear: 1971, inductionCategory: 'Player',
    description: 'Inducted 1971',
  },

  // =====================================================================
  // 1970 INDUCTION CLASS
  // =====================================================================
  8445972: {
    name: 'Babe Dye', inductionYear: 1970, inductionCategory: 'Player',
    description: 'Inducted 1970',
  },
  8446513: {
    name: 'Bill Gadsby', inductionYear: 1970, inductionCategory: 'Player',
    description: 'Inducted 1970',
  },
  8447101: {
    name: 'Tom Johnson', inductionYear: 1970, inductionCategory: 'Player',
    description: 'Inducted 1970',
  },

  // =====================================================================
  // 1969 INDUCTION CLASS
  // =====================================================================
  8447149: {
    name: 'Red Kelly', inductionYear: 1969, inductionCategory: 'Player',
    description: 'Inducted 1969',
  },
  8444857: {
    name: 'Sid Abel', inductionYear: 1969, inductionCategory: 'Player',
    description: 'Inducted 1969',
  },
  8446850: {
    name: 'Bryan Hextall', inductionYear: 1969, inductionCategory: 'Player',
    description: 'Inducted 1969',
  },
  8450153: {
    name: 'Roy Worters', inductionYear: 1969, inductionCategory: 'Player',
    description: 'Inducted 1969',
  },

  // =====================================================================
  // 1968 INDUCTION CLASS
  // =====================================================================
  8445754: {
    name: 'Bill Cowley', inductionYear: 1968, inductionCategory: 'Player',
    description: 'Inducted 1968',
  },

  // =====================================================================
  // 1967 INDUCTION CLASS
  // =====================================================================
  8449837: {
    name: 'Turk Broda', inductionYear: 1967, inductionCategory: 'Player',
    description: 'Inducted 1967',
  },
  8445509: {
    name: 'Neil Colville', inductionYear: 1967, inductionCategory: 'Player',
    description: 'Inducted 1967',
  },
  8448055: {
    name: 'Harry Oliver', inductionYear: 1967, inductionCategory: 'Player',
    description: 'Inducted 1967',
  },

  // =====================================================================
  // 1966 INDUCTION CLASS
  // =====================================================================
  8445063: {
    name: 'Max Bentley', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8445098: {
    name: 'Toe Blake', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8445132: {
    name: 'Butch Bouchard', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8449836: {
    name: 'Frank Brimsek', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8447166: {
    name: 'Ted Kennedy', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8447271: {
    name: 'Elmer Lach', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8447500: {
    name: 'Ted Lindsay', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8448187: {
    name: 'Babe Pratt', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },
  8448257: {
    name: 'Ken Reardon', inductionYear: 1966, inductionCategory: 'Player',
    description: 'Inducted 1966',
  },

  // =====================================================================
  // 1965 INDUCTION CLASS
  // =====================================================================
  8445026: {
    name: 'Marty Barry', inductionYear: 1965, inductionCategory: 'Player',
    description: 'Inducted 1965',
  },
  8449817: {
    name: 'Clint Benedict', inductionYear: 1965, inductionCategory: 'Player',
    description: 'Inducted 1965',
  },
  8446915: {
    name: 'Red Horner', inductionYear: 1965, inductionCategory: 'Player',
    description: 'Inducted 1965',
  },
  8446924: {
    name: 'Syd Howe', inductionYear: 1965, inductionCategory: 'Player',
    description: 'Inducted 1965',
  },
  8447902: {
    name: 'Bill Mosienko', inductionYear: 1965, inductionCategory: 'Player',
    description: 'Inducted 1965',
  },

  // =====================================================================
  // 1964 INDUCTION CLASS
  // =====================================================================
  8445062: {
    name: 'Doug Bentley', inductionYear: 1964, inductionCategory: 'Player',
    description: 'Inducted 1964',
  },
  8449910: {
    name: 'Bill Durnan', inductionYear: 1964, inductionCategory: 'Player',
    description: 'Inducted 1964',
  },
  8449038: {
    name: 'Babe Siebert', inductionYear: 1964, inductionCategory: 'Player',
    description: 'Inducted 1964',
  },
  8449184: {
    name: 'Jack Stewart', inductionYear: 1964, inductionCategory: 'Player',
    description: 'Inducted 1964',
  },

  // =====================================================================
  // 1963 INDUCTION CLASS
  // =====================================================================
  8446612: {
    name: 'Ebbie Goodfellow', inductionYear: 1963, inductionCategory: 'Player',
    description: 'Inducted 1963',
  },
  8448197: {
    name: 'Joe Primeau', inductionYear: 1963, inductionCategory: 'Player',
    description: 'Inducted 1963',
  },
  8448951: {
    name: 'Earl Seibert', inductionYear: 1963, inductionCategory: 'Player',
    description: 'Inducted 1963',
  },

  // =====================================================================
  // 1962 INDUCTION CLASS
  // =====================================================================
  8445168: {
    name: 'Punch Broadbent', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8445314: {
    name: 'Harry Cameron', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8446644: {
    name: 'Shorty Green', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8448013: {
    name: 'Reg Noble', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8448946: {
    name: 'Sweeney Schriner', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8449189: {
    name: 'Nels Stewart', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },
  8448154: {
    name: 'Didier Pitre', inductionYear: 1962, inductionCategory: 'Player',
    description: 'Inducted 1962',
  },

  // =====================================================================
  // 1961 INDUCTION CLASS
  // =====================================================================
  8444954: {
    name: 'Syl Apps', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },
  8445512: {
    name: 'Charlie Conacher', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },
  8445854: {
    name: 'Hap Day', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },
  8449987: {
    name: 'George Hainsworth', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },
  8448321: {
    name: 'Maurice Richard', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },
  8448931: {
    name: 'Milt Schmidt', inductionYear: 1961, inductionCategory: 'Player',
    description: 'Inducted 1961',
  },

  // =====================================================================
  // 1960 INDUCTION CLASS
  // =====================================================================
  8447606: {
    name: 'Sylvio Mantha', inductionYear: 1960, inductionCategory: 'Player',
    description: 'Inducted 1960',
  },

  // =====================================================================
  // 1959 INDUCTION CLASS
  // =====================================================================
  8444861: {
    name: 'Jack Adams', inductionYear: 1959, inductionCategory: 'Player',
    description: 'Inducted 1959',
  },
  8445874: {
    name: 'Cy Denneny', inductionYear: 1959, inductionCategory: 'Player',
    description: 'Inducted 1959',
  },
  8450127: {
    name: 'Tiny Thompson', inductionYear: 1959, inductionCategory: 'Player',
    description: 'Inducted 1959',
  },

  // =====================================================================
  // 1958 INDUCTION CLASS
  // =====================================================================
  8445134: {
    name: 'Frank Boucher', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },
  8445471: {
    name: 'King Clancy', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },
  8445497: {
    name: 'Sprague Cleghorn', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },
  8445969: {
    name: 'Red Dutton', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },
  8447143: {
    name: 'Duke Keats', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },
  8449856: {
    name: 'Alex Connell', inductionYear: 1958, inductionCategory: 'Player',
    description: 'Inducted 1958',
  },

  // =====================================================================
  // 1952 INDUCTION CLASS
  // =====================================================================
  8445529: {
    name: 'Bill Cook', inductionYear: 1952, inductionCategory: 'Player',
    description: 'Inducted 1952',
  },

  // =====================================================================
  // 1950 INDUCTION CLASS
  // =====================================================================
  8447289: {
    name: 'Newsy Lalonde', inductionYear: 1950, inductionCategory: 'Player',
    description: 'Inducted 1950',
  },
  8447594: {
    name: 'Joe Malone', inductionYear: 1950, inductionCategory: 'Player',
    description: 'Inducted 1950',
  },

  // =====================================================================
  // 1947 INDUCTION CLASS (inaugural)
  // =====================================================================
  8449024: {
    name: 'Eddie Shore', inductionYear: 1947, inductionCategory: 'Player',
    description: 'Inducted 1947 (inaugural class)',
  },
  8445474: {
    name: 'Dit Clapper', inductionYear: 1947, inductionCategory: 'Player',
    description: 'Inducted 1947 (inaugural class)',
  },
  8447110: {
    name: 'Aurel Joliat', inductionYear: 1947, inductionCategory: 'Player',
    description: 'Inducted 1947 (inaugural class)',
  },
  8448011: {
    name: 'Frank Nighbor', inductionYear: 1947, inductionCategory: 'Player',
    description: 'Inducted 1947 (inaugural class)',
  },

  // =====================================================================
  // NOTABLE ACTIVE / NOT-YET-ELIGIBLE PLAYERS
  // =====================================================================
  8458361: {
    name: 'Doug Weight', inductionYear: null, inductionCategory: 'Player',
    description: 'Not inducted',
  },
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
