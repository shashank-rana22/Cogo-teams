import dynamic from "next/dynamic";

const ServiceLaneMaps = dynamic(() => import("../../../common/ScheduleMaps"), {
    ssr: false,
});

function