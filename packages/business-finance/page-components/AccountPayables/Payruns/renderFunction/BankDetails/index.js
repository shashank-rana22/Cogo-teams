import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import RenderTooltip from '../../../../commons/RenderTooltip';

import styles from './styles.module.css';

const SHOW_TOOLTIP_MAX_LENGTH = 16;
function BankDetails({ itemData = {} }) {
	const { bankDetail } = itemData;
	const {
		account_number = '-',
		beneficiary_name = '-',
		ifsc_code = '-',
	} = bankDetail?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div>
			<div className={styles.text}>
				<RenderTooltip content={beneficiary_name} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
			</div>
			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>A/C No: </div>
					<RenderTooltip content={account_number} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>IFSC: </div>
					<RenderTooltip content={ifsc_code} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
