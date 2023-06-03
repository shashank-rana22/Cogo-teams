import { useEffect, useState } from 'react';

import { companyOptions } from '../../commons/utils/companyOptions';

import { getFormatPrefillValues } from './getFormatPrefillValues';

const usePreFillformValues = (props = {}) => {
	const [customerObj, setCustomerObj] = useState({});
	const {
		shipment_data = {},
		invoice = {},
		setValues = () => {},
		fields = {},
	} = props;

	const { data, loading } = useGetTradePartners({ shipment_data });

	fields.customer_organization.params = {
		filters: {
			organization_id  : shipment_data?.importer_exporter_id,
			trade_party_type : ['self', 'paying_party', 'shipper'],
		},
		other_addresses_data_required           : true,
		billing_addresses_data_required         : true,
		organization_payment_mode_data_required : true,
		organization_data_required              : true,
	};

	fields.customer_organization.handleChange = (obj) => {
		setValues({
			customer_pan   : obj?.registration_number || undefined,
			customer_gstin : undefined,
		});
		setCustomerObj(obj);
	};

	const { billing_addresses = [] } = customerObj;
	const gstOptions = billing_addresses.map((item) => ({
		label : `${item?.tax_number}/ ${item?.address}`,
		value : item?.tax_number,
		...item,
	}));

	fields.customer_gstin.options = gstOptions;

	fields.customer_gstin.handleChange = (obj) => {
		const item_customer_name =			companyOptions.find((item) => item?.value
			?.toLowerCase()
			?.includes(obj?.business_name?.split(' ')?.[0]?.toLowerCase()))?.value || '';

		setValues({
			customer_name    : item_customer_name,
			customer_address : obj?.address,
		});
	};

	useEffect(() => {
		if (data) {
			const obj = getFormatPrefillValues({ data, invoice, customerObj });

			setValues(obj);
		}
	}, [JSON.stringify(data)]);

	return {
		loading,
		data,
	};
};

export default usePreFillformValues;
