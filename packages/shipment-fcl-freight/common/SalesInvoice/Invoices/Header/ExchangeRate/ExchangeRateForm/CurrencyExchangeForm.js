import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

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
	const { controls, defaultValues } = getCurrencyControls({
		invoiceCurrency,
		differentCurrenciesHash,
		availableCurrencyConversions,
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ defaultValues });

	const handleAddRate = async (value) => {
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
			Toast.error('Please fill atleast one field !');
		}
		handleFormSubmit(exchangeCurrencyHash);
	};

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
					onClick={handleSubmit(handleAddRate)}
					style={{ marginLeft: '16px' }}
				>
					Add rate
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CurrencyExchangeForm;
