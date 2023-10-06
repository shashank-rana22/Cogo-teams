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
		setValue(`price_${index}`, amount ? Number(amount) : null);
		setValue(`tax_price_${index}`, tax ? Number(tax) : null);
		setValue(`total_tax_price_${index}`, total_amount ? Number(total_amount) : null);
		setValue(`csr_reference_number_${index}`, invoice_number ? Number(invoice_number) : null);
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
