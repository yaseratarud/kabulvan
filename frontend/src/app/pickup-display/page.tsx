import type { Metadata } from "next";
import PickupBoard from "./pickup-board";

export const metadata: Metadata = {
    title: "Order pickup",
    robots: { index: false, follow: false },
};

export default function PickupPage() {
    return <PickupBoard />;
}
