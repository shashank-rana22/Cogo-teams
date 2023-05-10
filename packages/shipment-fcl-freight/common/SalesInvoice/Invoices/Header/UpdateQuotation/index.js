import { Button } from '@cogoport/components';
import React from 'react';

// import useUpdateContractQuotation from '../../../../../hooks/useUpdateContractQuotation';

function UpdateQuotation({ shipment_data = {}, refetch = () => {} }) {
	// const { loading, updateContractQuotation } = useUpdateContractQuotation({
	// 	shipment_id: shipment_data?.id,
	// 	refetch,
	// });

	let showUpdateQuotationButton = false;

	if (
		shipment_data?.shipment_type === 'ltl_freight'
		&& ['shipment_bulk_operation', 'contract'].includes(shipment_data?.source)
	) {
		showUpdateQuotationButton = true;
	}

	return showUpdateQuotationButton ? (
		<div style={{ marginTop: '10px' }}>
			<Button
				className="secondary sm"
				// disabled={loading}
				// onClick={() => updateContractQuotation()}
			>
				Refetch Contract Rates
			</Button>
		</div>
	) : null;
}

export default UpdateQuotation;
