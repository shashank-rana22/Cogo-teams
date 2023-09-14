import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const INIT_PAGE = 1;

const getPayload = ({ activeTab = 'tc_status_check', pagination = INIT_PAGE, date }) => ({
	cargoHandedOverAtOriginAt : date,
	originAirportId           : null,
	tcDataRequired            : activeTab === 'tc_status_check',
	tdDataRequired            : true,
	page                      : pagination,
	pageSize                  : 10,
});

const useGetAmsData = ({ activeTab = 'tc_status_check' }) => {
	const [pagination, setPagination] = useState(INIT_PAGE);

	const newDate = new Date();
	newDate.setDate(newDate.getDate() - 10);
	const date = formatDate({
		date       : newDate,
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	});
	console.log('date:', date);

	const [{ data = {}, loading }, trigger] = useRequestAir({
		url     : '/air-coe/air-freight/ams-data',
		method  : 'GET',
		authKey : 'get_air_coe_air_freight_ams_data',
	}, { manual: false });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ activeTab, pagination, date }),
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [activeTab, pagination, trigger, date]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, pagination]);

	return {
		data,
		loading,
		pagination,
		setPagination,
	};
};

export default useGetAmsData;
