import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import Transacting_Accounts_Threshold_Type from '../constants/transacting-accounts-threshold-type';

const SECOND_INDEX = 2;

function useCreateKamLevel(props) {
	const { dataLength = '', setCreateKam, refetch, cardRefetch, t = () => {} } = props;

	const formProps = useForm();

	const { reset } = formProps;

	const [{ loading:createLoading = false }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration',
		authkey : 'post_allocation_kam_expertise_configuration',
	}, { manual: true });

	const onCreate = async (formValues) => {
		const CONFIG_DETAILS = [];

		Object.keys(formValues).forEach((key) => {
			let expertise_type = key;
			const threshold_score = Number(formValues[key]);
			let threshold_score_type = 'score';

			if (Transacting_Accounts_Threshold_Type[key]) {
				expertise_type = 'transacting_accounts';
				threshold_score_type = Transacting_Accounts_Threshold_Type[key].threshold_score_type;
			}

			CONFIG_DETAILS.push({
				expertise_type,
				threshold_score,
				threshold_score_type,
			});
		});

		try {
			const payload = {
				transition_level      : dataLength + SECOND_INDEX,
				configuration_type    : 'kam',
				configuration_details : CONFIG_DETAILS,
			};

			await trigger({
				data: payload,
			});

			setCreateKam(false);

			reset();

			refetch();

			cardRefetch();

			Toast.success(t('allocation:level_added_toast'));
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};
	return {
		createLoading,
		onCreate,
		formProps,
	};
}

export default useCreateKamLevel;
