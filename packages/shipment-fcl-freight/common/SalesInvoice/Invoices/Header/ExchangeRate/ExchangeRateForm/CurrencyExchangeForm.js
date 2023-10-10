import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import FieldArray from '../../../../../FieldArray';
import validateExchangeRate from '../../../../helpers/validateExchangeRate';

import { getCurrencyControls } from './getCurrencyControls';

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
	const { DEFAULT_VALUES, CURRENCY_CONTROLS } = getCurrencyControls({
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
		let checkValidation = true;

		value?.currency_control?.forEach((conversions) => {
			const validationResult = validateExchangeRate({
				value    : Number(conversions?.exchange_rate),
				currency : conversions?.from_currency,
				AVAILABLE_CURRENCY_CONVERSION,
			});

			if (!validationResult) {
				checkValidation = false;
			}

			const conversion = `${conversions?.from_currency}_${conversions?.to_currency}`;
			EXCHANGE_CURRENCY_HASH[conversion] = Number(conversions?.exchange_rate);
		});

		if (isEmpty(EXCHANGE_CURRENCY_HASH)) {
			Toast.error('Please fill atleast one field !');
		}

		if (checkValidation && !isEmpty(EXCHANGE_CURRENCY_HASH)) {
			handleFormSubmit(EXCHANGE_CURRENCY_HASH);
		}
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

				{CURRENCY_CONTROLS?.map((item) => (
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
