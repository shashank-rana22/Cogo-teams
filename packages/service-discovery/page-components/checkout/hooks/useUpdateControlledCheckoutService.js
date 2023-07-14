import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const getPayload = ({ values, servicesApplicable }) => {
	const FINAL_PAYLOAD = [];

	Object.keys(values).forEach((item) => {
		if (['cargo_readiness_date', 'manager_approval_proof'].includes(item)) {
			return;
		}

		const data = servicesApplicable.find(
			(childItem) => `${childItem.container_size}_${childItem.commodity}` === item,
		);

		const commercial_invoice_url = values[item]?.[GLOBAL_CONSTANTS.zeroth_index]?.commercial_invoice;

		FINAL_PAYLOAD.push({
			service                : data?.service_type,
			service_id             : data?.id,
			cargo_readiness_date   : values?.cargo_readiness_date,
			cargo_value            : Number(values[item]?.[GLOBAL_CONSTANTS.zeroth_index]?.cargo_value),
			cargo_value_currency   : values[item]?.[GLOBAL_CONSTANTS.zeroth_index]?.cargo_value_currency,
			commercial_invoice_url : commercial_invoice_url.finalUrl || commercial_invoice_url,
			hs_code_id             : values[item]?.[GLOBAL_CONSTANTS.zeroth_index]?.hs_code_id,
		});
	});

	return FINAL_PAYLOAD;
};

const useUpdateControlledCheckoutService = ({
	getCheckout = () => {},
	servicesApplicable,
	setShowForm,
	setIsControlBookingDetailsFilled = () => {},
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/bulk_update_controlled_checkout_service',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		const payload = getPayload({ values, servicesApplicable });

		try {
			await trigger({
				data: { checkout_service_params: payload },
			});
			Toast.success('updated successfully');
			getCheckout();
			setShowForm(false);

			setIsControlBookingDetailsFilled(true);
		} catch (err) {
			if (err?.response) {
				Toast.error(getApiErrorString(err?.response?.data));
			}
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useUpdateControlledCheckoutService;
