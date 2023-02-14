import { Input, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function EditInput({
	itemData,
	handleCrossClick,
	setEditedValue,
	setRestEdit,
	restEdit,
	types,
}) {
	const {
		tds = 0,
		afterTdsAmount = 0,
		currency = 'INR',
		tdsEditable = false,
		documentAmount = 0,
		currentBalance = 0,
		constBalanceAmount = 0,
		nostroChangeAmount = 0,
		settledTds = 0,
	} = itemData;

	const [changedValue, setChangedValue] = useState(tds);
	const checkAmound = (+documentAmount * 10) / 100;
	const maxValue = +changedValue + settledTds > +checkAmound;
	const lessValue = Number.parseInt(changedValue, 10) < 0;
	const isError = lessValue || maxValue;
	let errorMessege = '';
	const formatted = (field, curr) => getFormattedPrice(field, curr) || '';
	const changedValueAmountAfterTDS = () => documentAmount - changedValue || afterTdsAmount;

	const changeValueBalanceAmount = () => {
		const value = types === 'history' ? +constBalanceAmount : +currentBalance;
		return value - (+changedValue + nostroChangeAmount) || value;
	};
	if (lessValue) {
		errorMessege = 'TDS cannot be less than 0';
	} else if (maxValue) {
		errorMessege = 'TDS plus Settled TDS cannot be greater than 10 % of  Doc. Amount';
	} else {
		errorMessege = formatted(tds, currency);
	}
	const content = () => (
		<div>
			{!isError && <div className={styles.text_styles}>Actual TDS Value</div>}
			<div className={styles.input_container} style={{ color: isError ? 'red' : 'black' }}>{errorMessege}</div>
		</div>
	);

	useEffect(() => {
		if (itemData) {
			setChangedValue(tds);
		}
	}, [tds, itemData]);

	const handleOnChangeTdsInput = (e) => {
		const { value } = e.target;
		setChangedValue(value);
	};

	const Submit = () => {
		setEditedValue(
			itemData,
			+changedValue,
			+changedValueAmountAfterTDS(),
			+changeValueBalanceAmount(),
		);
	};
	console.log(tdsEditable, 'tdsEditable');
	return (
		<div>
			{tdsEditable ? (
				<div className={styles.flex}>
					<Input
						style={{ borderColor: isError ? 'red' : 'black', width: 65 }}
						value={changedValue}
						onChange={handleOnChangeTdsInput}
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
					{changedValue?.length > 10 ? (
						<Tooltip
							content={(
								<div>
									{changedValue}
								</div>
							)}
							placement="top"
						>
							<div className={styles.wrapper}>{getFormattedPrice(changedValue, currency)}</div>
						</Tooltip>
					) : <div>{getFormattedPrice(changedValue, currency)}</div>}
				</div>
			)}
		</div>
	);
}
export default EditInput;
