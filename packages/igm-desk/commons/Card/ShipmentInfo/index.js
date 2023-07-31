import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

export default function ShipmentInfo({ item = {} }) {
	const { serial_id, shipping_line, stakeholder = {}, bl_details = {} } = item;

	const handleClick = (e) => {
		e.stopPropagation();
		window.open(
			bl_details?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url,
			'_blank',
		);
	};

	return (
		<div className={styles.container}>
			<span className={styles.serial_id}>
				Shipment ID #
				{serial_id}
			</span>
			<Tooltip
				placement="bottom"
				interactive
				content={(
					<span>
						{shipping_line?.business_name}
					</span>
				)}
			>
				<span className={styles.heading}>
					Line:
					<span
						className={cl`${styles.ellipsis_text} ${styles.pointer}`}
					>
						{shipping_line?.business_name}

					</span>
				</span>
			</Tooltip>
			<span className={styles.heading}>
				MBL No:
				<div
					className={cl`${styles.ellipsis_text}
					${styles.pointer} ${bl_details?.
						[GLOBAL_CONSTANTS.zeroth_index]?.document_url ? styles.mbl_document : ''}`}
					onClick={(val) => handleClick(val)}
					role="presentation"
				>
					{bl_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bl_number
				|| 'NA'}

				</div>
			</span>
			<span className={styles.stakeholder}>
				POC:
				{' '}
				{stakeholder?.name || 'NA'}
			</span>
			<span className={styles.stakeholder}>
				Email:
				{' '}
				{stakeholder?.email || 'NA'}
			</span>
		</div>
	);
}
