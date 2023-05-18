import { Button, toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext, useEffect } from 'react';

// import Layout from '../../../../commons/Layout';

import { getCurrencyControls } from './getCurrencyControls';
import styles from './styles.module.css';

function CurrencyExchangeForm({
	invoiceCurrency,
	differentCurrenciesHash,
	rateAddtionApi,
	setOpen,
	availableCurrencyConversions,
	BfInvoiceRefetch = () => {},
}) {
	const [error, setError] = useState({});

	const currentCurrencyConversions = {};

	Object.keys(differentCurrenciesHash || {}).forEach((currency) => {
		currentCurrencyConversions[`currency_control_${currency}`] =			availableCurrencyConversions[currency];
	});

	const controls = getCurrencyControls({
		invoiceCurrency,
		differentCurrenciesHash,
		availableCurrencyConversions,
	});

	const {
		fields,
		handleSubmit,
		watch,
		setError: setErrorForm,
		formState: { errors },
		clearErrors,
	} = useForm(controls);

	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data } = contextValues || {};

	const handleFormSubmit = async (value) => {
		const exchangeCurrencyHash = {};
		const currencyData = value;

		Object.keys(value || {}).forEach((val) => {
			const key = `${currencyData[val]?.[0]?.from_currency}_${currencyData?.[val]?.[0]?.to_currency}`;
			if (currencyData?.[val]?.[0]?.exchange_rate) {
				exchangeCurrencyHash[key] = Number(
					currencyData?.[val]?.[0]?.exchange_rate,
				);
			}
		});

		if (Object.keys(exchangeCurrencyHash).length === 0) {
			toast.error('Please fill atleast one field !');
			return;
		}

		const body = {
			shipment_id                      : shipment_data.id,
			updated_currency_conversion_rate : exchangeCurrencyHash,
		};

		try {
			const res = await rateAddtionApi.trigger({ data: body });
			if (!res?.hasError) {
				toast.success('Rate Added Successfully!');
				BfInvoiceRefetch();
				setOpen(false);
			} else {
				toast.error(res?.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const modifiedConversions = watch();

	const onError = (err) => {
		setError(err);
	};

	useEffect(() => {
		setError(errors);
	}, [JSON.stringify(errors)]);

	useEffect(() => {
		Object.keys(currentCurrencyConversions).forEach((key) => {
			const initialConverion = currentCurrencyConversions[key];
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
	}, [JSON.stringify(modifiedConversions)]);

	return (
		<div className={styles.exchange_rate_form}>
			<div className={styles.form}>
				<div className={styles.exchange_rate_type}>Modify Exchange Rate</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{/* <Layout controls={controls} fields={fields} errors={error} /> */}
				</div>
			</div>

			<div className={styles.buttons}>
				<Button
					onClick={() => setOpen(false)}
					disabled={rateAddtionApi?.loading}
					className="secondary md"
				>
					Cancel
				</Button>

				<Button
					disabled={rateAddtionApi?.loading || !isEmpty(error)}
					onClick={handleSubmit(handleFormSubmit, onError)}
					style={{ marginLeft: '16px' }}
				>
					Add rate
				</Button>
			</div>
		</div>
	);
}

export default CurrencyExchangeForm;
