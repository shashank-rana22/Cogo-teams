import { Input, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function NostroInput({
	itemData,
	handleCrossClick,
	setRestEdit,
	restEdit,
	setEditedNostro,
	types,
}) {
	const {
		currency = 'INR',
		nostroEditable = false,
		nostroAmount = 0,
		tds = 0,
		documentAmount = 0,
		nostroChangeAmount = 0,
		currentBalance = 0,
		constBalanceAmount = 0,
	} = itemData;
	const [changedValue, setChangedValue] = useState(nostroChangeAmount);
	const maxValue = +changedValue > +documentAmount - +tds;
	const lessValue = Number.parseInt(changedValue, 10) < 0;
	const isError = lessValue || maxValue;
	let errorMessege = '';
	const formatted = (field, curr) => getFormattedPrice(field, curr) || '';
	if (lessValue) {
		errorMessege = 'Nostro cannot be less than 0';
	} else if (maxValue) {
		errorMessege = 'Nostro cannot be greater than Doc. Amount - TDS';
	} else {
		errorMessege = formatted(nostroAmount, currency);
	}
	const changeValueBalanceAmount = () => {
		const value = types === 'history' ? +constBalanceAmount : +currentBalance;
		return value - (+changedValue + tds) || value;
	};
	const content = () => (
		<div>

			<div>
				{!isError && <div className={styles.text_styles}>Actual Nostro Value</div>}
				<div
					className={styles.input_container}
					style={{ color: isError ? 'red' : 'black' }}
				>
					{errorMessege}

				</div>
			</div>
		</div>
	);
	const handleOnChangeNostroInput = (e) => {
		const { value } = e.target;
		setChangedValue(value);
	};
	const Submit = () => {
		setEditedNostro(itemData, +changedValue, +changeValueBalanceAmount());
	};
	return (
		<div>
			{' '}
			{nostroEditable ? (
				<div>
					<Input
						style={{ borderColor: isError ? 'red' : 'black', width: 65 }}
						value={changedValue}
						onChange={handleOnChangeNostroInput}
					/>
					<div
						style={{ display: 'flex', marginTop: '8px', marginLeft: '5px' }}
					>
						<Tooltip
							content={content()}
						>
							<div>
								<IcCError />
							</div>
						</Tooltip>
						<IcMUndo
							onClick={() => {
								handleCrossClick(itemData, 'tds');
								setRestEdit(!restEdit);
							}}
						/>
						{!isError && (
							<IcMTick
								onClick={() => {
									Submit();
									setRestEdit(!restEdit);
								}}
							/>
						)}
					</div>
				</div>
			) : (
				<div>
					{nostroChangeAmount?.length > 10 ? (
						<Tooltip
							content={(
								<div>
									{nostroChangeAmount}
								</div>
							)}
							placement="top"
						>
							<div className={styles.wrapper}>{getFormattedPrice(nostroChangeAmount, currency)}</div>
						</Tooltip>
					) : <div>{getFormattedPrice(nostroChangeAmount, currency)}</div>}
				</div>

			)}
		</div>
	);
}
export default NostroInput;
