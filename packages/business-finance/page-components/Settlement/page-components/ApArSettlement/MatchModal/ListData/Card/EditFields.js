import { cl, Input, Tooltip, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMTick, IcMLineundo, IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const LEAST_VALUE_POSSIBLE = 0.01;
const LEAST_VALUE = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

function errorMsg({ new_item = {}, types = '', inputvalue = 0, originalAllocation = 0, fieldType = '' }) {
	if (fieldType === 'allocation') {
		const {
			currency = GLOBAL_CONSTANTS.currency_code.INR,
			settledAmount = 0,
			balanceAmount = 0,
		} = new_item || {};

		const amountCheck =	types === 'history' ? balanceAmount + settledAmount : +balanceAmount;

		const maxValue = +inputvalue > +amountCheck;
		const lessValue = +inputvalue <= LEAST_VALUE_POSSIBLE;

		const isError = lessValue || maxValue;

		let errorMessege = '';

		if (lessValue) {
			errorMessege = 'Allocation cannot be less than or equal to 0';
		} else if (maxValue) {
			errorMessege =			types === 'history'
				? 'Allocation cannot be greater than Balance Amount + Settled Amount'
				: 'Allocation cannot be greater than Balance Amount';
		} else {
			errorMessege =			formatAmount({
				amount  : originalAllocation,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}) || '';
		}

		const error = { isError, errorMessege };

		return error;
	}

	const {
		tds = 0,
		currency = GLOBAL_CONSTANTS.currency_code.INR,
		documentAmount = 0,
		settledTds = 0,
	} = new_item || {};

	const checkAmound = (+documentAmount * TEN_PERCENT) / HUNDERED_PERCENT;
	const maxValue = +inputvalue + settledTds > +checkAmound;
	const lessValue = Number.parseInt(inputvalue, 10) < LEAST_VALUE;
	const isError = lessValue || maxValue;
	let errorMessege = '';

	if (lessValue) {
		errorMessege = 'TDS cannot be less than 0';
	} else if (maxValue) {
		errorMessege = 'TDS plus Settled TDS cannot be greater than 10 % of  Doc. Amount';
	} else {
		errorMessege =				formatAmount({
			amount  : tds,
			currency,
			options : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 0,
			},
		}) || '';
	}
	const error = { isError, errorMessege };
	return error;
}

function RenderContent({ isError = false, errorMessege = '' }) {
	return (
		<div>
			{!isError && <div className={styles.header_msg}>Actual Allocation Value</div>}
			<div className={cl`${styles.msg} ${isError ? styles.error : ''}`}>{errorMessege}</div>
		</div>
	);
}

function EditFields({
	inputvalue = 0,
	inputSet = () => {},
	originalTDS = 0,
	originalAllocation = 0,
	doneSet = () => {},
	handleFunc = () => {},
	newItem = {},
	setNewTDS = () => {},
	setPrevTDS = () => {},
	fieldType = '',
	types = '',
}) {
	const new_item = newItem || {};

	const error = errorMsg({ new_item, types, inputvalue, originalAllocation, fieldType });

	const { isError = false, errorMessege = '' } = error || {};

	return (
		<div className={styles.flex}>
			<div className={cl`${styles.inputcontainer} ${isError ? styles.error : ''}`}>
				<Input
					type="number"
					value={inputvalue}
					onChange={(val) => inputSet(val)}
				/>
			</div>

			<Tooltip
				animation="scale"
				placement="top"
				content={<RenderContent isError={isError} errorMessege={errorMessege} />}
				maxWidth="none"
			>
				<ButtonIcon
					icon={(
						<IcMInformation
							height={14}
							width={14}
							fill={isError ? 'red' : 'black'}
						/>
					)}
				/>
			</Tooltip>

			<ButtonIcon
				icon={(
					<IcMTick
						height={14}
						width={14}
					/>
				)}
				disabled={isError}
				onClick={() => {
					doneSet(false);
					if (fieldType === 'tds') {
						new_item.tds = parseFloat(inputvalue || originalTDS);
					} else {
						new_item.allocationAmount = parseFloat(inputvalue || originalAllocation);
					}
					handleFunc();
				}}
			/>

			<ButtonIcon
				icon={(
					<IcMLineundo
						height={14}
						width={14}
					/>
				)}
				onClick={() => {
					doneSet(false);
					if (fieldType === 'tds') {
						new_item.tds = originalTDS;
						setNewTDS(originalTDS);
						setPrevTDS(originalTDS);
					} else {
						new_item.allocationAmount = originalAllocation;
					}
					handleFunc();
				}}
			/>
		</div>
	);
}

export default EditFields;
