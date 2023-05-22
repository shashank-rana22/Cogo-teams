import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';
import TimelineItem from './TimelineItem';

const timelineData = [
	{
		name  : 'pick_up',
		title : 'Pick Up',
		type  : 'date-picker',
	},
	{
		name  : 'hand_over',
		title : 'Hand Over',
		type  : 'date-picker',
	},
	{
		name  : 'gate_in',
		title : 'Gate In',
		type  : 'date-picker',
	},
	{
		name  : 'est_departure',
		title : 'Est. Departure',
		type  : 'date-picker',
	},
	{
		name  : 'est_arrival',
		title : 'Est. Arrival',
		type  : 'date-picker',
	},
	{
		name  : 'off_loading',
		title : 'Off Loading',
		type  : 'date-picker',
	},
	{
		name  : 'rail_out',
		title : 'Rail Out(Port)',
		type  : 'date-picker',
	},
	{
		name  : 'arrived_at_icd',
		title : 'Arrived at ICD',
		type  : 'date-picker',
	},
	{
		name  : 'gate_out',
		title : 'Gate Out',
		type  : 'date-picker',
	},
	{
		name  : 'return',
		title : 'Return',
		type  : 'date-picker',
	},
];

function ShipmentTimeline({ edit = false, nav }) {
	return (
		<div className={styles.container}>
			{timelineData.map((item, index) => {
				const isLast = timelineData.length === (index + 1);

				return <TimelineItem key={uuid()} item={item} isLast={isLast} edit={edit} nav={nav} />;
			})}
		</div>
	);
}

export default ShipmentTimeline;
