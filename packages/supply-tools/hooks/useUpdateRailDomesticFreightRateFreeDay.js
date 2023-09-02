import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getUpdateRailRatePayload from '../helpers/getUpdateRailRatePayload';
import toastApiError from '../utils/toastApiError';

const useUpdateRailDomesticFreightRateFreeDay = ({
	successMessage = 'Updated Successfully!',
	refetch = () => {},
}) => {
	const user_profile = useSelector(({ profile }) => profile.user || {});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_rail_domestic_freight_rate_free_day',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ data, item, callBack = () => {} }) => {
		try {
			const payload = getUpdateRailRatePayload({ data, item, user_profile });
			const res = await trigger({ data: payload });

			refetch();

			callBack(res);

			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateRailDomesticFreightRateFreeDay;
