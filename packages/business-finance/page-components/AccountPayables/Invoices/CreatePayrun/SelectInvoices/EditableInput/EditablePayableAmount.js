import { Input, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMInformation, IcMLineundo } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const MIN_AMOUNT = 0;

const getFormattedAmount = ({ amount, currency }) => (
	formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 2,
		},
	})
);

function EditablePayableAmount({ itemData, field, setEditedValue }) {
	const newItem = itemData;
	const { key, fallBackKey } = field;
	const [edit, setEdit] = useState(false);
	const [value, setValue] = useState(getByKey(newItem, key));
	const {
		currency,
		payableValue,
	} = newItem;

	const maxValueCrossed = +value > +payableValue;
	const lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;

	const isError = lessValueCrossed || maxValueCrossed;

	let errorMessege = '';

	if (lessValueCrossed) {
		errorMessege = 'Payables cannot be less than 1';
	} else if (maxValueCrossed) {
		errorMessege = `${getFormattedAmount({
			amount: value,
			currency,
		})} (To Be Paid) cannot be greater than payable: ${getFormattedAmount({
			amount: payableValue,
			currency,
		})}`;
	} else {
		errorMessege = getFormattedAmount({ amount: value, currency });
	}

	const content = (
		<div className={styles.flex}>
			<div>
				{!isError && <div className={styles.text}>Actual payable value</div>}
				<div className={`${styles.message} ${isError ? styles.errormessage : ''}`}>{errorMessege}</div>
			</div>
		</div>
	);

	const handleUndo = () => {
		setEditedValue(newItem, newItem[fallBackKey], key, false);
		setValue(newItem[fallBackKey]);
		setEdit(false);
	};

	if (edit) {
		return (
			<div className={`${styles.inputcontainer} ${isError ? styles.error : ''}`}>
				<Input
					onChange={(val) => {
						setEditedValue(newItem, val, key, true);
						setValue(val);
					}}
					defaultValue={value}
					value={value}
					placeholder="Amount"
					type="number"
				/>
				<Tooltip content={content}>
					<IcMInformation
						height={14}
						width={14}
						className={`${styles.icon} ${isError ? styles.error : ''}`}
					/>
				</Tooltip>
				<IcMLineundo height={14} width={14} onClick={handleUndo} className={styles.icon} />
			</div>
		);
	}
	return (
		<div>
			{getFormattedAmount({
				amount   : value,
				currency : getByKey(newItem, field?.currencyKey),
			})}
			<span className={styles.edit}>
				{newItem?.invoiceType === 'CREDIT NOTE' ? null : (
					<IcMEdit
						height={12}
						width={12}
						className={styles.pointer}
						onClick={() => {
							setEditedValue(newItem, true, 'checked', true);
							setEdit(true);
						}}
					/>
				)}
			</span>
		</div>
	);
}

export default EditablePayableAmount;
