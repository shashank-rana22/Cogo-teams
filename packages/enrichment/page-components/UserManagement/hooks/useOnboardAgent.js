import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import controls from '../utils/onboard-agent-controls';

const useOnboardAgent = (props) => {
	const {
		setActionModal = () => {},
		refetch = () => {},
	} = props;

	const api = useRequest({
		url    : '/create_partner_user_for_enrichment',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const onboardAgent = async () => {
		const values = getValues();
		try {
			await trigger({
				data: {
					...values,
					mobile_number       : values?.mobile_number?.number,
					mobile_country_code : values?.mobile_number?.country_code,
				},
			});

			Toast.success('Congratulations!!! Agent has been Onboarded Successfully');

			setActionModal({});
			refetch();
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		onboardAgent,
		loadingOnboard: loading,
		controls,
		control,
		errors,
		handleSubmit,
	};
};

export default useOnboardAgent;
