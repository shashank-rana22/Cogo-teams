import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateFclFreightRateFreeDay = ({
	successMessage = 'Updated Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_rate_free_day',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

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

export default useUpdateFclFreightRateFreeDay;
