import { cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import styles from './styles.module.css';

const DOC_STATUS_MAPPING = {
	hold: 'On Hold',
};
const STATUS_COLOR_MAPPING = {
	eligible  : 'green',
	requested : 'yellow',
};

export default function DocumentHoldDetails() {
	const { document_delay_status = '', documents = [], primary_service = {} } = useContext(ShipmentDetailContext);

	if (!document_delay_status) {
		return null;
	}

	const status = DOC_STATUS_MAPPING[document_delay_status] || startCase(document_delay_status);

	const remarksAccessKey = primary_service?.trade_type === 'export' ? 'bl_remarks' : 'remarks';

	const holdReasons = (documents || []).flatMap((doc) => doc?.[remarksAccessKey] || []);

	const mostRecentHoldReason = (holdReasons || []).reduce(
		(a, b) => (a?.created_at > b?.created_at ? a : b),
		{},
	);

	return (
		<div className={cl`${styles.container} ${styles[STATUS_COLOR_MAPPING[document_delay_status]]}`}>
			<IcMError className={styles.error_icon} />

			<div>
				<h2 className={styles.heading}>
					{`Your ${primary_service?.trade_type === 'export' ? 'BL' : 'DO'} Document is ${status}`}
				</h2>

				<h4>
					Reason:
					{' '}
					{startCase(mostRecentHoldReason?.comment || '')}
				</h4>
			</div>
		</div>
	);
}
