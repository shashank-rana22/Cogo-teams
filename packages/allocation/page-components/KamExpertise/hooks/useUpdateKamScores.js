import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const transactingMapping = {
	'Minimum Transacting Accounts'  : 'minimum_transacting_accounts_id',
	'Retained Account Count'        : 'retained_account_count_id',
	'Retained Account Min Duration' : 'retained_account_min_duration_id',
};

function useUpdateKamScores(props) {
	const {
		transition_level,
		listrefetch,
		setEditMode, refetch, listkamLevelDetails,
	} = props;

	const { list = [] } = listkamLevelDetails;
	const {
		'Transacting Accounts': transacting = [],
		'Trade Expertise':trade = [], 'Customer Expertise':customer = [], 'Misc Expertise':misc = [],
		'Commodity Expertise': commodity = [],
	} = list;
	const valueObj = {};

	valueObj.trade_expertise_id = trade[0]?.id;
	valueObj.customer_expertise_id = customer[0]?.id;
	valueObj.commodity_expertise_id = commodity[0]?.id;
	valueObj.misc_expertise_id = misc[0]?.id;

	transacting.forEach((i) => { valueObj[transactingMapping[i.threshold_score_type]] = i.id; });

	const formProps = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onSave = async (formValues) => {
		const formResponse = [];
		Object.keys(formValues).forEach((key) => {
			if (formValues[key]) {
				formResponse.push(
					{ configuration_id: valueObj[`${key}_id`], threshold_score: Number(formValues[key]) },
				);
			}
		});

		try {
			const payload = {
				transition_level,
				configuration_details: formResponse,
			};

			await trigger({
				data: payload,
			});
			setEditMode(false);
			listrefetch();
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};
	return {
		loading,
		onSave,
		formProps,
	};
}
export default useUpdateKamScores;
