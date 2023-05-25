import { Button, Toast, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm, InputController } from '@cogoport/forms';
import React, { useContext, useEffect } from 'react';

import { getCurrencyControls } from './getCurrencyControls';
import styles from './styles.module.css';

function CurrencyExchangeForm({
	invoiceCurrency = '',
	differentCurrenciesHash = {},
	rateAddtionApi = () => {},
	setOpen = () => {},
	availableCurrencyConversions = {},
	refetch = () => {},
	open = false,
}) {
	// console.log({ differentCurrenciesHash, availableCurrencyConversions });

	const currentCurrencyConversions = {};

	Object.keys(differentCurrenciesHash || {}).forEach((currency) => {
		currentCurrencyConversions[`currency_control_${currency}`] = availableCurrencyConversions[currency];
	});

	const controls = getCurrencyControls({
		invoiceCurrency,
		differentCurrenciesHash,
		availableCurrencyConversions,
	});

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm();

	const modifiedConversions = watch();

	const { shipment_data } = useContext(ShipmentDetailContext);

	const handleFormSubmit = async (value) => {
		const exchangeCurrencyHash = {};
		const currencyData = value;
		const key = `${currencyData?.from_currency}_${currencyData?.to_currency}`;
		if (currencyData?.exchange_rate) {
			exchangeCurrencyHash[key] = Number(
				currencyData?.exchange_rate,
			);
		}

		if (Object.keys(exchangeCurrencyHash).length === 0) {
			Toast.error('Please fill atleast one field !');
			return;
		}

		const body = {
			shipment_id                      : shipment_data.id,
			updated_currency_conversion_rate : exchangeCurrencyHash,
		};

		try {
			await rateAddtionApi({ data: body });
			Toast.success('Rate Added Successfully!');
			refetch();
			setOpen(false);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(controls, ' :controls');
	useEffect(() => {
		Object.keys(currentCurrencyConversions).forEach((key) => {
			const initialConverion = currentCurrencyConversions?.[key];
			const newConversion = Number(modifiedConversions?.exchange_rate);
			const ten_percent_initial = initialConverion * 0.1;
			const ten_less = initialConverion - ten_percent_initial;
			const ten_more = initialConverion + ten_percent_initial;
			// console.log({
			// 	currentCurrencyConversions,
			// 	initialConverion,
			// 	newConversion,
			// 	ten_percent_initial,
			// 	ten_less,
			// 	ten_more,
			// });

			if (newConversion < ten_less) {
				Toast.error(`Exchange rate can not be less than ${ten_less}`);
			}
			if (newConversion > ten_more) {
				Toast.error(`Exchange rate can not be more than ${ten_more}`);
			}
			if (newConversion > ten_less && newConversion < ten_more) {
				Toast.error(`${key}.0.exchange_rate`);
			}
		});
	}, [JSON.stringify(modifiedConversions)]);

	function FormElement({ name, label, type, ...rest }) {
		return (
			<div className={styles.form}>
				<div className={styles.label}>{label}</div>
				<InputController name={name} type={type} {...rest} />
				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		);
	}

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			size="lg"
			closeOnOuterClick={false}

		>
			<Modal.Header title="Modify Exchange Rate" />
			<Modal.Body>
				{controls.map((field) => (
					<div className={styles.form_container} key={field.name}>
						{field?.controls?.map((item) => (
							<FormElement
								key={item.name}
								control={control}
								errors={errors}
								{...item}
							/>
						))}
					</div>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => setOpen(false)}
					disabled={rateAddtionApi?.loading}
					size="md"
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button
					// disabled={rateAddtionApi?.loading || !isEmpty(error)}
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
