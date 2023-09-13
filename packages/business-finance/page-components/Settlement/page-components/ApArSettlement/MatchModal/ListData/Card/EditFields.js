import { cl, Input, Tooltip, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick, IcMLineundo, IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import { getFormatAmount } from '../../../../../utils/getFormatAmount';

import styles from './styles.module.css';

const LEAST_VALUE_POSSIBLE = 0.01;
const LEAST_VALUE = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

function errorMsg({
	new_item = {}, types = '', inputvalue = 0,
	originalAllocation = 0, fieldType = '', originalTDS = 0,
}) {
	if (fieldType === 'allocation') {
		const {
			currency = GLOBAL_CONSTANTS.currency_code.INR,
			settledAmount = 0,
			balanceAmount = 0,
		} = new_item || {};

		const amountCheck = types === 'history'
			? (balanceAmount || LEAST_VALUE) + (settledAmount || LEAST_VALUE) : +balanceAmount || LEAST_VALUE;
		const maxValue = (+inputvalue || LEAST_VALUE) > amountCheck;
		const lessValue = (+inputvalue || LEAST_VALUE) <= LEAST_VALUE_POSSIBLE;

		const isError = lessValue || maxValue;

		let errorMessege = '';

		if (lessValue) {
			errorMessege = 'Allocation cannot be less than or equal to 0';
		} else if (maxValue) {
			errorMessege =			types === 'history'
				? 'Allocation cannot be greater than Balance Amount + Settled Amount'
				: 'Allocation cannot be greater than Balance Amount';
		} else {
			errorMessege =	getFormatAmount(originalAllocation, currency) || '';
		}

		const error = { isError, errorMessege };

		return error;
	}

	const {
		currency = GLOBAL_CONSTANTS.currency_code.INR,
		documentAmount = 0,
		settledTds = 0,
	} = new_item || {};

	const checkAmound = ((+documentAmount || LEAST_VALUE) * TEN_PERCENT) / HUNDERED_PERCENT;
	const maxValue = (+inputvalue || LEAST_VALUE) + (settledTds || LEAST_VALUE) > checkAmound;
	const lessValue = Number.parseInt(inputvalue || LEAST_VALUE, 10) < LEAST_VALUE;
	const isError = lessValue || maxValue;
	let errorMessege = '';

	if (lessValue) {
		errorMessege = 'TDS cannot be less than 0';
	} else if (maxValue) {
		errorMessege = 'TDS plus Settled TDS cannot be greater than 10 % of  Doc. Amount';
	} else {
		errorMessege =	getFormatAmount(originalTDS, currency) || '';
	}
	const error = { isError, errorMessege };
	return error;
}

function RenderContent({ isError = false, errorMessege = '', fieldType = '' }) {
	return (
		<div>
			{
			(!isError && fieldType === 'allocation')
				? <div className={styles.header_msg}>Actual Allocation Value</div>
				: <div className={styles.header_msg}>Actual Tds Value</div>
		}
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

	const error = errorMsg({ new_item, types, inputvalue, originalAllocation, fieldType, originalTDS });

	const { isError = false, errorMessege = '' } = error || {};

	return (
		<div className={styles.flex}>
			<div className={cl`${styles.inputcontainer} ${isError ? styles.error : ''}`}>
				<Input
					type="number"
					value={inputvalue}
					onChange={(val) => inputSet(val)}
					placeholder={`${fieldType}`}
				/>
			</div>

			<Tooltip
				animation="scale"
				placement="top"
				content={<RenderContent isError={isError} errorMessege={errorMessege} fieldType={fieldType} />}
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
