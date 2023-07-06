import { Input, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMInformation, IcMLineundo } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

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

function EditableTdsInput({ itemData, field, setEditedValue }) {
	const newItem = itemData;
	const { key, fallBackKey } = field;
	const [edit, setEdit] = useState(false);
	const [value, setValue] = useState(getByKey(newItem, key));
	const {
		invoiceAmount = 0,
		currency,
		totalTds = 0,
		tdsDeducted = 0,
	} = newItem;

	const checkAmount = (+invoiceAmount * 10) / 100;
	const maxValueCrossed = +value + +tdsDeducted > +checkAmount;
	const lessValueCrossed = Number.parseInt(value, 10) < 0;
	const isError = lessValueCrossed || maxValueCrossed;

	let errorMessege = '';

	if (lessValueCrossed) {
		errorMessege = 'TDS cannot be less than 0';
	} else if (maxValueCrossed) {
		errorMessege = `${getFormattedAmount({
			amount: value,
			currency,
		})} TDS cannot be greater than 10% of invoice amount : ${getFormattedAmount({
			amount: invoiceAmount,
			currency,
		})}`;
	} else {
		errorMessege = getFormattedAmount({ amount: totalTds, currency });
	}

	const content = (
		<div>
			<div className={styles.flex}>
				{!isError && <div className={styles.text}>Actual TDS:</div>}
				<div className={`${styles.message} ${isError ? styles.errormessage : ''}`}>{errorMessege}</div>
			</div>
			{!isError && (
				<div className={styles.flex}>
					<div className={styles.text}>Deducted TDS:</div>
					<div className={`${styles.message} ${isError ? styles.errormessage : ''}`}>
						{getFormattedAmount({ amount: tdsDeducted, currency })}
					</div>
				</div>
			)}
		</div>
	);

	const handleUndo = () => {
		setEditedValue(newItem, newItem[fallBackKey], key, false);
		setValue(newItem[fallBackKey]);
		setEdit(false);
	};

	return (edit ? (
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
	) : (
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
	));
}

export default EditableTdsInput;
