import {
	Box,
	Button,
	HStack,
	Icon,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	VStack,
} from "@chakra-ui/react";
import {
	FaBatteryThreeQuarters,
	FaCode,
	FaComment,
	FaHashtag,
} from "react-icons/fa6";
import { useDroneSettings } from "../store/DroneSettingsStore";
import { DroneBattery } from "../utils/hexcorp-discord-ai";
import SlimPromptInput from "./SlimPromptInput";

export default function DroneSettings() {
	const settings = useDroneSettings();

	return (
		<VStack spacing={3} align={"start"}>
			<HStack spacing={4} align={"start"}>
				<SlimPromptInput
					name={"ID"}
					icon={FaHashtag}
					width={"80px"}
					type={"text"}
					value={settings.droneId}
					onChange={e => {
						settings.setDroneId(e.target.value);
					}}
				/>
				<SlimPromptInput
					name={"Backticks"}
					icon={FaCode}
					type={"switch"}
					value={settings.backticks}
					onChange={e => {
						settings.setBackticks(e.target.checked);
					}}
				/>
				<InputGroup size={"sm"}>
					<InputLeftAddon borderLeftRadius={"6px"}>
						<Icon mr={2} as={FaBatteryThreeQuarters} />
						{"Battery"}
					</InputLeftAddon>
					<HStack borderWidth={1} borderRight={"none"} spacing={0}>
						<Button
							size={"sm"}
							my={"-1px"}
							borderRadius={0}
							fontWeight={400}
							borderRight={"solid 1px rgba(255,255,255,0.2)"}
							onClick={() =>
								settings.setBatteryPercentage(DroneBattery.Low)
							}
							isDisabled={
								settings.batteryPercentage == DroneBattery.Low
							}
						>
							Low
						</Button>
						<Button
							size={"sm"}
							my={"-1px"}
							borderRadius={0}
							fontWeight={400}
							borderRight={"solid 1px rgba(255,255,255,0.2)"}
							onClick={() =>
								settings.setBatteryPercentage(DroneBattery.Mid)
							}
							isDisabled={
								settings.batteryPercentage == DroneBattery.Mid
							}
						>
							Mid
						</Button>
						<Button
							size={"sm"}
							my={"-1px"}
							borderRadius={0}
							fontWeight={400}
							borderRight={"solid 1px rgba(255,255,255,0.2)"}
							onClick={() =>
								settings.setBatteryPercentage(DroneBattery.Full)
							}
							isDisabled={
								settings.batteryPercentage == DroneBattery.Full
							}
						>
							Full
						</Button>
					</HStack>
					<Box borderWidth={1} display={"flex"} flexDir={"row"}>
						<Slider
							w={100}
							min={0}
							max={100}
							step={1}
							// mt={2}
							mx={4}
							colorScheme="brand"
							value={settings.batteryPercentage}
							defaultValue={settings.batteryPercentage}
							onChange={e => settings.setBatteryPercentage(e)}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
					</Box>
					<InputRightAddon borderRightRadius={"6px"}>
						{settings.batteryPercentage}%
					</InputRightAddon>
				</InputGroup>
			</HStack>
			<HStack spacing={4} align={"start"}>
				<SlimPromptInput
					name={"Message"}
					icon={FaComment}
					width={"450px"}
					type={"text"}
					value={settings.message}
					onChange={e => {
						settings.setMessage(e.target.value);
					}}
					showClear
					isClear={settings.message == ""}
					onClear={() => {
						settings.setMessage("");
					}}
				/>
			</HStack>
		</VStack>
	);
}
