import { Input, Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMInformation, IcMLineundo } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const MIN_AMOUNT = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;
const geo = getGeoConstants();

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

const getErrorMessage = ({
	lessValueCrossed = false,
	maxValueCrossed = false,
	value = '',
	currency = geo.country.currency.code,
	invoiceAmount = '',
	totalTds = '',
}) => {
	if (lessValueCrossed) {
		return 'TDS cannot be less than 0';
	} if (maxValueCrossed) {
		return `${getFormattedAmount({
			amount: value,
			currency,
		})} TDS cannot be greater than 10% of invoice amount : ${getFormattedAmount({
			amount: invoiceAmount,
			currency,
		})}`;
	}
	return getFormattedAmount({ amount: totalTds, currency });
};

function Content({
	isError = true,
	lessValueCrossed = false,
	maxValueCrossed = false,
	value = '',
	currency = geo.country.currency.code,
	invoiceAmount = '',
	totalTds = '',
	tdsDeducted = '',
}) {
	return (
		<div>
			<div className={styles.flex}>
				{!isError ? <div className={styles.text}>Actual TDS:</div> : null}
				<div className={cl`${styles.message} ${isError ? styles.errormessage : ''}`}>
					{getErrorMessage({
						lessValueCrossed,
						maxValueCrossed,
						value,
						currency,
						invoiceAmount,
						totalTds,
					})}
				</div>
			</div>
			{!isError ? (
				<div className={styles.flex}>
					<div className={styles.text}>Deducted TDS:</div>
					<div className={cl`${styles.message} ${isError ? styles.errormessage : ''}`}>
						{getFormattedAmount({ amount: tdsDeducted, currency })}
					</div>
				</div>
			) : null}
		</div>
	);
}

function EditableTdsInput({ itemData = {}, field = {}, setEditedValue = () => {} }) {
	const { key = '', fallBackKey = '' } = field || {};
	const [edit, setEdit] = useState(false);
	const [value, setValue] = useState(getByKey(itemData, key));
	const {
		invoiceAmount = 0,
		currency = geo.country.currency.code,
		totalTds = 0,
		tdsDeducted = 0,
	} = itemData || {};

	const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
	const maxValueCrossed = +value + +tdsDeducted > +checkAmount;
	const lessValueCrossed = Number.parseInt(value, 10) < MIN_AMOUNT;
	const isError = lessValueCrossed || maxValueCrossed;

	const handleUndo = () => {
		setEditedValue({ itemData, value: itemData[fallBackKey], key, checked: false });
		setValue(itemData?.[fallBackKey]);
		setEdit(false);
	};

	return (edit ? (
		<div className={cl`${styles.inputcontainer} ${isError ? styles.error : ''}`}>
			<Input
				onChange={(val) => {
					setEditedValue({ itemData, value: val, key, checked: true });
					setValue(val);
				}}
				defaultValue={value}
				value={value}
				placeholder="Amount"
				type="number"
			/>
			<Tooltip content={(
				<Content
					isError={isError}
					lessValueCrossed={lessValueCrossed}
					maxValueCrossed={maxValueCrossed}
					value={value}
					currency={currency}
					invoiceAmount={invoiceAmount}
					totalTds={totalTds}
					tdsDeducted={tdsDeducted}
				/>
			)}
			>
				<IcMInformation
					height={14}
					width={14}
					className={cl`${styles.icon} ${isError ? styles.error : ''}`}
				/>
			</Tooltip>
			<IcMLineundo height={14} width={14} onClick={handleUndo} className={styles.icon} />
		</div>
	) : (
		<div>
			{getFormattedAmount({
				amount   : value,
				currency : getByKey(itemData, field?.currencyKey),
			})}
			<span className={styles.edit}>
				{itemData?.invoiceType === 'CREDIT NOTE' ? null : (
					<IcMEdit
						height={12}
						width={12}
						className={styles.pointer}
						onClick={() => {
							setEditedValue({ itemData, value: true, key: 'checked', checked: true });
							setEdit(true);
						}}
					/>
				)}
			</span>
		</div>
	));
}

export default EditableTdsInput;
