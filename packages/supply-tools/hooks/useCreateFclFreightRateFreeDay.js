import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateFclRatePayload from '../helpers/getCreateFclRatePayload';

const useCreateFclFreightRateFreeDay = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_freight_rate_free_day',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const payload = getCreateFclRatePayload({ data: val });
			const res = await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
			return res;
		} catch (err) {
			console.error(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateFclFreightRateFreeDay;
