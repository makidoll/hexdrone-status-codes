import {
	Box,
	Button,
	Flex,
	Icon,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Switch,
	Tooltip,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

// taken from
// https://github.com/makidrone/stable-diffusion-ui
// https://github.com/makidrone/stable-diffusion-ui/blob/main/frontend/src/ui/SlimPromptInput.tsx

// TODO: lower opacity of text when disabled
// TODO: when select text like FormControl htmlFor or something idk

export default function SlimPromptInput<T>(props: {
	name: string;
	// min?: number;
	// max?: number;
	// default?: any;
	icon: IconType;
	// disabled?: boolean;
	width?: number | string;
	tooltip?: string;
	// step?: number;
	// prefix?: string;
	type?: "text" | "switch";
	// values?: string[];
	showClear?: boolean;
	isClear?: boolean;
	value?: any;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClear?: () => any;
}) {
	const size = "sm";
	const borderRadius = "6px";

	let slimPromptInput = <></>;

	if (props.type == "text") {
		slimPromptInput = (
			<InputGroup size={size}>
				<InputLeftAddon borderLeftRadius={borderRadius}>
					<Icon mr={2} as={props.icon} />
					{props.name}
				</InputLeftAddon>
				<Input
					width={props.width ?? 250}
					size={size}
					// disabled={props.disabled}
					value={props.value}
					onChange={props.onChange}
					borderRightRadius={props.showClear ? 0 : borderRadius}
				/>
				{props.showClear ? (
					<Button
						// colorScheme={""}
						size={size}
						background={"whiteAlpha.300"}
						onClick={props.onClear}
						isDisabled={props.isClear}
						borderLeftRadius={0}
						borderRightRadius={borderRadius}
						fontWeight={400}
					>
						Clear
					</Button>
				) : (
					<></>
				)}
			</InputGroup>
		);
	} else if (props.type == "switch") {
		slimPromptInput = (
			<InputGroup size={size}>
				<InputLeftAddon borderLeftRadius={borderRadius}>
					<Icon mr={2} as={props.icon} />
					{props.name}
				</InputLeftAddon>
				<Box borderWidth={1} px={3} borderRightRadius={borderRadius}>
					{/* <Checkbox
						size={"md"}
						mt={"7px"}
						checked={props.value}
						defaultChecked={props.value}
						onChange={props.onChange}
						colorScheme={"brand"}
					/> */}
					<Switch
						size={"md"}
						mt={"3px"}
						checked={props.value}
						defaultChecked={props.value}
						onChange={props.onChange}
						colorScheme={"brand"}
					/>
				</Box>
			</InputGroup>
		);
	}

	const slimPromptInputWithResetOutline = (
		// <Box
		// 	boxShadow={
		// 		props.showReset
		// 			? "0 0 0 1px var(--chakra-colors-brand-200)"
		// 			: null
		// 	}
		// 	borderRadius={4}
		// >
		// 	<Flex flexDirection={"row"}>{slimPromptInput}</Flex>;
		// </Box>
		<Flex flexDirection={"row"}>{slimPromptInput}</Flex>
	);

	return props.tooltip ? (
		<Tooltip label={props.tooltip}>
			{slimPromptInputWithResetOutline}
		</Tooltip>
	) : (
		slimPromptInputWithResetOutline
	);
}
