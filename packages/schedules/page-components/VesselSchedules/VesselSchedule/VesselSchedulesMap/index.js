import ScheduleMap from '../../../common/ScheduleMaps';

function VesselScheduleMap({ data }) {
	return (
		<div styles={{ borderRadius: '8px' }}>
			<ScheduleMap data={data} />
		</div>
	);
}
export default VesselScheduleMap;
