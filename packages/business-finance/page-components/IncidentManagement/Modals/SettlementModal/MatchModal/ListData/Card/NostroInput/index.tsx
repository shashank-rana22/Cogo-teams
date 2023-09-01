import { Button, Input, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError, IcMTick, IcMUndo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['incidentManagement']);
	const {
		currency = GLOBAL_CONSTANTS.currency_code.INR,
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

	const formatted = (field, curr) => formatAmount({
		amount   :	field,
		currency : curr,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	}) || '';

	if (lessValue) {
		errorMessege = t('incidentManagement:error_message_nostro_1');
	} else if (maxValue) {
		errorMessege = t('incidentManagement:error_message_nostro_2');
	} else {
		errorMessege = formatted(nostroAmount, currency);
	}
	const changeValueBalanceAmount = () => {
		const value = types === 'history' ? +constBalanceAmount : +currentBalance;
		return value - (+changedValue + tds) || value;
	};
	function Content() {
		return (
			<div>

				<div>
					{!isError && (
						<div className={styles.text_styles}>
							{t('incidentManagement:actual_nostro_value')}
						</div>
					)}
					<div
						className={styles.input_container}
						style={{ color: isError ? 'red' : 'black' }}
					>
						{errorMessege}

					</div>
				</div>
			</div>
		);
	}
	const handleOnChangeNostroInput = (value) => {
		setChangedValue(value);
	};
	const submit = () => {
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
									submit();
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
							<div className={styles.wrapper}>
								{formatAmount({
									amount  :	nostroChangeAmount,
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
								amount  :	nostroChangeAmount,
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
export default NostroInput;
