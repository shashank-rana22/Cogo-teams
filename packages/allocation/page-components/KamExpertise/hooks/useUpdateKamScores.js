import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

function useUpdateKamScores(props) {
	// const { transition_level, refetch, setEditMode, setTitle } = props;
	const { transition_level } = props;

	const formProps = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		console.log('formValues', transition_level);

		const {
			commodity_expertise,
			customer_expertise,
			minimum_transacting_accounts,
			misc_expertise,
			retained_account_count,
			retained_accont_min_duration,
			trade_expertise,
		} = formValues || {};
		console.log('type', typeof (customer_expertise));

		try {
			const payload = {
				transition_level,
				configuration_details: [
					{
						configuration_id : 'e0c15e8d-b351-4100-a389-82ec3e87b1e1',
						threshold_score  : 100,
					},
				],
			};

			await trigger({
				data: payload,
			});

			// setEditMode(false);
			// refetch();
			// // setshowEditBtn(true);
			// setTitle(0);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};
	return {
		loading,
		onSave,
		formProps,
	};
}
export default useUpdateKamScores;
