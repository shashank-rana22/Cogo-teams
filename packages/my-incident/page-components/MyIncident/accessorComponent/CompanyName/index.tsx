import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CompanyName({ itemdata }) {
	const { data } = itemdata || {};
	const { organization } = data || {};
	const { tradePartyName } = organization || {};
	const varlength = 20;
	return (
		<div className={styles.container}>
			{tradePartyName?.length > varlength ? (
				<Tooltip interactive placement="top" content={tradePartyName}>
					<div>{`${tradePartyName.substring(0, varlength)}...`}</div>
				</Tooltip>
			) : (
				<div>{tradePartyName}</div>
			)}
		</div>
	);
}

export default CompanyName;
