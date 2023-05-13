import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import getFormattedAmount from '../helpers/formatAmount';

import styles from './styles.module.css';

export function ProformaTagCards({
	item = {},
	classname = null,
	showCheckBox = false,
	isChecked = false,
	activeTab = null,
	setSelectedProforma = () => {},
	selectedProforma = [],
	unCheckedData = [],
	isNormalTab = false,
}) {
	const checkboxshow = showCheckBox && item?.isProforma && item?.billId;

	const setProformas = () => {
		if (!isChecked && activeTab === 'merge' && !isNormalTab) {
			setSelectedProforma([...selectedProforma, item]);
		} else if (!isChecked) {
			setSelectedProforma([item]);
		} else {
			setSelectedProforma([...unCheckedData]);
		}
	};
	return (
		<div className={`
		${styles.proforma_tagcards_container} ${classname === 'merge' ? styles.merge : ''}`}
		>
			{checkboxshow ? (
				<Checkbox
					checked={isChecked}
					onChange={setProformas}
				/>
			) : null}
			<div
				className={`${styles.details_wrapper}`}
			>
				<div className={`${styles.flexdiv}`}>
					<div className={`${styles.proforma}`}>
						{item?.isProforma ? 'Proforma' : 'Invoice'}
						{' '}
						-
					</div>
					<span className={styles.billnum}>
						{item?.billNumber || ''}
					</span>
				</div>
				<div className={styles.flexdiv}>
					{getFormattedAmount(
						item?.amount,
						item?.billCurrency,
					)}
					<span className={styles.padding}>
						| Line Items (
						{item?.lineItemCount || 0}
						)
					</span>
				</div>
				<div className={`${styles.updated_at}`}>
					Uploaded At -
					{' '}
					{formatDate({
						date       : item?.createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}
