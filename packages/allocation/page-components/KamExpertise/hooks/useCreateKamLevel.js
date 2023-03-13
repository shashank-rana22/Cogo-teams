import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const expertiseTypes = {
	minimum_transacting_accounts: {
		expertise_type       : 'Transacting Accounts',
		threshold_score_type : 'Minimum Transacting Accounts',
	},
	retained_account_count: {
		expertise_type       : 'Transacting Accounts',
		threshold_score_type : 'Retained Account Count',
	},
	retained_account_min_duration: {
		expertise_type       : 'Transacting Accounts',
		threshold_score_type : 'Retained Account Min Duration',
	},
};

function useCreateKamLevel(props) {
	const { dataLength = '', setCreateKam, refetch } = props;
	const formProps = useForm();
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration',
		authkey : 'post_allocation_kam_expertise_configuration',
	}, { manual: true });

	const onCreate = async (formValues) => {
		const formResponse = [];

		Object.keys(formValues).forEach((key) => {
			let expertise_type = startCase(key);
			const threshold_score = Number(formValues[key]);
			let threshold_score_type = 'Score';

			if (expertiseTypes[key]) {
				expertise_type = expertiseTypes[key].expertise_type;
				threshold_score_type = expertiseTypes[key].threshold_score_type;
			}

			formResponse.push({
				expertise_type,
				threshold_score,
				threshold_score_type,
			});
		});

		try {
			const payload = {
				transition_level      : dataLength + 2,
				configuration_type    : 'kam',
				configuration_details : formResponse,
			};
			await trigger({
				data: payload,
			});
			setCreateKam(false);
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};
	return {
		loading,
		onCreate,
		formProps,
	};
}

export default useCreateKamLevel;
