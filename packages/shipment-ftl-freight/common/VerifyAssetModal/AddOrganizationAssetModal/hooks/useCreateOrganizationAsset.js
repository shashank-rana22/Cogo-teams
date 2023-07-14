import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getFormattedValues from '../../../../helpers/getFormattedValues';
import controlsFuncOrgAsset from '../org-assets';
import { formattedValuesForAsset } from '../utils/payloadForAssetCreation';

const useCreateOrganizationAsset = ({
	fetch = () => {},
	organization_id = '',
	item = {},
	setItem = () => {},
}) => {
	const url = item?.name
		? '/update_organization_asset'
		: '/create_organization_asset';

	const createOrganizationAssetAPI = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const controls = controlsFuncOrgAsset(organization_id, item);
	const { control, handleSubmit, reset, setValue, formState } = useForm();

	const createOrgAsset = async (values) => {
		try {
			const formattedValues = getFormattedValues(values);

			const payload = formattedValuesForAsset(formattedValues);

			if (values) {
				await createOrganizationAssetAPI.trigger({
					data: {
						id                  : item?.id || undefined,
						...payload,
						verification_status : 'pending',
						organization_id,
					},
				});

				Toast.success('Added successfully');
				fetch();
				reset();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data) || 'Something went wrong!!');
		}
		setItem(null);
	};

	return {
		createOrgAsset,
		control,
		handleSubmit,
		formState,
		controls,
		createOrganizationAssetAPI,
		setValue,
	};
};

export default useCreateOrganizationAsset;
