import { Button, Input, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['incidentManagement']);

	const {
		tds = 0,
		afterTdsAmount = 0,
		currency = GLOBAL_CONSTANTS.currency_code.INR,
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

	const formatted = (field, curr) => formatAmount({
		amount   : field,
		currency : curr,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	}) || '';

	const changedValueAmountAfterTDS = () => documentAmount - changedValue || afterTdsAmount;

	const changeValueBalanceAmount = () => {
		const value = types === 'history' ? +constBalanceAmount : +currentBalance;
		return value - (+changedValue + nostroChangeAmount) || value;
	};

	if (lessValue) {
		errorMessege = t('incidentManagement:tds_error_message_1');
	} else if (maxValue) {
		errorMessege = t('incidentManagement:tds_error_message_2');
	} else {
		errorMessege = formatted(tds, currency);
	}

	function Content() {
		return (
			<div>
				{!isError && <div className={styles.text_styles}>{t('incidentManagement:tds_actual_value')}</div>}
				<div
					className={styles.input_container}
					style={{ color: isError ? 'red' : 'black' }}
				>
					{errorMessege}

				</div>
			</div>
		);
	}

	useEffect(() => {
		if (itemData) {
			setChangedValue(tds);
		}
	}, [tds, itemData]);

	const handleOnChangeTdsInput = (value) => {
		setChangedValue(value);
	};

	const onSubmit = () => {
		setEditedValue(
			itemData,
			+changedValue,
			+changedValueAmountAfterTDS(),
			+changeValueBalanceAmount(),
		);
	};

	return (
		<div>
			{tdsEditable ? (
				<div className={styles.flex}>
					<Input
						style={{ borderColor: isError ? 'red' : 'black', width: 65 }}
						value={changedValue}
						onChange={(value) => { handleOnChangeTdsInput(value); }}
					/>
					<div
						className={styles.tooltip}
					>
						<Tooltip
							content={Content()}
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
export default EditInput;
