import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

function useUpdateKamScores(props) {
	const { transition_level, refetch, setAction, setTitle, setshowEditBtn } = props;

	const formProps = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_bulk_configuration',
		authkey : 'post_allocation_kam_expertise_bulk_configuration',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		console.log('formValues', formValues);

		const {
			commodity_expertise,
			customer_expertise,
			minimum_transacting_accounts,
			misc_expertise,
			retained_account_count,
			retained_accont_min_duration,
			trade_expertise,
		} = formValues || {};

		console.log('checking values', commodity_expertise);

		// const transition_level = '2';

		// const {
		// 	commodity_expertise,
		// 	customer_expertise,
		// 	minimum_transacting_accounts,
		// 	misc_expertise,
		// 	retained_account_count,
		// 	retained_accont_min_duration,
		// 	trade_expertise,
		// } = watch();
		try {
			const payload = [
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(customer_expertise)}`,
					threshold_score      : customer_expertise,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(commodity_expertise)}`,
					threshold_score      : commodity_expertise,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(minimum_transacting_accounts)}`,
					threshold_score      : minimum_transacting_accounts,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(misc_expertise)}`,
					threshold_score      : misc_expertise,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(retained_account_count)}`,
					threshold_score      : retained_account_count,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(retained_accont_min_duration)}`,
					threshold_score      : retained_accont_min_duration,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
				{
					transition_level,
					config_type          : 'KAM',
					expertise_type       : `${startCase(trade_expertise)}`,
					threshold_score      : trade_expertise,
					threshold_score_type : 'score',
					description          : 'Trade',
					status               : 'active',
				},
			];

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
		formProps,
	};
}
export default useUpdateKamScores;
