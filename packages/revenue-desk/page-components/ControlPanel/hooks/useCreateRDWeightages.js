import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateRDWeightages = ({ parameter }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_revenue_desk_weightages',
		method : 'POST',
	}, { manual: true });

	const createRDWeightages = async ({ weightageList, filter, refetch }) => {
		try {
			const {
				overall_weightage,
				overall_weightage_2_day,
				overall_weightage_7_day,
				overall_weightage_30_day,
				...rest
			} = weightageList;
			const response = await trigger({
				data: {
					parameter_id      : parameter?.id,
					fulfillment_ratio : {
						overall_weightage,
						_2_day  : overall_weightage_2_day,
						_7_day  : overall_weightage_7_day,
						_30_day : overall_weightage_30_day,
					},
					...rest,
				},
			});
			if (!response.hasError) {
				Toast.success('Updated Successfully');
			}
			if (!loading) { refetch({ filter, refetched: true }); }
		} catch (error) {
			console.log(error);
		}
	};

	return { createRDWeightages, loading };
};

export default useCreateRDWeightages;
