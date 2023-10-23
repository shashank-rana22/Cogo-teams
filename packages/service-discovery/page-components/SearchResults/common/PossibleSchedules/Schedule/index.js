import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';

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
			label     : 'ETD',
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
		cut_off: {
			label     : 'Gate-in (cut off)',
			value     : item.gate_in_cutoff ? item.gate_in_cutoff : '-',
			className : {},
		},
		reliability_score: {
			label : 'Reliability Score',
			value : (
				<div className={styles.reliability_score_value}>
					{item.reliability_score ? `${item.reliability_score} %` : '-'}
					<Tooltip content="Gate-in (cut off)">
						<IcMInfo width="16px" height="16px" fill="black" className={styles.more_icon} />
					</Tooltip>
				</div>
			),
			className: {
				section : 'section_no_border',
				value   : 'green',
			},
		},
	};

	return (
		<div className={cl`${styles.container} ${isFirst ? styles.container_no_border : ''}`}>
			{Object.entries(LABEL_VALUE_MAPPING).map(([key, displayItem]) => {
				const { label = '', value, className = {} } = displayItem;

				return (
					<div key={key} className={cl`${styles.section} ${styles[className?.section]} ${styles[key]}`}>
						<span className={cl`${styles.label} ${styles[className?.label]}`}>{label}</span>

						<div className={cl`${styles.value} ${styles[className?.value]}`}>{value}</div>
					</div>
				);
			})}
		</div>
	);
}

export default PossibleSchedulesItem;
