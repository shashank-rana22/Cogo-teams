import { cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import styles from './styles.module.css';

const docStatusMapping = {
	hold: 'On Hold',
};
const colorMapping = {
	eligible  : 'green',
	requested : 'yellow',
};

export default function DocumentHoldDetails() {
	const { document_delay_status = '', documents = [], shiment_data = {} } = useContext(ShipmentDetailContext);

	if (!document_delay_status) {
		return null;
	}

	const status = docStatusMapping[document_delay_status] || startCase(document_delay_status);

	const remarksAccessKey = shiment_data?.tradeType === 'export' ? 'bl_remarks' : 'remarks';

	const holdReasons = (documents || []).flatMap((doc) => doc?.[remarksAccessKey] || []);

	const mostRecentHoldReason = (holdReasons || []).reduce(
		(a, b) => (a?.created_at > b?.created_at ? a : b),
		{},
	);

	return (
		<div className={cl`${styles.container} ${styles[colorMapping[document_delay_status]]}`}>
			<IcMError className={styles.error_icon} />

			<div>
				<h2 className={styles.heading}>
					{`Your ${shiment_data?.tradeType === 'export' ? 'BL' : 'DO'} Document is ${status}`}
				</h2>

				<h4>
					Reason:&nbsp;
					{startCase(mostRecentHoldReason?.comment || '')}
				</h4>
			</div>
		</div>
	);
}
