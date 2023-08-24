import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import convertMinutestoHours from '../../../../../../../../../../utils/convertMinutestoHours';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const format = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType : 'date',
});

function PossibleSchedulesItem({ item = {}, isFirst = false }) {
	const LABEL_VALUE_MAPPING = {
		etd: {
			label     : 'ETA',
			value     : format(item.departure),
			className : {},
		},
		eta: {
			label     : 'ETA',
			value     : format(item.arrival),
			className : {},
		},
		stops_count: {
			label     : 'No. of stops',
			value     : item.number_of_stops === DEFAULT_VALUE ? 'Direct' : `${item.number_of_stops} stops`,
			className : { value: 'blue' },
		},
		transit_time: {
			label : 'Transit Time',
			value : item.transit_time ? `${convertMinutestoHours(item?.transit_time || DEFAULT_VALUE)}` : '-',
		},
	};

	return (
		<div className={cl`${styles.container} ${isFirst ? styles.container_no_border : ''}`}>
			{Object.values(LABEL_VALUE_MAPPING).map((displayItem) => {
				const { label = '', value, className = {} } = displayItem;

				return (
					<div key={label} className={cl`${styles.section} ${styles[className?.section]}`}>
						<span className={cl`${styles.label} ${styles[className?.label]}`}>{label}</span>

						<div className={cl`${styles.value} ${styles[className?.value]}`}>{value}</div>
					</div>
				);
			})}
		</div>
	);
}

export default PossibleSchedulesItem;
