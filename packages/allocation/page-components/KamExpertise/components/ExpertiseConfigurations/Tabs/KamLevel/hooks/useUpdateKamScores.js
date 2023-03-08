import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateKamScores({
	refetch = () => {},
	setAction = () => {},
	setTitle = () => {},
	setshowEditBtn = () => {},
}) {
	// const formProps = useForm();
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_bulk_configuration',
		authkey : 'post_allocation_kam_expertise_bulk_configuration',
	}, { manual: true });

	const onSave = async () => {
		try {
			const payload = {
				payload: [
					{
						transition_level     : 3,
						config_type          : 'KAM',
						expertise_type       : 'Customer Expertise',
						threshold_score      : 111211,
						threshold_score_type : 'score',
						description          : 'Trade',
						status               : 'active',
					},
				],
			};
			await trigger({
				data: payload,
			});
			setAction('show');
			refetch();
			setshowEditBtn(true);
			setTitle(0);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};
	return {
		loading,
		onSave,
	};
}
export default useUpdateKamScores;
