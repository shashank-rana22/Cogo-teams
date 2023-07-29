import ScheduleMap from '../../../common/ScheduleMaps';

function ServiceLanesMap({ data }) {
	return (
		<div style={{ width: '100%', borderRadius: '8px' }}>
			<ScheduleMap data={data} />
		</div>
	);
}

export default ServiceLanesMap;
