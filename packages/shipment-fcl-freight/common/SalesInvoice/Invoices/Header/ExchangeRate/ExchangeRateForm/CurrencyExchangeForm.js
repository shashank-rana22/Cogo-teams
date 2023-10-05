import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import FieldArray from '../../../../../FieldArray';

import { getCurrencyControls, CONTROLS } from './getCurrencyControls';

const EXCHANGE_CURRENCY_HASH = {};

function CurrencyExchangeForm({
	invoiceCurrency = '',
	DIFFERENT_CURRENCIES_HASH = {},
	setOpen = () => {},
	AVAILABLE_CURRENCY_CONVERSION = {},
	open = false,
	handleFormSubmit = () => {},
	loading = false,
}) {
	const { DEFAULT_VALUES } = getCurrencyControls({
		invoiceCurrency,
		DIFFERENT_CURRENCIES_HASH,
		AVAILABLE_CURRENCY_CONVERSION,
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			currency_control: DEFAULT_VALUES,
		},
	});

	const handleAddRate = async (value) => {
		const currencyData = value;

		Object.keys(value || {}).forEach((val) => {
			const key = `${currencyData[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.from_currency}`
			+ `_${currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.to_currency}`;
			if (currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.exchange_rate) {
				EXCHANGE_CURRENCY_HASH[key] = Number(
					currencyData?.[val]?.[GLOBAL_CONSTANTS.zeroth_index]?.exchange_rate,
				);
			}
		});
		if (Object.keys(EXCHANGE_CURRENCY_HASH).length === GLOBAL_CONSTANTS.zeroth_index) {
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

				{CONTROLS?.map((item) => (
					<FieldArray
						key={item.name}
						control={control}
						errors={errors?.[item.name]}
						{...item}
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
