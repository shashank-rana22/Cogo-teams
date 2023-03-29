import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useCreateOrganizationBillingAddress = ({
	id, tradePartyId, gstNumber = '', setShowComponent = () => {},
	refetch,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'POST',
	}, { manual: true });

	const {
		handleSubmit,
		control,
		register,
		setValue,
		formState: { errors },
	} = useForm();

	const onSubmit = (values) => {
		const payload = {
			...values,
			organization_id             : id,
			organization_trade_party_id : tradePartyId,
			tax_number                  : gstNumber,
		};

		try {
			const res = trigger({ params: payload });
			if (res.status === 200) {
				setShowComponent('view_billing_addresses');
				Toast.success('Billing address created successfully');
				refetch();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		loading,
		handleSubmit,
		control,
		register,
		setValue,
		errors,
		onSubmit,
	};
};

export default useCreateOrganizationBillingAddress;
