import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import DroneSettings, { useDroneSettings } from "./DroneSettings";
import {
	droneCodes,
	droneEmojiMap,
	droneGlitchText,
} from "./hexcorp-discord-ai";

export default function App() {
	const settings = useDroneSettings();

	const toast = useToast();

	let droneCodesTempIndex = -1;

	return (
		<Flex p="8" flexDir={"column"}>
			<Heading mb={2}>⬡-Drone Status Codes</Heading>
			<Text>
				Find more at{" "}
				<Link href="https://hexcorp.net">https://hexcorp.net</Link>
			</Text>
			<Text mb={8}>
				Made by{" "}
				<Link href="https://makidrone.io">https://makidrone.io</Link>
			</Text>
			<DroneSettings />
			<Flex mt={8} flexDir={"column"} alignItems={"start"}>
				{droneCodes.map((text, i) => {
					if (text == null) {
						droneCodesTempIndex = -1;
						return <Box key={i} my={2} />;
					}

					droneCodesTempIndex++;

					const code = text.slice(0, 3);

					if (settings.backticks) {
						text = "`" + code + "`" + text.slice(3);
						// text = "`" + text;
					}

					let message = `${settings.droneId} :: Code ${text}`;

					if (settings.glitchPercentage > 0) {
						message = droneGlitchText(
							message,
							settings.glitchPercentage / 100,
						);
					}

					const postfixEmoji = droneEmojiMap[code];
					if (postfixEmoji != null) {
						message += postfixEmoji;
					}

					return (
						<Box
							key={i}
							background={
								droneCodesTempIndex % 2 == 0
									? "rgba(255,255,255,0.05)"
									: null
							}
							// border={"solid 2px rgba(255,255,255,0.2)"}
							border={"solid 1px #4f4754"}
							padding={"3px 6px"}
							borderRightRadius={"6px"}
							borderTopLeftRadius={
								droneCodes[i - 1] == null ? "6px" : null
							}
							borderBottomLeftRadius={
								droneCodes[i + 1] == null ? "6px" : null
							}
							mb={"-1px"}
							cursor={"pointer"}
							// fontSize={"md"}
							onClick={() => {
								navigator.clipboard.writeText(message);
								toast({
									title: "Copied status code " + code,
									// position: "top-right",
									position: "bottom-center",
									colorScheme: "brand",
									// status: 'success',
								});
							}}
						>
							<Text>{message}</Text>
						</Box>
					);
				})}
			</Flex>
		</Flex>
	);
}
