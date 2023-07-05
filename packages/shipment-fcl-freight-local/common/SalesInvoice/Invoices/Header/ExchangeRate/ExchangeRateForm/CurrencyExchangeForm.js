import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import FieldArrayItem from '../FieldArrayItem';

import { getCurrencyControls } from './getCurrencyControls';

function CurrencyExchangeForm({
	invoiceCurrency = '',
	DIFFERENT_CURRENCIES_HASH = {},
	setOpen = () => {},
	AVAILABLE_CURRENCY_CONVERSION = {},
	open = false,
	handleFormSubmit = () => {},
	loading = false,
}) {
	const { controls, defaultValues } = getCurrencyControls({
		invoiceCurrency,
		DIFFERENT_CURRENCIES_HASH,
		AVAILABLE_CURRENCY_CONVERSION,
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ defaultValues });

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
