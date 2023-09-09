import {
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Input,
	VStack,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import { Field, Form, Formik, FormikProps } from "formik";
import { MutableRefObject } from "react";
import { BsBarChartSteps } from "react-icons/bs";
import { FaBalanceScaleLeft, FaSeedling } from "react-icons/fa";
import { MdCloud } from "react-icons/md";
import {
	TbArrowsHorizontal,
	TbArrowsRandom,
	TbArrowsVertical,
} from "react-icons/tb";
import { Consts } from "../consts";
import { Prompt, Sampler } from "../interfaces/Prompt";
import { Result } from "../interfaces/Result";
import SlimPromptInput from "./SlimPromptInput";

export default function PromptInput(props: {
	promptFormRef?: MutableRefObject<FormikProps<Prompt>>;
	onPrompt?: (prompt: Prompt) => any;
	resultForDisplay?: Result;
	width?: string;
}) {
	const validatePrompt = (value: string) => {
		if ((value ?? "").trim() == "") return "Can't be empty!";
	};

	return (
		<Formik
			initialValues={Consts.promptDefaults}
			initialErrors={{ prompt: "Can't be empty!" }}
			onSubmit={props.onPrompt}
			innerRef={props.promptFormRef}
		>
			{form => {
				const { isValid, isSubmitting } = form;
				return (
					<Form style={{ width: props.width }}>
						<VStack flexGrow="1">
							<Field name="prompt" validate={validatePrompt}>
								{({ field }) => (
									<Input
										{...field}
										placeholder="Squirrel scientists in the high energy nut research laboratory"
										size="lg"
										disabled={isSubmitting}
									/>
								)}
							</Field>
							<Flex w="100%" flexDirection={"row"}>
								<Flex flexDirection={"column"}>
									<HStack mb={2}>
										<Field name="seed">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Seed"}
													min={-1}
													max={Number.MAX_VALUE}
													default={
														Consts.promptDefaults
															.seed
													}
													icon={FaSeedling}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={250}
												/>
											)}
										</Field>
										<Field name="inferenceSteps">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Inf. Steps"}
													min={1}
													max={150}
													step={1}
													default={
														Consts.promptDefaults
															.inferenceSteps
													}
													icon={BsBarChartSteps}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={90}
													tooltip="50 works best, but 150 for highest detail"
													type="slider"
												/>
											)}
										</Field>
										<Field name="guidanceScale">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Cfg Scale"}
													min={0}
													max={20}
													step={0.5}
													default={
														Consts.promptDefaults
															.guidanceScale
													}
													icon={FaBalanceScaleLeft}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={90}
													tooltip="How similar it'll be to your prompt, higher is closer"
													type="slider"
												/>
											)}
										</Field>
									</HStack>
									<HStack>
										<Field name="width">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Width"}
													min={256}
													max={768}
													step={128}
													default={
														Consts.promptDefaults
															.width
													}
													icon={TbArrowsHorizontal}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={90}
													type="slider"
													prefix={"px"}
												/>
											)}
										</Field>
										<Field name="height">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Height"}
													min={256}
													max={768}
													step={128}
													default={
														Consts.promptDefaults
															.height
													}
													icon={TbArrowsVertical}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={90}
													type="slider"
													prefix={"px"}
												/>
											)}
										</Field>
										<Field name="sampler">
											{({ field, form }) => (
												<SlimPromptInput
													name={"Sampler"}
													default={
														Consts.promptDefaults
															.sampler
													}
													icon={TbArrowsRandom}
													field={field}
													form={form}
													disabled={isSubmitting}
													width={110}
													type="dropdown"
													values={Object.values(
														Sampler,
													)}
												/>
											)}
										</Field>
									</HStack>
								</Flex>
								<Box flexGrow={1}></Box>
								{props.resultForDisplay ? (
									<Box pr={2}>
										<Badge colorScheme={"pink"}>
											{formatRelative(
												new Date(
													props.resultForDisplay.created,
												),
												new Date(),
											)}
										</Badge>
									</Box>
								) : null}
								<Button
									leftIcon={<MdCloud />}
									colorScheme="pink"
									size="md"
									type="submit"
									loadingText="Dreaming"
									isLoading={isSubmitting}
									disabled={!isValid || isSubmitting}
								>
									Dream
								</Button>
							</Flex>
						</VStack>
					</Form>
				);
			}}
		</Formik>
	);
}
