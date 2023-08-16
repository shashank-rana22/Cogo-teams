import { useRequest } from '@cogoport/request';

const useCreateRDWeightages = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_revenue_desk_weightages',
		method : 'POST',
	}, { manual: true });

	const createRDWeightages = async () => {
		try {
			const resp = await trigger({
				data: {},
			});
			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	return { createRDWeightages, loading };
};

export default useCreateRDWeightages;
