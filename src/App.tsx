import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { useBreakpointValue, useToast } from "@chakra-ui/react";
import { useDroneSettings } from "./store/DroneSettingsStore";
import DroneSettings from "./ui/DroneSettings";
import {
	droneCodes,
	droneEmojiMap,
	droneGlitchText,
} from "./utils/hexcorp-discord-ai";

export default function App() {
	const settings = useDroneSettings();
	const toast = useToast();
	const breakpoint = useBreakpointValue([0, 1, 2]);

	let droneCodesTempIndex = -1;

	return (
		<>
			<Box
				// w={"100vw"}
				p={3}
				boxShadow={"2xl"}
				borderBottom={"solid 1px"}
				borderColor={"whiteAlpha.200"}
				position={"fixed"}
				zIndex={999}
				top={0}
				left={0}
				right={0}
				backgroundColor={"hexcorpDark"}
			>
				<DroneSettings />
			</Box>
			<Flex p="8" mt={breakpoint < 2 ? 150 : 100} flexDir={"column"}>
				<Heading mb={2}>⬡-Drone Status Codes</Heading>
				<Text>
					Find more at{" "}
					<Link href="https://hexcorp.net">https://hexcorp.net</Link>
				</Text>
				<Text mb={2}>
					Made by{" "}
					<Link href="https://makidrone.io">
						https://makidrone.io
					</Link>
				</Text>

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

						if (settings.batteryPercentage < 100) {
							message = droneGlitchText(
								message,
								settings.batteryPercentage,
							);
						}

						const postfixEmoji = droneEmojiMap[code];
						if (postfixEmoji != null) {
							message += postfixEmoji;
						}

						if (settings.message) {
							message += " :: " + settings.message;
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
		</>
	);
}
