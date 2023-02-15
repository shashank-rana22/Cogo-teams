import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const CONFIGURATION_OPTIONS = [
	{
		label : 'Old',
		value : 'old_configuration',
	},
	{
		label : 'New',
		value : 'new_configuration',
	},
];

const useUpdateAllocationPreferences = ({ item = {}, setShow = () => {}, listRefetch = () => {} }) => {
	const [radioValue, setRadioValue] = useState();

	const [{ loading }, trigger] = useRequest({
		url     : '/preference_bulk_status',
		method  : 'POST',
		authkey : 'post_allocation_preference_bulk_status',
	}, { manual: true });

	const onUpdatePreferences = async () => {
		try {
			const payload = {
				configuration_type          : radioValue,
				allocation_configuration_id : item.id,
			};

			await trigger({ data: payload });

			setShow(false);

			listRefetch();

			Toast.success(
				'Preferences saved successfully! Please check after sometime.',
			);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		CONFIGURATION_OPTIONS,
		radioValue,
		setRadioValue,
		loadingUpdatePreferences: loading,
		onUpdatePreferences,
	};
};

export default useUpdateAllocationPreferences;
