import { Input, Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMInformation, IcMLineundo } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const MIN_AMOUNT = 0;

const getFormattedAmount = ({ amount = '', currency = '' }) => (
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

function EditablePayableAmount({ itemData = {}, field = {}, setEditedValue = () => {} }) {
	const { key = '', fallBackKey = '' } = field || {};
	const [edit, setEdit] = useState(false);
	const [value, setValue] = useState(getByKey(itemData, key));
	const geo = getGeoConstants();

	const {
		currency = geo.country.currency.code,
		payableAmount = 0,
		invoiceType = '',
	} = itemData || {};

	useEffect(() => {
		setValue(itemData?.inputAmount);
	}, [itemData?.inputAmount]);

	const maxValueCrossed = +value > +payableAmount;
	const lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;
	const isError = lessValueCrossed || maxValueCrossed;

	const getErrorMessage = () => {
		if (lessValueCrossed) {
			return 'Payables cannot be less than 1';
		} if (maxValueCrossed) {
			return `${getFormattedAmount({
				amount: value,
				currency,
			})} (To Be Paid) cannot be greater than payable: ${getFormattedAmount({
				amount: payableAmount,
				currency,
			})}`;
		}
		return getFormattedAmount({ amount: value, currency });
	};

	function ToolTipContent() {
		return (
			<div className={styles.flex}>
				{!isError && <div className={styles.text}>Actual payable value</div>}
				<div className={cl`${styles.message} ${isError
					? styles.errormessage : ''}`}
				>
					{getErrorMessage()}

				</div>
			</div>
		);
	}

	const handleUndo = () => {
		setEditedValue({ itemData, value: itemData[fallBackKey], key, checked: false });
		setValue(itemData[fallBackKey]);
		setEdit(false);
	};

	const handleEditClick = () => {
		setEditedValue({ itemData, value: true, key: 'checked', checked: true });
		setEdit(true);
	};

	return (
		<div>
			{edit ? (
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
					<Tooltip content={<ToolTipContent />}>
						<IcMInformation
							height={14}
							width={14}
							className={cl`${styles.icon} ${isError ? styles.error : ''}`}
						/>
					</Tooltip>
					<IcMLineundo height={14} width={14} onClick={handleUndo} className={styles.icon} />
				</div>
			) : (
				<>
					{getFormattedAmount({
						amount   : getByKey(itemData, key),
						currency : getByKey(itemData, field?.currencyKey),
					})}
					<span className={styles.edit}>
						{invoiceType !== 'CREDIT NOTE' && (
							<IcMEdit
								height={12}
								width={12}
								className={styles.pointer}
								onClick={handleEditClick}
							/>
						)}
					</span>
				</>
			) }
		</div>
	);
}

export default EditablePayableAmount;
