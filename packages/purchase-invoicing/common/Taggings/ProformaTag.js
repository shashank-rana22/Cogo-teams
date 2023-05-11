import { Checkbox } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import getFormattedAmount from '../helpers/formatAmount';

import styles from './styles.module.css';

export function ProformaTagCards({
	item = {},
	classname,
	showCheckBox = false,
	isChecked = false,
	activeTab,
	setSelectedProforma,
	selectedProforma,
	unCheckedData,
	isNormalTab,
}) {
	return (
		<div className={`
		${styles.proforma_tagcards_container} ${classname === 'merge' ? styles.merge : ''}`}
		>
			{showCheckBox && item?.isProforma && item?.billId && (
				<Checkbox
					checked={isChecked}
					onChange={() => {
						if (!isChecked && activeTab === 'merge' && !isNormalTab) {
							setSelectedProforma([...selectedProforma, item]);
						} else if (!isChecked) {
							setSelectedProforma([item]);
						} else {
							setSelectedProforma([...unCheckedData]);
						}
					}}
				/>
			)}
			<div
				className={`${styles.details_wrapper}`}
			>
				<div className={`${styles.flexdiv}`}>
					<div className={`${styles.proforma}`}>
						{item?.isProforma ? 'Proforma' : 'Invoice'}
						{' '}
						-
					</div>
					<span style={{ color: '#5936f0', marginTop: '-2px' }}>
						{item?.billNumber}
					</span>
				</div>
				<div className={styles.flexdiv}>
					{getFormattedAmount(
						item?.amount,
						item?.billCurrency,
					)}
					<span className={styles.padding}>
						| Line Items (
						{item?.lineItemCount}
						)
					</span>
				</div>
				<div className={`${styles.updated_at}`}>
					Uploaded At -
					{' '}
					{format(item?.createdAt, 'dd MMM yyyy', {}, true)}
				</div>
			</div>
		</div>
	);
}
