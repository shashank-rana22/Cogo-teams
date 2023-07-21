function formatContainerValues({ val = [] }) {
	const UPDATE_DATA = (val?.container_details || []).map((item) => {
		const {
			id,
			container_number = '',
			consignment_number = '',
			consignment_date = '',
			commercial_invoice_number = '',
			packages_count = '',
			gated_in_at = '',
			gated_out_at = '',
			vessel_arrived_at = '',
			vessel_departed_at = '',
			picked_up_at = '',
			empty_container_returned_at = '',
			ewb_validity = '',
			eway_bill_number = '',
		} = item;

		return ({
			id,
			data: {
				container_number,
				consignment_number          : consignment_number || undefined,
				consignment_date            : consignment_date || undefined,
				commercial_invoice_number   : commercial_invoice_number || undefined,
				packages_count              : packages_count || undefined,
				gated_in_at                 : gated_in_at || undefined,
				gated_out_at                : gated_out_at || undefined,
				vessel_arrived_at           : vessel_arrived_at || undefined,
				vessel_departed_at          : vessel_departed_at || undefined,
				picked_up_at                : picked_up_at || undefined,
				empty_container_returned_at : empty_container_returned_at || undefined,
				ewb_validity                : ewb_validity || undefined,
				eway_bill_number            : eway_bill_number || undefined,
			},
		});
	});
	return UPDATE_DATA;
}
export default formatContainerValues;
