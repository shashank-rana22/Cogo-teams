import Layout from '@cogoport/air-modules/components/Layout';
import { useEffect } from 'react';

import controls from './controls';

function ChargeReceiptInformations({
	index = 0,
	control = {},
	errors = {},
	setValue = () => {},
	csr_data = {},
}) {
	useEffect(() => {
		const { ocr_data = {} } = csr_data || {};
		const { amount = 0, tax = 0, total_amount = 0, invoice_number = 0 } = ocr_data || {};
		setValue(`price_${index}`, Number(amount));
		setValue(`tax_price_${index}`, Number(tax));
		setValue(`total_tax_price_${index}`, Number(total_amount));
		setValue(`csr_reference_number_${index}`, Number(invoice_number));
	}, [csr_data, index, setValue]);

	return (
		<Layout
			fields={controls({ index })}
			control={control}
			errors={errors}
		/>
	);
}
export default ChargeReceiptInformations;
