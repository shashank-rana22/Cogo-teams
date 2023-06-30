import ScheduleMap from "../../../common/ScheduleMaps";

function ServiceLanesMap({ data }) {
    console.log("data:---->", data);
    return (
        <div styles={{ borderRadius: "8px" }}>
            <ScheduleMap data={data} />
        </div>
    );
}

export default ServiceLanesMap;
