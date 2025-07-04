export interface Timezone {
	/** IANA timezone identifier */
	id: string;
	/** Human-readable display name */
	name: string;
	/** UTC offset in format ±HH:MM */
	offset: string;
	/** Representative city/region */
	city: string;
	/** Country/region code */
	country: string;
}

export const TIMEZONES: Timezone[] = [
	// UTC-12:00
	{
		id: "Pacific/Kwajalein",
		name: "Baker Island Time",
		offset: "-12:00",
		city: "Baker Island",
		country: "US",
	},

	// UTC-11:00
	{
		id: "Pacific/Samoa",
		name: "Samoa Standard Time",
		offset: "-11:00",
		city: "Pago Pago",
		country: "AS",
	},
	{
		id: "Pacific/Niue",
		name: "Niue Time",
		offset: "-11:00",
		city: "Alofi",
		country: "NU",
	},
	{
		id: "Pacific/Midway",
		name: "Hawaii-Aleutian Standard Time",
		offset: "-11:00",
		city: "Midway",
		country: "US",
	},

	// UTC-10:00
	{
		id: "Pacific/Honolulu",
		name: "Hawaii Standard Time",
		offset: "-10:00",
		city: "Honolulu",
		country: "US",
	},
	{
		id: "Pacific/Rarotonga",
		name: "Cook Islands Time",
		offset: "-10:00",
		city: "Avarua",
		country: "CK",
	},
	{
		id: "Pacific/Tahiti",
		name: "Tahiti Time",
		offset: "-10:00",
		city: "Papeete",
		country: "PF",
	},

	// UTC-09:30
	{
		id: "Pacific/Marquesas",
		name: "Marquesas Time",
		offset: "-09:30",
		city: "Taiohae",
		country: "PF",
	},

	// UTC-09:00
	{
		id: "America/Anchorage",
		name: "Alaska Standard Time",
		offset: "-09:00",
		city: "Anchorage",
		country: "US",
	},
	{
		id: "Pacific/Gambier",
		name: "Gambier Time",
		offset: "-09:00",
		city: "Gambier Islands",
		country: "PF",
	},

	// UTC-08:00
	{
		id: "America/Los_Angeles",
		name: "Pacific Standard Time",
		offset: "-08:00",
		city: "Los Angeles",
		country: "US",
	},
	{
		id: "America/Vancouver",
		name: "Pacific Standard Time",
		offset: "-08:00",
		city: "Vancouver",
		country: "CA",
	},
	{
		id: "America/Tijuana",
		name: "Pacific Standard Time",
		offset: "-08:00",
		city: "Tijuana",
		country: "MX",
	},
	{
		id: "Pacific/Pitcairn",
		name: "Pitcairn Time",
		offset: "-08:00",
		city: "Adamstown",
		country: "PN",
	},

	// UTC-07:00
	{
		id: "America/Denver",
		name: "Mountain Standard Time",
		offset: "-07:00",
		city: "Denver",
		country: "US",
	},
	{
		id: "America/Calgary",
		name: "Mountain Standard Time",
		offset: "-07:00",
		city: "Calgary",
		country: "CA",
	},
	{
		id: "America/Phoenix",
		name: "Mountain Standard Time",
		offset: "-07:00",
		city: "Phoenix",
		country: "US",
	},
	{
		id: "America/Chihuahua",
		name: "Mountain Standard Time",
		offset: "-07:00",
		city: "Chihuahua",
		country: "MX",
	},

	// UTC-06:00
	{
		id: "America/Chicago",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "Chicago",
		country: "US",
	},
	{
		id: "America/Mexico_City",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "Mexico City",
		country: "MX",
	},
	{
		id: "America/Winnipeg",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "Winnipeg",
		country: "CA",
	},
	{
		id: "America/Guatemala",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "Guatemala City",
		country: "GT",
	},
	{
		id: "America/Tegucigalpa",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "Tegucigalpa",
		country: "HN",
	},
	{
		id: "America/Costa_Rica",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "San José",
		country: "CR",
	},
	{
		id: "America/El_Salvador",
		name: "Central Standard Time",
		offset: "-06:00",
		city: "San Salvador",
		country: "SV",
	},
	{
		id: "Pacific/Easter",
		name: "Easter Island Time",
		offset: "-06:00",
		city: "Hanga Roa",
		country: "CL",
	},
	{
		id: "Pacific/Galapagos",
		name: "Galápagos Time",
		offset: "-06:00",
		city: "Puerto Ayora",
		country: "EC",
	},

	// UTC-05:00
	{
		id: "America/New_York",
		name: "Eastern Standard Time",
		offset: "-05:00",
		city: "New York",
		country: "US",
	},
	{
		id: "America/Toronto",
		name: "Eastern Standard Time",
		offset: "-05:00",
		city: "Toronto",
		country: "CA",
	},
	{
		id: "America/Havana",
		name: "Cuba Standard Time",
		offset: "-05:00",
		city: "Havana",
		country: "CU",
	},
	{
		id: "America/Lima",
		name: "Peru Time",
		offset: "-05:00",
		city: "Lima",
		country: "PE",
	},
	{
		id: "America/Bogota",
		name: "Colombia Time",
		offset: "-05:00",
		city: "Bogotá",
		country: "CO",
	},
	{
		id: "America/Jamaica",
		name: "Eastern Standard Time",
		offset: "-05:00",
		city: "Kingston",
		country: "JM",
	},
	{
		id: "America/Panama",
		name: "Eastern Standard Time",
		offset: "-05:00",
		city: "Panama City",
		country: "PA",
	},
	{
		id: "America/Cancun",
		name: "Eastern Standard Time",
		offset: "-05:00",
		city: "Cancún",
		country: "MX",
	},
	{
		id: "America/Guayaquil",
		name: "Ecuador Time",
		offset: "-05:00",
		city: "Quito",
		country: "EC",
	},

	// UTC-04:00
	{
		id: "America/Santiago",
		name: "Chile Standard Time",
		offset: "-04:00",
		city: "Santiago",
		country: "CL",
	},
	{
		id: "America/Caracas",
		name: "Venezuela Time",
		offset: "-04:00",
		city: "Caracas",
		country: "VE",
	},
	{
		id: "America/La_Paz",
		name: "Bolivia Time",
		offset: "-04:00",
		city: "La Paz",
		country: "BO",
	},
	{
		id: "America/Halifax",
		name: "Atlantic Standard Time",
		offset: "-04:00",
		city: "Halifax",
		country: "CA",
	},
	{
		id: "America/Santo_Domingo",
		name: "Atlantic Standard Time",
		offset: "-04:00",
		city: "Santo Domingo",
		country: "DO",
	},
	{
		id: "America/Manaus",
		name: "Amazon Time",
		offset: "-04:00",
		city: "Manaus",
		country: "BR",
	},
	{
		id: "America/Barbados",
		name: "Atlantic Standard Time",
		offset: "-04:00",
		city: "Bridgetown",
		country: "BB",
	},
	{
		id: "America/Martinique",
		name: "Atlantic Standard Time",
		offset: "-04:00",
		city: "Fort-de-France",
		country: "MQ",
	},
	{
		id: "America/Port_of_Spain",
		name: "Atlantic Standard Time",
		offset: "-04:00",
		city: "Port of Spain",
		country: "TT",
	},
	{
		id: "America/Guyana",
		name: "Guyana Time",
		offset: "-04:00",
		city: "Georgetown",
		country: "GY",
	},

	// UTC-03:30
	{
		id: "America/St_Johns",
		name: "Newfoundland Standard Time",
		offset: "-03:30",
		city: "St. John's",
		country: "CA",
	},

	// UTC-03:00
	{
		id: "America/Sao_Paulo",
		name: "Brasília Time",
		offset: "-03:00",
		city: "São Paulo",
		country: "BR",
	},
	{
		id: "America/Argentina/Buenos_Aires",
		name: "Argentina Time",
		offset: "-03:00",
		city: "Buenos Aires",
		country: "AR",
	},
	{
		id: "America/Montevideo",
		name: "Uruguay Time",
		offset: "-03:00",
		city: "Montevideo",
		country: "UY",
	},
	{
		id: "America/Asuncion",
		name: "Paraguay Time",
		offset: "-03:00",
		city: "Asunción",
		country: "PY",
	},
	{
		id: "America/Cayenne",
		name: "French Guiana Time",
		offset: "-03:00",
		city: "Cayenne",
		country: "GF",
	},
	{
		id: "America/Paramaribo",
		name: "Suriname Time",
		offset: "-03:00",
		city: "Paramaribo",
		country: "SR",
	},
	{
		id: "Atlantic/Stanley",
		name: "Falkland Islands Time",
		offset: "-03:00",
		city: "Stanley",
		country: "FK",
	},

	// UTC-02:00
	{
		id: "America/Noronha",
		name: "Fernando de Noronha Time",
		offset: "-02:00",
		city: "Fernando de Noronha",
		country: "BR",
	},
	{
		id: "Atlantic/South_Georgia",
		name: "South Georgia Time",
		offset: "-02:00",
		city: "Grytviken",
		country: "GS",
	},

	// UTC-01:00
	{
		id: "Atlantic/Cape_Verde",
		name: "Cape Verde Time",
		offset: "-01:00",
		city: "Praia",
		country: "CV",
	},
	{
		id: "Atlantic/Azores",
		name: "Azores Time",
		offset: "-01:00",
		city: "Ponta Delgada",
		country: "PT",
	},
	{
		id: "America/Scoresbysund",
		name: "East Greenland Time",
		offset: "-01:00",
		city: "Ittoqqortoormiit",
		country: "GL",
	},

	// UTC+00:00
	{
		id: "Europe/London",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "London",
		country: "GB",
	},
	{
		id: "Europe/Dublin",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "Dublin",
		country: "IE",
	},
	{
		id: "Europe/Lisbon",
		name: "Western European Time",
		offset: "+00:00",
		city: "Lisbon",
		country: "PT",
	},
	{
		id: "Africa/Casablanca",
		name: "Western European Time",
		offset: "+00:00",
		city: "Casablanca",
		country: "MA",
	},
	{
		id: "Africa/Abidjan",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "Abidjan",
		country: "CI",
	},
	{
		id: "Africa/Accra",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "Accra",
		country: "GH",
	},
	{
		id: "Africa/Dakar",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "Dakar",
		country: "SN",
	},
	{
		id: "Atlantic/Reykjavik",
		name: "Greenwich Mean Time",
		offset: "+00:00",
		city: "Reykjavík",
		country: "IS",
	},
	{
		id: "Atlantic/Canary",
		name: "Western European Time",
		offset: "+00:00",
		city: "Las Palmas",
		country: "ES",
	},

	// UTC+01:00
	{
		id: "Europe/Berlin",
		name: "Central European Time",
		offset: "+01:00",
		city: "Berlin",
		country: "DE",
	},
	{
		id: "Europe/Paris",
		name: "Central European Time",
		offset: "+01:00",
		city: "Paris",
		country: "FR",
	},
	{
		id: "Europe/Rome",
		name: "Central European Time",
		offset: "+01:00",
		city: "Rome",
		country: "IT",
	},
	{
		id: "Europe/Madrid",
		name: "Central European Time",
		offset: "+01:00",
		city: "Madrid",
		country: "ES",
	},
	{
		id: "Europe/Amsterdam",
		name: "Central European Time",
		offset: "+01:00",
		city: "Amsterdam",
		country: "NL",
	},
	{
		id: "Europe/Brussels",
		name: "Central European Time",
		offset: "+01:00",
		city: "Brussels",
		country: "BE",
	},
	{
		id: "Europe/Vienna",
		name: "Central European Time",
		offset: "+01:00",
		city: "Vienna",
		country: "AT",
	},
	{
		id: "Europe/Zurich",
		name: "Central European Time",
		offset: "+01:00",
		city: "Zurich",
		country: "CH",
	},
	{
		id: "Europe/Stockholm",
		name: "Central European Time",
		offset: "+01:00",
		city: "Stockholm",
		country: "SE",
	},
	{
		id: "Europe/Oslo",
		name: "Central European Time",
		offset: "+01:00",
		city: "Oslo",
		country: "NO",
	},
	{
		id: "Europe/Copenhagen",
		name: "Central European Time",
		offset: "+01:00",
		city: "Copenhagen",
		country: "DK",
	},
	{
		id: "Europe/Warsaw",
		name: "Central European Time",
		offset: "+01:00",
		city: "Warsaw",
		country: "PL",
	},
	{
		id: "Europe/Prague",
		name: "Central European Time",
		offset: "+01:00",
		city: "Prague",
		country: "CZ",
	},
	{
		id: "Europe/Budapest",
		name: "Central European Time",
		offset: "+01:00",
		city: "Budapest",
		country: "HU",
	},
	{
		id: "Africa/Lagos",
		name: "West Africa Time",
		offset: "+01:00",
		city: "Lagos",
		country: "NG",
	},
	{
		id: "Africa/Kinshasa",
		name: "West Africa Time",
		offset: "+01:00",
		city: "Kinshasa",
		country: "CD",
	},
	{
		id: "Africa/Algiers",
		name: "Central European Time",
		offset: "+01:00",
		city: "Algiers",
		country: "DZ",
	},
	{
		id: "Africa/Tunis",
		name: "Central European Time",
		offset: "+01:00",
		city: "Tunis",
		country: "TN",
	},

	// UTC+02:00
	{
		id: "Europe/Athens",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Athens",
		country: "GR",
	},
	{
		id: "Europe/Helsinki",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Helsinki",
		country: "FI",
	},
	{
		id: "Europe/Bucharest",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Bucharest",
		country: "RO",
	},
	{
		id: "Europe/Sofia",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Sofia",
		country: "BG",
	},
	{
		id: "Europe/Riga",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Riga",
		country: "LV",
	},
	{
		id: "Europe/Tallinn",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Tallinn",
		country: "EE",
	},
	{
		id: "Europe/Vilnius",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Vilnius",
		country: "LT",
	},
	{
		id: "Europe/Kiev",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Kyiv",
		country: "UA",
	},
	{
		id: "Africa/Cairo",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Cairo",
		country: "EG",
	},
	{
		id: "Africa/Johannesburg",
		name: "South Africa Standard Time",
		offset: "+02:00",
		city: "Johannesburg",
		country: "ZA",
	},
	{
		id: "Africa/Harare",
		name: "Central Africa Time",
		offset: "+02:00",
		city: "Harare",
		country: "ZW",
	},
	{
		id: "Africa/Maputo",
		name: "Central Africa Time",
		offset: "+02:00",
		city: "Maputo",
		country: "MZ",
	},
	{
		id: "Africa/Khartoum",
		name: "Central Africa Time",
		offset: "+02:00",
		city: "Khartoum",
		country: "SD",
	},
	{
		id: "Asia/Jerusalem",
		name: "Israel Standard Time",
		offset: "+02:00",
		city: "Jerusalem",
		country: "IL",
	},
	{
		id: "Asia/Beirut",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Beirut",
		country: "LB",
	},
	{
		id: "Asia/Damascus",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Damascus",
		country: "SY",
	},
	{
		id: "Asia/Amman",
		name: "Eastern European Time",
		offset: "+02:00",
		city: "Amman",
		country: "JO",
	},

	// UTC+03:00
	{
		id: "Europe/Moscow",
		name: "Moscow Standard Time",
		offset: "+03:00",
		city: "Moscow",
		country: "RU",
	},
	{
		id: "Europe/Istanbul",
		name: "Turkey Time",
		offset: "+03:00",
		city: "Istanbul",
		country: "TR",
	},
	{
		id: "Africa/Nairobi",
		name: "East Africa Time",
		offset: "+03:00",
		city: "Nairobi",
		country: "KE",
	},
	{
		id: "Africa/Addis_Ababa",
		name: "East Africa Time",
		offset: "+03:00",
		city: "Addis Ababa",
		country: "ET",
	},
	{
		id: "Asia/Riyadh",
		name: "Arabia Standard Time",
		offset: "+03:00",
		city: "Riyadh",
		country: "SA",
	},
	{
		id: "Asia/Baghdad",
		name: "Arabia Standard Time",
		offset: "+03:00",
		city: "Baghdad",
		country: "IQ",
	},
	{
		id: "Asia/Kuwait",
		name: "Arabia Standard Time",
		offset: "+03:00",
		city: "Kuwait City",
		country: "KW",
	},
	{
		id: "Asia/Qatar",
		name: "Arabia Standard Time",
		offset: "+03:00",
		city: "Doha",
		country: "QA",
	},
	{
		id: "Asia/Bahrain",
		name: "Arabia Standard Time",
		offset: "+03:00",
		city: "Manama",
		country: "BH",
	},
	{
		id: "Indian/Antananarivo",
		name: "East Africa Time",
		offset: "+03:00",
		city: "Antananarivo",
		country: "MG",
	},

	// UTC+03:30
	{
		id: "Asia/Tehran",
		name: "Iran Standard Time",
		offset: "+03:30",
		city: "Tehran",
		country: "IR",
	},

	// UTC+04:00
	{
		id: "Asia/Dubai",
		name: "Gulf Standard Time",
		offset: "+04:00",
		city: "Dubai",
		country: "AE",
	},
	{
		id: "Asia/Baku",
		name: "Azerbaijan Time",
		offset: "+04:00",
		city: "Baku",
		country: "AZ",
	},
	{
		id: "Asia/Tbilisi",
		name: "Georgia Standard Time",
		offset: "+04:00",
		city: "Tbilisi",
		country: "GE",
	},
	{
		id: "Asia/Yerevan",
		name: "Armenia Time",
		offset: "+04:00",
		city: "Yerevan",
		country: "AM",
	},
	{
		id: "Europe/Samara",
		name: "Samara Time",
		offset: "+04:00",
		city: "Samara",
		country: "RU",
	},
	{
		id: "Asia/Muscat",
		name: "Gulf Standard Time",
		offset: "+04:00",
		city: "Muscat",
		country: "OM",
	},
	{
		id: "Indian/Mauritius",
		name: "Mauritius Time",
		offset: "+04:00",
		city: "Port Louis",
		country: "MU",
	},
	{
		id: "Indian/Reunion",
		name: "Réunion Time",
		offset: "+04:00",
		city: "Saint-Denis",
		country: "RE",
	},
	{
		id: "Indian/Mahe",
		name: "Seychelles Time",
		offset: "+04:00",
		city: "Victoria",
		country: "SC",
	},

	// UTC+04:30
	{
		id: "Asia/Kabul",
		name: "Afghanistan Time",
		offset: "+04:30",
		city: "Kabul",
		country: "AF",
	},

	// UTC+05:00
	{
		id: "Asia/Karachi",
		name: "Pakistan Standard Time",
		offset: "+05:00",
		city: "Karachi",
		country: "PK",
	},
	{
		id: "Asia/Tashkent",
		name: "Uzbekistan Time",
		offset: "+05:00",
		city: "Tashkent",
		country: "UZ",
	},
	{
		id: "Asia/Yekaterinburg",
		name: "Yekaterinburg Time",
		offset: "+05:00",
		city: "Yekaterinburg",
		country: "RU",
	},
	{
		id: "Asia/Ashgabat",
		name: "Turkmenistan Time",
		offset: "+05:00",
		city: "Ashgabat",
		country: "TM",
	},
	{
		id: "Asia/Dushanbe",
		name: "Tajikistan Time",
		offset: "+05:00",
		city: "Dushanbe",
		country: "TJ",
	},
	{
		id: "Asia/Almaty",
		name: "Almaty Time",
		offset: "+05:00",
		city: "Almaty",
		country: "KZ",
	},
	{
		id: "Indian/Maldives",
		name: "Maldives Time",
		offset: "+05:00",
		city: "Malé",
		country: "MV",
	},
	{
		id: "Indian/Kerguelen",
		name: "French Southern & Antarctic Time",
		offset: "+05:00",
		city: "Port-aux-Français",
		country: "TF",
	},

	// UTC+05:30
	{
		id: "Asia/Kolkata",
		name: "India Standard Time",
		offset: "+05:30",
		city: "Mumbai",
		country: "IN",
	},
	{
		id: "Asia/Colombo",
		name: "Sri Lanka Standard Time",
		offset: "+05:30",
		city: "Colombo",
		country: "LK",
	},

	// UTC+05:45
	{
		id: "Asia/Kathmandu",
		name: "Nepal Time",
		offset: "+05:45",
		city: "Kathmandu",
		country: "NP",
	},

	// UTC+06:00
	{
		id: "Asia/Dhaka",
		name: "Bangladesh Standard Time",
		offset: "+06:00",
		city: "Dhaka",
		country: "BD",
	},
	{
		id: "Asia/Thimphu",
		name: "Bhutan Time",
		offset: "+06:00",
		city: "Thimphu",
		country: "BT",
	},
	{
		id: "Asia/Bishkek",
		name: "Kyrgyzstan Time",
		offset: "+06:00",
		city: "Bishkek",
		country: "KG",
	},
	{
		id: "Asia/Omsk",
		name: "Omsk Time",
		offset: "+06:00",
		city: "Omsk",
		country: "RU",
	},
	{
		id: "Indian/Chagos",
		name: "Indian Ocean Time",
		offset: "+06:00",
		city: "Diego Garcia",
		country: "IO",
	},

	// UTC+06:30
	{
		id: "Asia/Yangon",
		name: "Myanmar Time",
		offset: "+06:30",
		city: "Yangon",
		country: "MM",
	},
	{
		id: "Indian/Cocos",
		name: "Cocos Islands Time",
		offset: "+06:30",
		city: "West Island",
		country: "CC",
	},

	// UTC+07:00
	{
		id: "Asia/Bangkok",
		name: "Indochina Time",
		offset: "+07:00",
		city: "Bangkok",
		country: "TH",
	},
	{
		id: "Asia/Ho_Chi_Minh",
		name: "Indochina Time",
		offset: "+07:00",
		city: "Ho Chi Minh City",
		country: "VN",
	},
	{
		id: "Asia/Jakarta",
		name: "Western Indonesian Time",
		offset: "+07:00",
		city: "Jakarta",
		country: "ID",
	},
	{
		id: "Asia/Phnom_Penh",
		name: "Indochina Time",
		offset: "+07:00",
		city: "Phnom Penh",
		country: "KH",
	},
	{
		id: "Asia/Vientiane",
		name: "Indochina Time",
		offset: "+07:00",
		city: "Vientiane",
		country: "LA",
	},
	{
		id: "Asia/Krasnoyarsk",
		name: "Krasnoyarsk Time",
		offset: "+07:00",
		city: "Krasnoyarsk",
		country: "RU",
	},
	{
		id: "Asia/Novosibirsk",
		name: "Novosibirsk Time",
		offset: "+07:00",
		city: "Novosibirsk",
		country: "RU",
	},
	{
		id: "Asia/Hovd",
		name: "Hovd Time",
		offset: "+07:00",
		city: "Hovd",
		country: "MN",
	},
	{
		id: "Indian/Christmas",
		name: "Christmas Island Time",
		offset: "+07:00",
		city: "Flying Fish Cove",
		country: "CX",
	},

	// UTC+08:00
	{
		id: "Asia/Shanghai",
		name: "China Standard Time",
		offset: "+08:00",
		city: "Shanghai",
		country: "CN",
	},
	{
		id: "Asia/Hong_Kong",
		name: "Hong Kong Time",
		offset: "+08:00",
		city: "Hong Kong",
		country: "HK",
	},
	{
		id: "Asia/Taipei",
		name: "China Standard Time",
		offset: "+08:00",
		city: "Taipei",
		country: "TW",
	},
	{
		id: "Asia/Singapore",
		name: "Singapore Standard Time",
		offset: "+08:00",
		city: "Singapore",
		country: "SG",
	},
	{
		id: "Asia/Kuala_Lumpur",
		name: "Malaysia Time",
		offset: "+08:00",
		city: "Kuala Lumpur",
		country: "MY",
	},
	{
		id: "Asia/Manila",
		name: "Philippines Standard Time",
		offset: "+08:00",
		city: "Manila",
		country: "PH",
	},
	{
		id: "Asia/Makassar",
		name: "Central Indonesian Time",
		offset: "+08:00",
		city: "Makassar",
		country: "ID",
	},
	{
		id: "Asia/Brunei",
		name: "Brunei Darussalam Time",
		offset: "+08:00",
		city: "Bandar Seri Begawan",
		country: "BN",
	},
	{
		id: "Asia/Irkutsk",
		name: "Irkutsk Time",
		offset: "+08:00",
		city: "Irkutsk",
		country: "RU",
	},
	{
		id: "Asia/Ulaanbaatar",
		name: "Ulaanbaatar Time",
		offset: "+08:00",
		city: "Ulaanbaatar",
		country: "MN",
	},
	{
		id: "Australia/Perth",
		name: "Australian Western Standard Time",
		offset: "+08:00",
		city: "Perth",
		country: "AU",
	},

	// UTC+08:45
	{
		id: "Australia/Eucla",
		name: "Central Western Standard Time",
		offset: "+08:45",
		city: "Eucla",
		country: "AU",
	},

	// UTC+09:00
	{
		id: "Asia/Tokyo",
		name: "Japan Standard Time",
		offset: "+09:00",
		city: "Tokyo",
		country: "JP",
	},
	{
		id: "Asia/Seoul",
		name: "Korea Standard Time",
		offset: "+09:00",
		city: "Seoul",
		country: "KR",
	},
	{
		id: "Asia/Pyongyang",
		name: "Pyongyang Time",
		offset: "+09:00",
		city: "Pyongyang",
		country: "KP",
	},
	{
		id: "Asia/Jayapura",
		name: "Eastern Indonesian Time",
		offset: "+09:00",
		city: "Jayapura",
		country: "ID",
	},
	{
		id: "Asia/Dili",
		name: "Timor-Leste Time",
		offset: "+09:00",
		city: "Dili",
		country: "TL",
	},
	{
		id: "Asia/Chita",
		name: "Yakutsk Time",
		offset: "+09:00",
		city: "Chita",
		country: "RU",
	},
	{
		id: "Asia/Yakutsk",
		name: "Yakutsk Time",
		offset: "+09:00",
		city: "Yakutsk",
		country: "RU",
	},
	{
		id: "Pacific/Palau",
		name: "Palau Time",
		offset: "+09:00",
		city: "Ngerulmud",
		country: "PW",
	},

	// UTC+09:30
	{
		id: "Australia/Adelaide",
		name: "Australian Central Standard Time",
		offset: "+09:30",
		city: "Adelaide",
		country: "AU",
	},
	{
		id: "Australia/Darwin",
		name: "Australian Central Standard Time",
		offset: "+09:30",
		city: "Darwin",
		country: "AU",
	},

	// UTC+10:00
	{
		id: "Australia/Sydney",
		name: "Australian Eastern Standard Time",
		offset: "+10:00",
		city: "Sydney",
		country: "AU",
	},
	{
		id: "Australia/Melbourne",
		name: "Australian Eastern Standard Time",
		offset: "+10:00",
		city: "Melbourne",
		country: "AU",
	},
	{
		id: "Australia/Brisbane",
		name: "Australian Eastern Standard Time",
		offset: "+10:00",
		city: "Brisbane",
		country: "AU",
	},
	{
		id: "Pacific/Port_Moresby",
		name: "Papua New Guinea Time",
		offset: "+10:00",
		city: "Port Moresby",
		country: "PG",
	},
	{
		id: "Asia/Vladivostok",
		name: "Vladivostok Time",
		offset: "+10:00",
		city: "Vladivostok",
		country: "RU",
	},
	{
		id: "Pacific/Guam",
		name: "Chamorro Standard Time",
		offset: "+10:00",
		city: "Hagåtña",
		country: "GU",
	},
	{
		id: "Pacific/Chuuk",
		name: "Chuuk Time",
		offset: "+10:00",
		city: "Weno",
		country: "FM",
	},

	// UTC+10:30
	{
		id: "Australia/Lord_Howe",
		name: "Lord Howe Standard Time",
		offset: "+10:30",
		city: "Lord Howe Island",
		country: "AU",
	},

	// UTC+11:00
	{
		id: "Pacific/Noumea",
		name: "New Caledonia Time",
		offset: "+11:00",
		city: "Nouméa",
		country: "NC",
	},
	{
		id: "Pacific/Guadalcanal",
		name: "Solomon Islands Time",
		offset: "+11:00",
		city: "Honiara",
		country: "SB",
	},
	{
		id: "Pacific/Efate",
		name: "Vanuatu Time",
		offset: "+11:00",
		city: "Port Vila",
		country: "VU",
	},
	{
		id: "Asia/Magadan",
		name: "Magadan Time",
		offset: "+11:00",
		city: "Magadan",
		country: "RU",
	},
	{
		id: "Asia/Sakhalin",
		name: "Sakhalin Time",
		offset: "+11:00",
		city: "Yuzhno-Sakhalinsk",
		country: "RU",
	},
	{
		id: "Pacific/Pohnpei",
		name: "Pohnpei Time",
		offset: "+11:00",
		city: "Palikir",
		country: "FM",
	},
	{
		id: "Pacific/Kosrae",
		name: "Kosrae Time",
		offset: "+11:00",
		city: "Tofol",
		country: "FM",
	},
	{
		id: "Australia/Norfolk",
		name: "Norfolk Island Time",
		offset: "+11:00",
		city: "Kingston",
		country: "NF",
	},

	// UTC+12:00
	{
		id: "Pacific/Auckland",
		name: "New Zealand Standard Time",
		offset: "+12:00",
		city: "Auckland",
		country: "NZ",
	},
	{
		id: "Pacific/Fiji",
		name: "Fiji Time",
		offset: "+12:00",
		city: "Suva",
		country: "FJ",
	},
	{
		id: "Pacific/Tarawa",
		name: "Gilbert Island Time",
		offset: "+12:00",
		city: "South Tarawa",
		country: "KI",
	},
	{
		id: "Pacific/Majuro",
		name: "Marshall Islands Time",
		offset: "+12:00",
		city: "Majuro",
		country: "MH",
	},
	{
		id: "Pacific/Nauru",
		name: "Nauru Time",
		offset: "+12:00",
		city: "Yaren",
		country: "NR",
	},
	{
		id: "Pacific/Funafuti",
		name: "Tuvalu Time",
		offset: "+12:00",
		city: "Funafuti",
		country: "TV",
	},
	{
		id: "Pacific/Wake",
		name: "Wake Island Time",
		offset: "+12:00",
		city: "Wake Island",
		country: "US",
	},
	{
		id: "Pacific/Wallis",
		name: "Wallis & Futuna Time",
		offset: "+12:00",
		city: "Mata-Utu",
		country: "WF",
	},
	{
		id: "Asia/Kamchatka",
		name: "Kamchatka Time",
		offset: "+12:00",
		city: "Petropavlovsk-Kamchatsky",
		country: "RU",
	},
	{
		id: "Asia/Anadyr",
		name: "Anadyr Time",
		offset: "+12:00",
		city: "Anadyr",
		country: "RU",
	},

	// UTC+12:45
	{
		id: "Pacific/Chatham",
		name: "Chatham Standard Time",
		offset: "+12:45",
		city: "Waitangi",
		country: "NZ",
	},

	// UTC+13:00
	{
		id: "Pacific/Tongatapu",
		name: "Tonga Time",
		offset: "+13:00",
		city: "Nuku'alofa",
		country: "TO",
	},
	{
		id: "Pacific/Apia",
		name: "West Samoa Time",
		offset: "+13:00",
		city: "Apia",
		country: "WS",
	},
	{
		id: "Pacific/Enderbury",
		name: "Phoenix Island Time",
		offset: "+13:00",
		city: "Enderbury Island",
		country: "KI",
	},
	{
		id: "Pacific/Fakaofo",
		name: "Tokelau Time",
		offset: "+13:00",
		city: "Fakaofo",
		country: "TK",
	},

	// UTC+14:00
	{
		id: "Pacific/Kiritimati",
		name: "Line Islands Time",
		offset: "+14:00",
		city: "Kiritimati",
		country: "KI",
	},
] as const;

export type TimezoneId = (typeof TIMEZONES)[number]["id"];

// Helper functions for timezone operations
export const getTimezoneById = (id: TimezoneId): Timezone | undefined => {
	return TIMEZONES.find((tz) => tz.id === id);
};

export const getTimezonesByOffset = (offset: string): Timezone[] => {
	return TIMEZONES.filter((tz) => tz.offset === offset);
};

export const getTimezonesByCountry = (country: string): Timezone[] => {
	return TIMEZONES.filter((tz) => tz.country === country);
};

export const searchTimezones = (query: string): Timezone[] => {
	const lowerQuery = query.toLowerCase();
	return TIMEZONES.filter(
		(tz) =>
			tz.name.toLowerCase().includes(lowerQuery) ||
			tz.city.toLowerCase().includes(lowerQuery) ||
			tz.id.toLowerCase().includes(lowerQuery) ||
			tz.offset.includes(query),
	);
};

// Popular/major timezones for quick selection
export const POPULAR_TIMEZONES: TimezoneId[] = [
	"America/New_York",
	"America/Chicago",
	"America/Denver",
	"America/Los_Angeles",
	"Europe/London",
	"Europe/Paris",
	"Europe/Berlin",
	"Asia/Tokyo",
	"Asia/Shanghai",
	"Asia/Kolkata",
	"Australia/Sydney",
	"Pacific/Auckland",
] as const;

export const getPopularTimezones = (): Timezone[] => {
	return POPULAR_TIMEZONES.map((id) => getTimezoneById(id)).filter(
		Boolean,
	) as Timezone[];
};
