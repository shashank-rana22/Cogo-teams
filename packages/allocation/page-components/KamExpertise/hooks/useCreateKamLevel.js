import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateKamLevel(props) {
	const { dataLength = '', setCreateKam, refetch } = props;
	const formProps = useForm();
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration',
		authkey : 'post_allocation_kam_expertise_configuration',
	}, { manual: true });

	const onCreate = async (formValues) => {
		console.log('level', dataLength);
		const {
			commodity_expertise,
			customer_expertise,
			minimum_transacting_accounts,
			misc_expertise,
			retained_account_count,
			retained_account_min_duration,
			trade_expertise,

		} = formValues || {};
		try {
			const payload = {
				transition_level      : dataLength + 2,
				configuration_type    : 'kam',
				configuration_details : [
					{
						expertise_type       : 'Customer Expertise',
						threshold_score      : Number(customer_expertise),
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Trade Expertise',
						threshold_score      : Number(trade_expertise),
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Commodity Expertise',
						threshold_score      : Number(commodity_expertise),
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Misc Expertise',
						threshold_score      : Number(misc_expertise),
						threshold_score_type : 'Score',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : Number(retained_account_count),
						threshold_score_type : 'Retained Account Count',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : Number(retained_account_min_duration),
						threshold_score_type : 'Retained Account Min Duration',
					},
					{
						expertise_type       : 'Transacting Accounts',
						threshold_score      : Number(minimum_transacting_accounts),
						threshold_score_type : 'Minimum Transacting Accounts',
					},
				],
			};
			await trigger({
				data: payload,
			});
			setCreateKam(false);
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};
	return {
		loading,
		onCreate,
		formProps,
	};
}

export default useCreateKamLevel;
