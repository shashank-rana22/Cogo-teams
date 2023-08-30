import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getCreateRailPayload from '../helpers/getCreateRailRatePayload';
import toastApiError from '../utils/toastApiError';

const useCreateRailDomesticFreightRateFreeDay = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const user_profile = useSelector(({ profile }) => profile.user || {});

	const [{ loading }, trigger] = useRequest({
		url    : '/create_rail_domestic_freight_rate_free_day',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const payload = getCreateRailPayload({ data: val, user_profile });
			const res = await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateRailDomesticFreightRateFreeDay;
