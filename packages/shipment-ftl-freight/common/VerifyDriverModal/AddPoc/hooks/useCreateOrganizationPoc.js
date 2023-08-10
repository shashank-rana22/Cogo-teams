import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getFormattedValues from '../../../../helpers/getFormattedValues';
import controlsFuncDriver from '../../configurations/driver-controls';
import formattedValuesForDriver from '../../utils/formatPayloadForCreateOrg';

const useCreateOrganizationPoc = ({
	fetch = () => {},
	organization_id = '',
	item = {},
	setItem = () => {},
}) => {
	const url = item?.id
		? '/update_organization_poc'
		: '/create_organization_poc';

	const createOrganizationPocAPI = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const controls = controlsFuncDriver(organization_id, item);

	const { control, handleSubmit, reset, formState } = useForm();

	const createOrgPoc = async (values) => {
		try {
			const formattedValues = getFormattedValues(values);
			const payload = formattedValuesForDriver(formattedValues);
			await createOrganizationPocAPI.trigger({
				data: {
					id                  : item?.id || undefined,
					...payload,
					organization_id,
					verification_status : 'pending',
					work_scopes         : values.work_scopes || [],
				},
			});
			Toast.success('Added successfully');
			fetch();
			reset();
		} catch (err) {
			Toast.error(getApiErrorString(err?.data) || 'Something went wrong!!');
		}
		setItem(null);
	};

	return {
		createOrgPoc,
		control,
		handleSubmit,
		formState,
		controls,
		createOrganizationPocAPI,
	};
};

export default useCreateOrganizationPoc;
