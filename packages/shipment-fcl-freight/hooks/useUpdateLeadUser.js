import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const getFormattedPayload = ({ values = {}, selectedUserId = '' }) => {
	const { name = '', email = '', mobile_number = {} } = values;

	const payload = {
		name,
		email,
		mobile_number       : mobile_number?.number,
		mobile_country_code : mobile_number?.country_code,
		id                  : selectedUserId,
	};

	return payload;
};

function useUpdateLeadUser({
	selectedUserId = '',
	setSelectedUserId = () => {},
	setShowCreatePoc = () => {},
	refetchList = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_user',
		method : 'POST',
	}, { manual: true });

	const onUpdateLeadUser = async (values) => {
		try {
			const payload = getFormattedPayload({ values, selectedUserId });

			await trigger({ data: payload });

			Toast.success('Successful');

			setSelectedUserId(null);

			setShowCreatePoc(false);

			refetchList();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		onUpdateLeadUser,
	};
}

export default useUpdateLeadUser;
