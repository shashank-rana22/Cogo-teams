import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import Transacting_Accounts_Threshold_Type from '../constants/transacting-accounts-threshold-type';

function useCreateKamLevel(props) {
	const { dataLength = '', setCreateKam, refetch, cardRefetch } = props;

	const formProps = useForm();

	const { reset } = formProps;

	const [{ loading:createLoading = false }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration',
		authkey : 'post_allocation_kam_expertise_configuration',
	}, { manual: true });

	const onCreate = async (formValues) => {
		const configDetails = [];

		Object.keys(formValues).forEach((key) => {
			let expertise_type = key;
			const threshold_score = Number(formValues[key]);
			let threshold_score_type = 'score';

			if (Transacting_Accounts_Threshold_Type[key]) {
				expertise_type = 'transacting_accounts';
				threshold_score_type = Transacting_Accounts_Threshold_Type[key].threshold_score_type;
			}

			configDetails.push({
				expertise_type,
				threshold_score,
				threshold_score_type,
			});
		});

		try {
			const payload = {
				transition_level      : dataLength + 2,
				configuration_type    : 'kam',
				configuration_details : configDetails,
			};

			await trigger({
				data: payload,
			});

			setCreateKam(false);

			reset();

			refetch();

			cardRefetch();

			Toast.success('Level Added!');
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
