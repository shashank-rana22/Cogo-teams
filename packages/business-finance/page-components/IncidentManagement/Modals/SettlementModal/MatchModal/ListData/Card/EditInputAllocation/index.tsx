import { Button, Tooltip, Input } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function EditInputAllocation({
	itemData,
	handleCrossClick,
	setAllocationValue,
	setRestEdit,
	restEdit,
	types,
}) {
	const {
		currency = 'INR',
		settledAmount = 0,
		allocationAmountValue = 0,
		balanceAmount = 0,
		allocationEditable = false,
	} = itemData;

	const [changedValue, setChangedValue] = useState(allocationAmountValue || 0);

	const amountCheck = types === 'history' ? balanceAmount + settledAmount : +balanceAmount;

	const maxValue = +changedValue > +amountCheck;

	const lessValue = Number.parseInt(changedValue, 10) < 0;

	const isError = lessValue || maxValue;

	let errorMessege = '';

	const formatted = (field, curr) => getFormattedPrice(field, curr) || '';

	const changedBalanceAfterAllocation = () => {
		const totalAmount =			types === 'history' ? balanceAmount + settledAmount : +balanceAmount;
		return totalAmount - changedValue || 0;
	};

	if (lessValue) {
		errorMessege = 'Allocation cannot be less than 0';
	} else if (maxValue) {
		errorMessege =			types === 'history'
			? 'Allocation cannot be greater than Balance Amount + Settled Amount'
			: 'Allocation cannot be greater than Balance Amount';
	} else {
		errorMessege = formatted(allocationAmountValue, currency);
	}

	const content = () => (
		<div>
			{!isError && <div className={styles.text_styles}>Actual Allocation Value</div>}
			<div className={styles.input_container} style={{ color: isError ? 'red' : 'black' }}>{errorMessege}</div>
		</div>
	);

	useEffect(() => {
		if (itemData) {
			setChangedValue(allocationAmountValue);
		}
	}, [itemData, allocationAmountValue]);

	const handleOnChangeTdsInput = (value) => {
		setChangedValue(value);
	};

	const Submit = () => {
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
export default EditInputAllocation;
