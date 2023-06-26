import { useRouter } from "@cogoport/next";
import BackButton from "./BackButtom";
import ShippingDetails from "./ShippmentDetails";

function MapTab() {
    const { query } = useRouter();
    console.log("query: ", query);
    return (
        <>
            <BackButton />
            <ShippingDetails />
        </>
    );
}

export default MapTab;
