import ScheduleMap from "../../../common/ScheduleMaps";

function ServiceLanesMap() {
    return (
        <div styles={{ borderRadius: "8px" }}>
            <ScheduleMap points={[1, 2, 34]} routesLoading={false} />
        </div>
    );
}

export default ServiceLanesMap;
