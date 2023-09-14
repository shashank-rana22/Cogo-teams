import { isEmpty } from '@cogoport/utils';

import scheduleFields from '../../../../configurations/schedule-fields';
import CONSTANTS from '../../../../constants/constants';

import SIDListItem from './SIDListItem';
import styles from './styles.module.css';

function SIDList({
	shipmentDetails = [],
	boxCount = '',
	truckStatus = 'truck_in',
}) {
	const { showMoreFields } = scheduleFields(truckStatus);
	const functions = {
		handleBoxCount: () => (
			<div>
				{boxCount}
			</div>
		),
		handleBoxDimensions: () => (
			<div>-</div>
		),
		handleServices: () => (
			<div>-</div>
		),
	};
	return (
		<div className={styles.sid_list_container}>
			<div className={styles.sid_list}>
				<header className={styles.header}>
					{showMoreFields.map((field) => {
						const { span = 1, label = '' } = field || {};
						return (
							<div
								className={styles.col}
								style={{ '--span': span || CONSTANTS.DEFAULT_SPAN }}
								key={field.key}
							>
								{ label }
							</div>
						);
					})}
				</header>
				{!isEmpty(shipmentDetails) && shipmentDetails.map((detail) => (
					<SIDListItem
						key={detail.warehouseTransferId}
						item={detail}
						fields={showMoreFields}
						functions={functions}
					/>
				))}
			</div>
		</div>
	);
}

export default SIDList;
