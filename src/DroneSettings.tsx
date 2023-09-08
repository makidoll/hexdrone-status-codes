import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
	Center,
	HStack,
	IconButton,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/switch";
import React from "react";
import {
	FaBatteryEmpty,
	FaBatteryFull,
	FaBatteryHalf,
	FaCode,
	FaHashtag,
} from "react-icons/fa6";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(num, min), max);

const someGlitchPercentage = 45;

export const useDroneSettings = create(
	persist(
		(set, get) => ({
			droneId: "0001",
			backticks: true,
			glitchPercentage: 0,
			setDroneId: (droneId: string) => {
				if (droneId.length > 4)
					return set({ droneId: droneId.slice(0, 4) });

				if (/[^0-9]/g.test(droneId)) return;

				set({ droneId });
			},
			setBackticks: (backticks: boolean) => set({ backticks }),
			setGlitchPercentage: (p: number) =>
				set({ glitchPercentage: Math.floor(clamp(p, 0, 100)) }),
		}),
		{
			name: "drone-codes",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default function DroneSettings() {
	const settings = useDroneSettings();

	const noGlitchPercentageRef = React.useRef<HTMLButtonElement>();
	const someGlitchPercentageRef = React.useRef<HTMLButtonElement>();

	// const labelWidth = "100px";
	const iconSize = 16;

	return (
		<VStack spacing={2} align={"start"}>
			<FormControl>
				<HStack spacing={4}>
					<Center>
						<FaHashtag size={iconSize} />
					</Center>
					<FormLabel
						htmlFor="drone-id"
						textAlign={"left"}
						// w={labelWidth}
						m={0}
					>
						Drone ID
					</FormLabel>
					<Input
						id="drone-id"
						name="droneId"
						variant="filled"
						size="sm"
						fontSize={"1rem"}
						w={"120px"}
						borderRadius={8}
						value={settings.droneId}
						onChange={e => {
							settings.setDroneId(e.target.value);
						}}
					/>
				</HStack>
			</FormControl>
			<FormControl>
				<HStack spacing={4}>
					<Center>
						<FaCode size={iconSize} />
					</Center>
					<FormLabel
						htmlFor="backticks"
						textAlign={"left"}
						// w={labelWidth}
						m={0}
					>
						Backticks
					</FormLabel>
					<Switch
						id="backticks"
						name="backticks"
						size="md"
						borderRadius={8}
						colorScheme={"brand"}
						checked={settings.backticks}
						defaultChecked={settings.backticks}
						onChange={e => {
							settings.setBackticks(e.target.checked);
						}}
					/>
				</HStack>
			</FormControl>
			<FormControl>
				<HStack spacing={4}>
					<Center>
						<FaBatteryHalf size={iconSize} />
					</Center>
					<FormLabel
						htmlFor="glitchyness"
						textAlign={"left"}
						// w={labelWidth}
						m={0}
					>
						Glitchyness
					</FormLabel>
					<Slider
						id="glitchyness"
						defaultValue={30}
						w={"120px"}
						mx={1}
						value={settings.glitchPercentage}
						onChange={e => {
							noGlitchPercentageRef.current.isDisabled = e == 0;
							someGlitchPercentageRef.current.isDisabled =
								e == someGlitchPercentage;
							settings.setGlitchPercentage(e);
						}}
					>
						<SliderTrack>
							<SliderFilledTrack bg="brand.500" />
						</SliderTrack>
						<SliderThumb></SliderThumb>
					</Slider>
					<Text>{Math.floor(settings.glitchPercentage)}%</Text>
					<IconButton
						ref={noGlitchPercentageRef}
						size={"xs"}
						icon={<FaBatteryEmpty />}
						isDisabled={settings.glitchPercentage == 0}
						onClick={() => {
							settings.setGlitchPercentage(0);
						}}
					/>
					<IconButton
						ref={someGlitchPercentageRef}
						size={"xs"}
						icon={<FaBatteryFull />}
						ml={-2}
						isDisabled={
							settings.glitchPercentage == someGlitchPercentage
						}
						onClick={() => {
							settings.setGlitchPercentage(someGlitchPercentage);
						}}
					/>
				</HStack>
			</FormControl>
		</VStack>
	);
}
