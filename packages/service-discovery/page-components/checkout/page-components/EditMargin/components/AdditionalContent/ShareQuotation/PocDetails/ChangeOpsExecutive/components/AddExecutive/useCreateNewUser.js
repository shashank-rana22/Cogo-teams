import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';

import getControls from './getControls';

const geo = getGeoConstants();

const useCreateNewUser = ({
	organization_id,
	branch_id,
	onUpdate,
	setAddExecutive = () => {},
}) => {
	const {
		control,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const controls = getControls({ geo });

	const [{ loading = false }, trigger] = useRequest({
		url    : '/onboard_organization_user',
		method : 'post',
	}, { manual: true });

	const createUser = async (values) => {
		try {
			const {
				mobile_number = {},
				whatsapp_number = {},
				...restValues
			} = values;

			// trackEvent(PARTNER_EVENT.checkout_created_ops_executive, { TODO
			// 	checkout_id,
			// 	ops_exec_name  : values.name,
			// 	ops_exec_email : values.email,
			// });

			if (values) {
				const res = await trigger({
					data: {
						organization_id,
						organization_branch_id : branch_id,
						status                 : 'active',
						...restValues,
						...mobile_number,
						...whatsapp_number,
						work_scopes            : values.work_scopes || [],
					},
				});

				Toast.success('Added successfully');

				const { user_id } = res.data || {};

				onUpdate({
					importer_exporter_poc_id: user_id,
				});

				setAddExecutive(false);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'Could not create user');
		}
	};

	return {
		loading,
		errors,
		createUser,
		control,
		handleSubmit,
		controls,
	};
};

export default useCreateNewUser;
