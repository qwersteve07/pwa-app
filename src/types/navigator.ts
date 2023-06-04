interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number,
    discharingTime: number,
    level: number
}

interface NavigatorWithBattery extends Navigator {
    getBattery: () => Promise<BatteryManager>
}