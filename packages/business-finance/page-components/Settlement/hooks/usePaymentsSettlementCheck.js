import { Toast } from '@cogoport/components';
// import { useDebounceQuery } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
// import { useState } from 'react';
// import { useSelector } from '@cogoport/store';
// import React, {  } from 'react';

const usePaymentsSettlementCheck = ({ selectedData, date }) => {
	const [
		{
			loading:checkLoading,
			data:checkData,
		},
		checkTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/check',
			method  : 'post',
			authKey : 'post_payments_settlement_check',
		},
		{ manual: true },
	);
	const { profile } = useSelector((state) => state || {});
	// const { page = '', pageLimit = '' } = filters || {};
	// const { query = '', debounceQuery } = useDebounceQuery();
	// useEffect(() => {
	// 	debounceQuery(filters?.query);
	// }, [debounceQuery, filters?.query]);
	const postPaymentsSettlementCheck = async () => {
		try {
			// if (filters.tradeParty && filters.entityCode) {
			// const { ...res } = filters || {};

			await checkTrigger({
				data: {
					stackDetails   : selectedData,
					createdBy      : profile.user?.id,
					settlementDate : (date
						&& formatDate({
							date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,
				},
			});
		} catch (error) {
			// setApiData({});
			Toast.error(error?.error?.message);
		}
	};

	return {
		checkLoading,
		checkData,
		postPaymentsSettlementCheck,
	};
};
export default usePaymentsSettlementCheck;
