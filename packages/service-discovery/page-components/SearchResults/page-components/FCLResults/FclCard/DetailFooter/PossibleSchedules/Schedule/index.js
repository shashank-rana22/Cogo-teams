import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function PossibleSchedulesItem({ item = {}, isFirst = false }) {
	return (
		<div className={cl`${styles.container} ${isFirst ? styles.container_no_border : ''}`}>
			<div className={styles.section}>
				<div className={styles.label}>ETD</div>
				<div className={styles.value}>
					{formatDate({
						date       : item.departure,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.label}>ETA</div>
				<div className={styles.value}>
					{formatDate({
						date       : item.arrival,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.label}>No. of stops</div>
				<div className={cl`${styles.value} ${styles.blue}`}>
					{item.number_of_stops === DEFAULT_VALUE
						? 'Direct'
						: `${item.number_of_stops} stops`}
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.label}>
					{' '}
					Gate-in (cut off)
				</div>
				<div className={styles.value}>
					{item.gate_in_cutoff ? item.gate_in_cutoff : '-'}
				</div>
			</div>

			<div className={cl`${styles.section} ${styles.section_no_border}`}>
				<div className={styles.label}>
					{' '}
					Reliability Score
				</div>
				<div className={cl`${styles.value} ${styles.green}`}>
					{item.reliability_score ? `${item.reliability_score} %` : '-'}
					<Tooltip content="Gate-in (cut off)">
						<div>
							<IcMInfo width="16px" height="16px" fill="black" />
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default PossibleSchedulesItem;
