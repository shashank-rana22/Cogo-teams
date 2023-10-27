import { IcMArrowRotateDown, IcMArrowRotateUp, IcMMoney } from '@cogoport/icons-react';
import React from 'react';

import CostSheetData from './CostSheetData';
import styles from './styles.module.css';

function CostSheetCard({
	quotationsData = {},
	onTabClick = () => {},
	tab = {},
}) {
	return (
		<div className={styles.card}>
			<div
				className={styles.card_upper}
				onClick={() => onTabClick({ tabName: 'costSheetTab' })}
				role="presentation"
			>
				<div className={styles.sub_container}>
					Cost Sheet
					<IcMMoney height="20px" width="20px" />
				</div>

				<div
					className={styles.caret}
					role="presentation"
				>
					{tab.costSheetTab ? (
						<IcMArrowRotateUp height="17px" width="17px" />
					) : (
						<IcMArrowRotateDown height="17px" width="17px" />
					)}
				</div>
			</div>
			{tab.costSheetTab && <div className={styles.hr} />}
			<div className={styles.documents}>
				{tab.costSheetTab && <CostSheetData quotationsData={quotationsData} />}
				{' '}
			</div>
		</div>
	);
}

export default CostSheetCard;
