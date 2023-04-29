import { Button, Input, Tooltip } from '@cogoport/components';
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
	const handleOnChangeNostroInput = (value) => {
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
						onChange={(value) => { handleOnChangeNostroInput(value); }}
					/>
					<div
						style={{ display: 'flex', marginTop: '6px', marginLeft: '8px' }}
					>
						<Tooltip
							content={content()}
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
								handleCrossClick(itemData, 'tds');
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
									Submit();
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
