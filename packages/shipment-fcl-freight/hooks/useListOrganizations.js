import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useListOrganizations({ orgId = '' }) {
	const [data, setData] = useState({});
	const [defaultValues, setDefaultValues] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'GET',
		params : {
			filters: {
				organization_id  : orgId,
				// organization_id  : '8ae37410-6dae-4b4f-b38d-08c849527558',
				trade_party_type : 'self',
			},
		},
	}, { manual: false });

	const getListOrganizations = useCallback(
		async () => {
			try {
				const res = await trigger();

				setData(res?.data || {});

				const list = res?.data?.list?.[GLOBAL_CONSTANTS.zeroth_index];
				const pocData = list?.organization_pocs?.[GLOBAL_CONSTANTS.zeroth_index];

				setDefaultValues({
					business_name           : list?.name,
					pincode                 : list?.pincode,
					tax_number              : list?.tax_number,
					address                 : list?.address,
					tax_number_document_url : list?.tax_number_document_url,
					name                    : pocData?.name,
					email                   : pocData?.email,
					is_sez                  : list?.is_sez ? 'yes' : 'no',
					mobile_number           : {
						number       : pocData?.mobile_number,
						country_code : pocData?.mobile_country_code,
					},
				});
			} catch (error) {
				toastApiError(error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		getListOrganizations();
	}, [getListOrganizations]);

	return {
		loading,
		listData: data?.list?.[GLOBAL_CONSTANTS.zeroth_index],
		defaultValues,
		getListOrganizations,
	};
}

export default useListOrganizations;
