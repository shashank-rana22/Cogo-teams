import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback, useMemo } from 'react';

import FieldArrayItem from '../FieldArrayItem';

import { getCurrencyControls } from './getCurrencyControls';
import styles from './styles.module.css';

function CurrencyExchangeForm({
	invoiceCurrency = '',
	differentCurrenciesHash = {},
	setOpen = () => {},
	availableCurrencyConversions = {},
	open = false,
	handleFormSubmit = () => {},
	loading = false,
}) {
	const getCurrentCurrencyConversions = useCallback(() => {
		const currentCurrencyConversions = {};

		Object.keys(differentCurrenciesHash || {}).forEach((currency) => {
			currentCurrencyConversions[`currency_control_${currency}`] = availableCurrencyConversions[currency];
		});

		return currentCurrencyConversions;
	}, [availableCurrencyConversions, differentCurrenciesHash]);

	const currentCurrencyConversions = useMemo(() => getCurrentCurrencyConversions(
		differentCurrenciesHash,
		availableCurrencyConversions,
	), [availableCurrencyConversions, differentCurrenciesHash, getCurrentCurrencyConversions]);

	const { controls, defaultValues } = getCurrencyControls({
		invoiceCurrency,
		differentCurrenciesHash,
		availableCurrencyConversions,
	});

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
		setError: setErrorForm,
		clearErrors,
	} = useForm({ defaultValues });

	const modifiedConversions = watch();

	useEffect(() => {
		Object.keys(currentCurrencyConversions).forEach((key) => {
			const initialConverion = currentCurrencyConversions?.[key];
			const newConversion = Number(modifiedConversions[key][0].exchange_rate);
			const ten_percent_initial = initialConverion * 0.1;
			const ten_less = initialConverion - ten_percent_initial;
			const ten_more = initialConverion + ten_percent_initial;

			if (newConversion < ten_less) {
				setErrorForm(`${key}.0.exchange_rate`, {
					type    : 'min',
					message : `Exchange rate can not be less then ${ten_less}`,
				});
			}
			if (newConversion > ten_more) {
				setErrorForm(`${key}.0.exchange_rate`, {
					type    : 'max',
					message : `Exchange rate can not be more then ${ten_more}`,
				});
			}
			if (newConversion > ten_less && newConversion < ten_more) {
				clearErrors(`${key}.0.exchange_rate`);
			}
		});
	}, [clearErrors, JSON.stringify(currentCurrencyConversions), JSON.stringify(modifiedConversions), setErrorForm]);

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			size="lg"
			closeOnOuterClick={false}
			className={styles.modal}

		>
			<Modal.Header title="Modify Exchange Rate" />
			<Modal.Body>
				{controls.map((ctrl) => (
					<FieldArrayItem
						key={ctrl.name}
						control={control}
						controls={ctrl}
						errors={errors?.[ctrl.name]}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => setOpen(false)}
					disabled={loading}
					size="md"
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button
					disabled={loading || !isEmpty(errors)}
					onClick={handleSubmit(handleFormSubmit)}
					style={{ marginLeft: '16px' }}
				>
					Add rate
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CurrencyExchangeForm;
