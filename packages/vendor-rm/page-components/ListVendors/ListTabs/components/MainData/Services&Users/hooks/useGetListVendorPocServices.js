import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useMemo } from 'react';

function useGetListVendorPocServices() {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id = '' } = query || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_vendor_poc_services',
		method : 'GET',
	}, { manual: true });

	const getListVendorPocServices = useCallback(() => {
		try {
			trigger({
				params: {
					vendor_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	}, [trigger, vendor_id]);

	useEffect(() => {
		if (vendor_id) {
			getListVendorPocServices();
		}
	}, [getListVendorPocServices, vendor_id]);

	const { services_pocs = [] } = data || {};

	const allServicesAndPocs = useMemo(() => (services_pocs || []).map((servicePoc) => {
		const { vendor_pocs = [] } = servicePoc || {};

		const details = (vendor_pocs || []).map((poc) => {
			const {
				id = '',
				name = '',
				email = '',
				mobile_number,
				mobile_country_code,
				poc_role,
			} = poc || {};

			const obj = {
				id,
				name,
				email,
				mobile_number: `${mobile_country_code} ${mobile_number}`,
				poc_role,
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
	}), [services_pocs]);

	return {
		loading,
		allServicesAndPocs,
		refetchServicesPocs: getListVendorPocServices,
	};
}

export default useGetListVendorPocServices;
