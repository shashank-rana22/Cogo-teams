import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const MONTH_MINUS = 1;
const PAGE = 1;
const useOutwardFileList = ({ entity, gstIn, month, year }) => {
	const { profile } = useSelector((state) => state || {});
	const [page, setPage] = useState(PAGE);
	function getFirstAndLastDate() {
		const firstDate = month && year && new Date(year, month - MONTH_MINUS, MONTH_MINUS);

		const nextMonthFirstDate = month && year && new Date(year, month, MONTH_MINUS);

		const lastDate = month && year && new Date(nextMonthFirstDate.getTime() - MONTH_MINUS);

		return {
			firstDate: formatDate({
				date       : firstDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			}),
			lastDate: formatDate({
				date       : lastDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			}),
		};
	}
	const { firstDate, lastDate } = getFirstAndLastDate(year, month);

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/sales/outward/export-gstr-file',
			method  : 'post',
			authKey : 'post_sales_outward_export_gstr_file',
		},
		{ manual: true },
	);

	const [{ data:listData, loading:listLoading }, listTrigger] = useRequestBf(
		{
			url     : '/sales/outward/get-outward-files',
			method  : 'get',
			authKey : 'get_sales_outward_get_outward_files',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await listTrigger({
				params: {
					pageIndex : page,
					pageSize  : 10,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [listTrigger, page]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const exportTrigger = async () => {
		try {
			await trigger({
				data: {
					entity    : entity || undefined,
					gstIn     : gstIn || undefined,
					from      : firstDate || undefined,
					to        : lastDate || undefined,
					createdBy : profile.partner?.id,

				},
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		exportTrigger,
		loading,
		data,
		listData,
		listLoading,
		refetch,
		setPage,
		page,
	};
};
export default useOutwardFileList;
