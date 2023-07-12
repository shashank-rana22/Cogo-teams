import ScheduleMap from '../../../common/ScheduleMaps';

function VesselScheduleMap({ data }) {
	return (
		<div style={{ borderRadius: '8px' }}>
			<ScheduleMap data={data} />
		</div>
	);
}
export default VesselScheduleMap;
