import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const getFormattedPayload = ({ values = {}, leadsData = {} }) => {
	const { new_name, new_email, new_mobile_number } = values;

	const payload = {
		name                 : new_name,
		email                : new_email,
		mobile_number        : new_mobile_number?.number,
		mobile_country_code  : new_mobile_number?.country_code,
		lead_organization_id : leadsData?.id,
	};

	return payload;
};

function useCreateLeadUser({
	leadsData = {},
	refetchList = () => { },
	setShowCreatePoc = () => { },
	setSelectedUserId = () => { },
	reset = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_user',
		method : 'POST',
	}, { manual: true });

	const onCreateLeadUser = async (values) => {
		try {
			const payload = getFormattedPayload({ values, leadsData });

			await trigger({ data: payload });

			Toast.success('Successful');

			setShowCreatePoc(false);

			setSelectedUserId(null);

			reset();

			refetchList();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createLoading: loading,
		onCreateLeadUser,
	};
}

export default useCreateLeadUser;
