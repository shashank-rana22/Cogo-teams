import { Button, toast, Modal, Input } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm, SelectController, InputController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext, useEffect } from 'react';

import Layout from '../../../../../Layout';
// import Layout from '../../../../commons/Layout';

import { getCurrencyControls } from './getCurrencyControls';
import styles from './styles.module.css';

function CurrencyExchangeForm({
	invoiceCurrency,
	differentCurrenciesHash,
	rateAddtionApi,
	setOpen,
	availableCurrencyConversions,
	refetch = () => {},
	open = false,
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
		control,
	} = useForm(controls);

	const { shipment_data } = useContext(ShipmentDetailContext);

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
				refetch();
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

	const controlTypeMapping = {
		select : SelectController,
		text   : InputController,
		number : InputController,
	};

	function FormElement({ name, label, type, show, ...rest }) {
		const Element = controlTypeMapping[type];

		return Element && show ? (
			<div>
				<div className={styles.label}>{label}</div>

				<Element name={name} type={type} {...rest} />

				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		) : null;
	}
console.log(differentCurrenciesHash, " :differentCurrenciesHash");
	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			size="lg"
		>
			<Modal.Header title="Modify Exchange Rate" />
			<Modal.Body className={styles.body}>
				{/* <div className={styles.label}>
					<div>From</div>
					<Input name="A3" size="md" placeholder="A3" disabled />
				</div>
				<div className={styles.label}>
					<div>To</div>
					<Input name="A3" size="md" placeholder="A3" disabled />
				</div>
				<div className={styles.label}>
					<div>Exchange rate</div>
					<Input name="A3" size="md" placeholder="A3" />
				</div> */}
				{/* <Layout controls={controls} formProps={formProps} /> */}
				<form className={styles.form_container}>
					{controls.map((item) => (
						<FormElement
							key={item.name}
							control={control}
							errors={errors}
							{...item}
						/>
					))}
				</form>
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
					disabled={rateAddtionApi?.loading || !isEmpty(error)}
					onClick={handleSubmit(handleFormSubmit, onError)}
					style={{ marginLeft: '16px' }}
				>
					Add rate
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CurrencyExchangeForm;
