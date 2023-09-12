import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useListLeadOrganizations({ task = {} }) {
	const [defaultValues, setDefaultValues] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_lead_organizations',
		method : 'GET',
		params : {
			filters: {
				source_id: task?.task_field_id,
			},
			lead_user_data_required: true,
		},
	}, { manual: false });

	const getListLeadOrganizations = useCallback(async () => {
		try {
			const res = await trigger();

			const {
				business_name = '',
				country_id = '',
				registration_number = '',
			} = res?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

			setDefaultValues({
				company_name : business_name,
				country_id,
				gst_number   : registration_number,
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListLeadOrganizations();
	}, [getListLeadOrganizations]);

	return {
		listLeads: data?.list,
		defaultValues,
		loading,
		getListLeadOrganizations,
	};
}

export default useListLeadOrganizations;
