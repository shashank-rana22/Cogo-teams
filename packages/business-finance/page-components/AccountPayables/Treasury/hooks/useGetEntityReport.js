import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const CHECK_LEAP_YEAR = 4;
const CHECK_DIVISIBLE = 0;
const LEAP_YEAR_HUNDRED = 100;
const LEAP_YEAR_FOUR = 400;

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
	if (month === '1') {
		formatedFromDate = `${year}-01-01 05:30:00`;
		formatedToDate = `${year}-01-31 05:30:00`;
	} else if (month === '2') {
		formatedFromDate = `${year}-02-01 05:30:00`;
		const formatedYear = parseInt(year, 10);
		if (
			formatedYear / CHECK_LEAP_YEAR === CHECK_DIVISIBLE
			&& formatedYear / LEAP_YEAR_HUNDRED === CHECK_DIVISIBLE
			&& formatedYear / LEAP_YEAR_FOUR === CHECK_DIVISIBLE
		) {
			formatedToDate = `${year}-02-29 05:30:00`;
		} else formatedToDate = `${year}-02-28 05:30:00`;
	} else if (month === '3') {
		formatedFromDate = `${year}-03-01 05:30:00`;
		formatedToDate = `${year}-03-31 05:30:00`;
	} else if (month === '4') {
		formatedFromDate = `${year}-04-01 05:30:00`;
		formatedToDate = `${year}-04-30 05:30:00`;
	} else if (month === '5') {
		formatedFromDate = `${year}-05-01 05:30:00`;
		formatedToDate = `${year}-05-31 05:30:00`;
	} else if (month === '6') {
		formatedFromDate = `${year}-06-01 05:30:00`;
		formatedToDate = `${year}-06-30 05:30:00`;
	} else if (month === '7') {
		formatedFromDate = `${year}-07-01 05:30:00`;
		formatedToDate = `${year}-07-31 05:30:00`;
	} else if (month === '8') {
		formatedFromDate = `${year}-08-01 05:30:00`;
		formatedToDate = `${year}-08-31 05:30:00`;
	} else if (month === '9') {
		formatedFromDate = `${year}-09-01 05:30:00`;
		formatedToDate = `${year}-09-30 05:30:00`;
	} else if (month === '10') {
		formatedFromDate = `${year}-10-01 05:30:00`;
		formatedToDate = `${year}-10-31 05:30:00`;
	} else if (month === '11') {
		formatedFromDate = `${year}-11-01 05:30:00`;
		formatedToDate = `${year}-11-30 05:30:00`;
	} else if (month === '12') {
		formatedFromDate = `${year}-12-01 05:30:00`;
		formatedToDate = `${year}-12-31 05:30:00`;
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
