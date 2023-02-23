import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import formatArrayValues from '../../../../../../../../../commons/utils/formatArrayValues';
import workScopes from '../../../../../../../../../commons/utils/work-scopes.json';

function useGetListVendorPocServices() {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id = '' } = query || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_vendor_poc_services',
		method : 'GET',
	}, { manual: false });

	const getListVendorPocServices = async () => {
		try {
			await trigger({
				params: {
					vendor_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		getListVendorPocServices();
	}, []);

	const { services_pocs = [] } = data || {};

	const allServicesAndPocs = (services_pocs || []).map((servicePoc) => {
		const { vendor_pocs = [] } = servicePoc || {};

		const details = (vendor_pocs || []).map((poc) => {
			const obj = {
				name          : poc?.name,
				email         : poc?.email,
				mobile_number : `${poc?.mobile_country_code} ${poc?.mobile_number}`,
				poc_role      : poc?.poc_role,
			};
			return obj;
		});

		const finalData = {
			category           : servicePoc?.category,
			sub_category       : servicePoc?.sub_category,
			cogoport_office_id : servicePoc?.cogoport_office_id,
			poc_details        : details,
		};

		return finalData;
	});

	const getPocRole = (arr) => {
		const scopeArr = arr.map((val) => {
			const obj = workScopes.find((scope) => scope.value === val);
			return obj.label;
		});

		return formatArrayValues(scopeArr, false);
	};

	return {
		loading,
		allServicesAndPocs,
		getPocRole,
	};
}

export default useGetListVendorPocServices;
