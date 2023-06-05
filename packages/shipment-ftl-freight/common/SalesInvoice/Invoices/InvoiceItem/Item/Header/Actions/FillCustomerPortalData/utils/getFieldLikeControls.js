import { companyOptions } from '../../commons/utils/companyOptions';

function getFieldLikeControls({
	controls = [],
	shipmentData = {},
	setCustomerObj = () => {},
	customerObj = {},
	setValue = () => {},
}) {
	const updatedControls = controls.map((controlObj) => {
		if (controlObj.name === 'customer_organization') {
			return {
				...controlObj,
				params: {
					filters: {
						organization_id  : shipmentData?.importer_exporter_id,
						trade_party_type : ['self', 'paying_party', 'shipper'],
					},
					other_addresses_data_required           : true,
					billing_addresses_data_required         : true,
					organization_payment_mode_data_required : true,
					organization_data_required              : true,
				},
				onChange: (_, obj) => {
					setValue('customer_pan', obj?.registration_number || undefined);
					setValue('customer_gstin', undefined);
					setCustomerObj(obj);
				},
			};
		}
		if (controlObj.name === 'customer_gstin') {
			const { billing_addresses = [] } = customerObj;
			const gstOptions = billing_addresses.map((item) => ({
				label : `${item?.tax_number}/ ${item?.address}`,
				value : item?.tax_number,
				...item,
			}));

			return {
				...controlObj,
				options  : gstOptions,
				onChange : (obj) => {
					const item_customer_name = companyOptions.find((item) => item?.value
						?.toLowerCase()
						?.includes(obj?.business_name?.split(' ')?.[0]?.toLowerCase()))?.value || '';

					setValue('customer_name', item_customer_name);
					setValue('customer_address', obj?.address);
				},
			};
		}

		return controlObj;
	});

	return updatedControls;
}

export default getFieldLikeControls;
