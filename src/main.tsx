import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// TODO: flashes on load, maybe ssr related

if (globalThis.localStorage != null) {
	globalThis.localStorage.setItem("chakra-ui-color-mode", "dark");
}

const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
	components: {
		// Heading: {
		// 	baseStyle: {
		// 		// letterSpacing: "-0.05em",
		// 		fontWeight: "400",
		// 	},
		// },
		Link: {
			baseStyle: {
				color: "brand.500",
				_hover: {
					textDecoration: "none",
				},
			},
		},
	},
	colors: {
		// material design pink
		// brand: {
		// 	50: "#fce4ec",
		// 	100: "#f8bbd0",
		// 	200: "#f48fb1",
		// 	300: "#f06292",
		// 	400: "#ec407a",
		// 	500: "#e91e63",
		// 	600: "#d81b60",
		// 	700: "#c2185b",
		// 	800: "#ad1457",
		// 	900: "#880e4f",
		// 	// a100: "#ff80ab",
		// 	// a200: "#ff4081",
		// 	// a400: "#f50057",
		// 	// a700: "#c51162",
		// },
		brand: {
			50: "#d891e8",
			100: "#d891e8",
			200: "#d891e8",
			300: "#d891e8",
			400: "#d891e8",
			500: "#d891e8",
			600: "#d891e8",
			700: "#d891e8",
			800: "#d891e8",
			900: "#d891e8",
		},
		// brand: {
		// 	50: "#ff64ff",
		// 	100: "#ff64ff",
		// 	200: "#ff64ff",
		// 	300: "#ff64ff",
		// 	400: "#ff64ff",
		// 	500: "#ff64ff",
		// 	600: "#ff64ff",
		// 	700: "#ff64ff",
		// 	800: "#ff64ff",
		// 	900: "#ff64ff",
		// },
		tomorrow: "#1d1f21",
		hexcorp: "#ff64ff",
		hexcorpDark: "#231929",
		justKindaDark: "#0f0f0f",
	},
	styles: {
		global: {
			body: {
				bg: "hexcorpDark",
				color: "white",
			},
		},
	},
	fonts: {
		heading: `"Inter", sans-serif`,
		body: `"Inter", sans-serif`,
	},
});

const roolEl = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(roolEl).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
