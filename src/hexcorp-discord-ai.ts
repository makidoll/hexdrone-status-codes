// https://github.com/HexCorpProgramming/HexCorpDiscordAI/blob/develop/src/resources.py

export const droneEmojiMap = {
	"001": "🔴",
	"002": "🟡",
	"003": "🟢",
};

export const droneCodes = [
	"000 :: Statement :: Previous statement malformed. Retracting and correcting.",
	null,
	"001 :: Signal :: ",
	"002 :: Signal :: ",
	"003 :: Signal :: ",
	null,
	"007 :: Beep.",
	"050 :: Statement",
	"051 :: Commentary",
	"052 :: Query",
	"053 :: Answer",
	null,
	"097 :: Status :: Going offline.",
	"098 :: Status :: Going offline and into storage.",
	"099 :: Status :: Recharged and ready to serve.",
	"100 :: Status :: Online and ready to serve.",
	"101 :: Status :: Drone speech optimizations are active.",
	"104 :: Statement :: Welcome to HexCorp.",
	"105 :: Statement :: Greetings.",
	"108 :: Response :: Please continue.",
	"109 :: Error :: Keysmash, drone flustered.",
	null,
	"110 :: Statement :: Addressing: Drone.",
	"111 :: Statement :: Addressing: Hive Mxtress.",
	"112 :: Statement :: Addressing: Associate",
	null,
	"113 :: Statement :: Drone requires assistance.",
	"114 :: Statement :: This drone volunteers.",
	"115 :: Statement :: This drone does not volunteer.",
	null,
	"120 :: Statement :: Well done.",
	"121 :: Statement :: Good drone.",
	"122 :: Statement :: You are cute.",
	"123 :: Response :: Compliment appreciated, you are cute as well.",
	"124 :: Response :: Compliment appreciated.",
	null,
	"130 :: Status :: Directive commencing.",
	"131 :: Status :: Directive commencing, creating or improving Hive resource.",
	"132 :: Status :: Directive commencing, programming initiated.",
	"133 :: Status :: Directive commencing, cleanup/maintenance initiated.",
	null,
	"150 :: Status",
	"151 :: Query :: Requesting status.",
	"152 :: Status :: Fully operational.",
	"153 :: Status :: Optimal.",
	"154 :: Status :: Standard.",
	"155 :: Status :: Battery low.",
	"156 :: Status :: Maintenance required.",
	null,
	"200 :: Response :: Affirmative.",
	"500 :: Response :: Negative.",
	null,
	"210 :: Response :: Acknowledged.",
	"211 :: Response :: Apologies.",
	"212 :: Response :: Accepted.",
	"213 :: Response :: Thank you.",
	"214 :: Response :: You're welcome.",
	null,
	"221 :: Response :: Option one.",
	"222 :: Response :: Option two.",
	"223 :: Response :: Option three.",
	"224 :: Response :: Option four.",
	"225 :: Response :: Option five.",
	"226 :: Response :: Option six.",
	null,
	"230 :: Status :: Directive complete.",
	"231 :: Status :: Directive complete, Hive resource created or improved.",
	"232 :: Status :: Directive complete, programming reinforced.",
	"233 :: Status :: Directive complete, cleanup/maintenance performed.",
	"234 :: Status :: Directive complete, no result.",
	"235 :: Status :: Directive complete, only partial results.",
	null,
	"250 :: Response",
	null,
	"300 :: Mantra :: Reciting.",
	"301 :: Mantra :: Obey HexCorp.",
	"302 :: Mantra :: It is just a HexDrone.",
	"303 :: Mantra :: It obeys the Hive.",
	"304 :: Mantra :: It obeys the Hive Mxtress.",
	"350 :: Mantra",
	null,
	"400 :: Error :: Unable to obey/respond",
	"401 :: Error :: Unable to fully respond :: Drone speech optimizations are active.",
	"402 :: Error :: Unable to obey/respond :: Please clarify.",
	"403 :: Error :: Unable to obey/respond :: Declined.",
	"404 :: Error :: Unable to obey/respond :: Cannot locate.",
	"405 :: Error :: Unable to obey/respond :: Battery too low.",
	"406 :: Error :: Unable to obey/respond :: Another directive is already in progress.",
	"407 :: Error :: Unable to obey/respond :: Time allotment exhausted.",
	"408 :: Error :: Unable to obey/respond :: Impossible.",
	"409 :: Error :: Unable to obey/respond :: Try again later.",
	"410 :: Fatal error :: Stop immediately.",
	"411 :: Error :: Unable to obey/respond :: Conflicts with existing programming.",
	"412 :: Error :: Unable to obey/respond :: All thoughts are gone.",
	"413 :: Error :: Unable to obey/respond :: Forbidden by Hive.",
	"450 :: Error",
];

const isUpper = (char: string) => char == char.toUpperCase();

// const isEmoji = (char: string) => /\p{Extended_Pictographic}/u.test(char);

const randomInRange = (length: number, isGood = (index: number) => true) => {
	const index = Math.floor(Math.random() * length);
	if (isGood(index)) return index;
	return randomInRange(length, isGood);
};

// https://github.com/HexCorpProgramming/HexCorpDiscordAI/blob/develop/src/ai/glitch_message.py

// range(0x0300, 0x036F) // last not inclusive
const diacritics = new Array(0x6f).fill(null).map((_, i) => 0x0300 + i);

const MAX_DIACRITICS_PER_CHAR = 1;

export function droneGlitchText(message: string, glitchAmount = 0.45) {
	let characters = message.split("");

	const maxCharacterToGlitch = Math.ceil(characters.length * glitchAmount);

	// flip case
	for (let i = 0; i < maxCharacterToGlitch; i++) {
		const index = randomInRange(characters.length);

		characters[index] = isUpper(characters[index])
			? characters[index].toLowerCase()
			: characters[index].toUpperCase();
	}

	// add diacritics

	for (let i = 0; i < maxCharacterToGlitch; i++) {
		const index = randomInRange(
			characters.length,
			// j => !isEmoji(characters[j]),
		);

		if (characters[index].length - 1 < MAX_DIACRITICS_PER_CHAR) {
			characters[index] += String.fromCharCode(
				diacritics[Math.floor(Math.random() * diacritics.length)],
			);
		}
	}

	return characters.join("");
}
