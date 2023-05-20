import { useRequest } from '@cogoport/request';

const useUpdatePricing = ({ id, setIsEditPrice }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_plan_pricing',
	}, { manual: true });

	const submitHandler = async (price) => {
		try {
			await trigger({
				data: {
					id,
					price,
				},
			});
			setIsEditPrice(false);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading, submitHandler,
	};
};

export default useUpdatePricing;
