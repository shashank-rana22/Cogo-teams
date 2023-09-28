import Layout from '@cogoport/air-modules/components/Layout';
import { useEffect } from 'react';

import controls from './controls';

function ChargeReceiptInformations({
	index = 0,
	control = {},
	errors = {},
	// controls = {},
	setValue = () => {},
	csr_data = {},
}) {
	useEffect(() => {
		const { ocr_data = {} } = csr_data || {};
		const { amount = 0, tax = 0, total_amount = 0, invoice_number = 0 } = ocr_data;
		setValue('price', Number(amount));
		setValue('tax_price', Number(tax));
		setValue('total_tax_price', Number(total_amount));
		setValue('csr_reference_number', Number(invoice_number));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(csr_data)]);

	console.log('control', control);

	return (
		<Layout
			fields={controls(index)}
			control={control}
			errors={errors}
		/>
	);
}
export default ChargeReceiptInformations;
