import ScheduleMap from '../../../common/ScheduleMaps';

function VesselScheduleMap({ data, tooltipRefArray, isTooltipVisible }) {
	return (
		<div style={{ width: '100%', borderRadius: '8px' }}>
			<ScheduleMap data={data} tooltipRefArray={tooltipRefArray} isTooltipVisible={isTooltipVisible} />
		</div>

	);
}
export default VesselScheduleMap;
