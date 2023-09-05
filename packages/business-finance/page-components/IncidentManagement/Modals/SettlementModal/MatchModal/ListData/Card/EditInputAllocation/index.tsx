import { Button, Tooltip, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function Content({ isError, errorMessege, t }) {
	return (
		<div>
			{!isError && (
				<div className={styles.text_styles}>
					{t('incidentManagement:actual_allocation_value')}
				</div>
			)}
			<div
				className={styles.input_container}
				style={{ color: isError ? 'red' : 'black' }}
			>
				{errorMessege}

			</div>
		</div>
	);
}
function EditInputAllocation({
	itemData,
	handleCrossClick,
	setAllocationValue,
	setRestEdit,
	restEdit,
	types,
}) {
	const {
		currency = GLOBAL_CONSTANTS.currency_code.INR,
		settledAmount = 0,
		allocationAmountValue = 0,
		balanceAmount = 0,
		allocationEditable = false,
	} = itemData;

	const { t } = useTranslation(['incidentManagement']);

	const [changedValue, setChangedValue] = useState(allocationAmountValue || 0);

	const amountCheck = types === 'history' ? balanceAmount + settledAmount : +balanceAmount;

	const maxValue = +changedValue > +amountCheck;

	const lessValue = Number.parseInt(changedValue, 10) < 0;

	const isError = lessValue || maxValue;

	let errorMessege = '';

	const getFormattedAmount = (field, curr) => formatAmount({
		amount   :	field,
		currency : curr,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	}) || '';

	const changedBalanceAfterAllocation = () => {
		const totalAmount =			types === 'history' ? balanceAmount + settledAmount : +balanceAmount;
		return totalAmount - changedValue || 0;
	};

	if (lessValue) {
		errorMessege = t('incidentManagement:allocation_error_message_1');
	} else if (maxValue) {
		errorMessege =			types === 'history'
			? t('incidentManagement:allocation_error_message_2')
			: t('incidentManagement:allocation_error_message_3');
	} else {
		errorMessege = getFormattedAmount(allocationAmountValue, currency);
	}

	useEffect(() => {
		if (itemData) {
			setChangedValue(allocationAmountValue);
		}
	}, [itemData, allocationAmountValue]);

	const handleOnChangeTdsInput = (value) => {
		setChangedValue(value);
	};

	const onSubmit = () => {
		setAllocationValue(
			itemData,
			+changedValue,
			+changedBalanceAfterAllocation(),
			false,
		);
	};
	return (
		<div>
			{allocationEditable ? (
				<div className={styles.flex}>
					<Input
						style={{ borderColor: isError ? 'red' : 'black', width: 65 }}
						value={changedValue}
						onChange={(value) => { handleOnChangeTdsInput(value); }}
					/>
					<div
						style={{ display: 'flex', marginTop: '6px', marginLeft: '8px' }}
					>
						<Tooltip
							content={<Content isError={isError} errorMessege={errorMessege} t={t} />}
						>
							<Button
								className={styles.edit_icon}
							>
								<IcCError
									width="15px"
									height="15px"
								/>
							</Button>
						</Tooltip>

						<Button
							className={styles.edit_icon}
							onClick={() => {
								handleCrossClick(itemData, 'allocation');
								setRestEdit(!restEdit);
							}}
						>
							<IcMUndo
								width="15px"
								height="15px"
							/>
						</Button>

						{!isError && (
							<Button
								className={styles.edit_icon}
								onClick={() => {
									onSubmit();
									setRestEdit(!restEdit);
								}}
							>
								<IcMTick
									width="20px"
									height="20px"
								/>
							</Button>
						)}
					</div>
				</div>
			) : (
				<div>
					{changedValue?.length > 10 ? (
						<Tooltip
							content={(
								<div>
									{changedValue}
								</div>
							)}
							placement="top"
						>
							<div className={styles.wrapper}>
								{formatAmount({
									amount  :	changedValue,
									currency,
									options : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}

							</div>
						</Tooltip>
					) : (
						<div>
							{formatAmount({
								amount  :	changedValue,
								currency,
								options : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
export default EditInputAllocation;
