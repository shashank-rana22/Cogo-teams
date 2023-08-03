import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const CHECK_LEAP_YEAR = 4;
const CHECK_DIVISIBLE = 0;
const LEAP_YEAR_HUNDRED = 100;
const LEAP_YEAR_FOUR = 400;
const START_MONTH_DATE = 1;
const END_ODD_MONTH_DATE = 31;
const END_EVEN_MONTH_DATE = 30;
const LEAP_YEAR_ODD_DATE = 29;
const LEAP_YEAR_EVEN_DATE = 28;

const THIRTY_DAY_MONTH = ['11', '9', '6', '4'];
const THIRTY_ONE_DAY_MONTH = ['1', '3', '5', '7', '8', '10', '12'];
const LEAP_YEAR_MONTH = ['2'];

function createDate(year, month, day) {
	let createDateReturn;
	if (year && month && day) {
		createDateReturn = new Date(parseInt(year, 10), parseInt(month - START_MONTH_DATE, 10), day);
	} else {
		createDateReturn = '';
	}

	return formatDate({
		date       : createDateReturn || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		separator  : ' ',
	});
}

const useGetEntityReport = ({
	showDetails,
	activeEntityCode,
	reportCurrency,
	date,
	month,
	year,
}) => {
	let formatedFromDate = '';
	let formatedToDate = '';
	formatedFromDate = createDate(year, month, START_MONTH_DATE);

	if (THIRTY_DAY_MONTH.includes(month)) {
		formatedToDate = createDate(year, month, END_EVEN_MONTH_DATE);
	} else if (THIRTY_ONE_DAY_MONTH.includes(month)) {
		formatedToDate = createDate(year, month, END_ODD_MONTH_DATE);
	} else if (LEAP_YEAR_MONTH.includes(month)) {
		const formatedYear = parseInt(year, 10);
		if (
			formatedYear / CHECK_LEAP_YEAR === CHECK_DIVISIBLE
			&& formatedYear / LEAP_YEAR_HUNDRED === CHECK_DIVISIBLE
			&& formatedYear / LEAP_YEAR_FOUR === CHECK_DIVISIBLE
		) {
			formatedToDate = createDate(year, month, LEAP_YEAR_ODD_DATE);
		} else formatedToDate = createDate(year, month, LEAP_YEAR_EVEN_DATE);
	}

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/treasury/report-details',
			method  : 'get',
			authKey : 'get_purchase_treasury_report_details',
		},
		{ manual: true },
	);

	const getHistoryChild = useCallback(async () => {
		try {
			await trigger({
				params: {
					entityCode : activeEntityCode,
					currency   : reportCurrency,
					fromDate   : date || formatedFromDate,
					toDate     : date || formatedToDate,
				},
			});
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	}, [activeEntityCode, date, formatedFromDate, formatedToDate, reportCurrency, trigger]);

	useEffect(() => {
		if (showDetails) { getHistoryChild(); }
	}, [activeEntityCode, getHistoryChild, showDetails]);

	return {
		getHistoryChild,
		data,
		loading,
	};
};
export default useGetEntityReport;
