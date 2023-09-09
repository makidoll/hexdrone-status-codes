import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DroneBattery, makiClamp } from "../utils/hexcorp-discord-ai";

interface DroneSettings {
	droneId: string;
	backticks: boolean;
	batteryPercentage: number;
	message: string;
	setDroneId: (to: string) => void;
	setBackticks: (to: boolean) => void;
	setBatteryPercentage: (to: number) => void;
	setMessage: (to: string) => void;
}

export const useDroneSettings = create<DroneSettings>()(
	persist(
		(set, get) => ({
			droneId: "0001",
			backticks: true,
			batteryPercentage: DroneBattery.Full,
			message: "",
			setDroneId: (droneId: string) => {
				if (droneId.length > 4)
					return set({ droneId: droneId.slice(0, 4) });

				if (/[^0-9]/g.test(droneId)) return;

				set({ droneId });
			},
			setBackticks: (backticks: boolean) => set({ backticks }),
			setBatteryPercentage: (p: number) =>
				set({ batteryPercentage: Math.floor(makiClamp(0, 100, p)) }),
			setMessage: (message: string) => set({ message }),
		}),
		{
			name: "drone-codes",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
