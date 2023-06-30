import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const SHOW_TOOLTIP_MAX_LENGTH = 16;
const STARTING_SUBSTRING_LENGTH = 0;
function BankDetails({ itemData }) {
	const { bankDetail } = itemData || {};
	const renderTooltip = (content, maxLength) => {
		if (content?.length > maxLength) {
			return (
				<Tooltip interactive placement="top" content={content} maxWidth={500}>
					<div className={styles.value}>
						{`${content.substring(STARTING_SUBSTRING_LENGTH, maxLength)}...`}
					</div>
				</Tooltip>
			);
		}
		return content;
	};
	const {
		account_number = '-',
		beneficiary_name = '-',
		ifsc_code = '-',
	} = bankDetail?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div>
			<div className={styles.text}>{renderTooltip(beneficiary_name, SHOW_TOOLTIP_MAX_LENGTH)}</div>
			<div>
				<div className={styles.sub_container}>
					<div className={styles.label}>A/C No: </div>
					{renderTooltip(account_number, SHOW_TOOLTIP_MAX_LENGTH)}
				</div>
				<div className={styles.sub_container}>
					<div className={styles.label}>IFSC: </div>
					{renderTooltip(ifsc_code, SHOW_TOOLTIP_MAX_LENGTH)}
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
