import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, shipping_line, stakeholder = {}, bl_details = {} } = item;

	return (
		<div className={styles.container}>
			<div className={styles.serial_id}>
				Shipment ID #
				{serial_id}
			</div>
			<Tooltip
				placement="bottom"
				interactive
				content={(
					<div>
						{shipping_line?.business_name}
					</div>
				)}
			>
				<div className={styles.heading}>
					Line:
					<div className={cl`${styles.ellipsis_text} ${styles.pointer}`}>{shipping_line?.business_name}</div>
				</div>
			</Tooltip>
			<div className={styles.heading}>
				MBL No:
				<div
					className={cl`${styles.ellipsis_text}
					${styles.pointer} ${bl_details?.
						[GLOBAL_CONSTANTS.zeroth_index]?.document_url ? styles.mbl_document : ''}`}
					onClick={() => window.open(
						bl_details?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url,
						'_blank',
					)}
					role="presentation"
				>
					{bl_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bl_number
				|| 'NA'}

				</div>
			</div>
			<div className={styles.stakeholder}>
				POC:
				{' '}
				{stakeholder?.name || 'NA'}
			</div>
		</div>
	);
}
