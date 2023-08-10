import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import FieldArrayItem from '../FieldArrayItem';

import { getCurrencyControls } from './getCurrencyControls';

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
		const EXCHANGE_CURRENCY_HASH = {};
		const currencyData = value;

		Object.keys(value || {}).forEach((val) => {
			const key = `${currencyData[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.from_currency}_
			${currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.to_currency}`;
			if (currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.exchange_rate) {
				EXCHANGE_CURRENCY_HASH[key] = Number(
					currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.exchange_rate,
				);
			}
		});
		if (isEmpty(Object.keys(EXCHANGE_CURRENCY_HASH))) {
			Toast.error('Please fill atleast one field !');
		}
		handleFormSubmit(EXCHANGE_CURRENCY_HASH);
	};

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			size="lg"
			closeOnOuterClick={false}
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
