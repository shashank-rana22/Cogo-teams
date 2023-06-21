import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../commons/toastApiError';

interface GlobalInterface {
	page?: number;
	pageLimit?: number;
	accMode?: string;
	search?: string;
	date?: {
		startDate?: Date;
		endDate?: Date;
	};
	paymentDocumentStatus?: string;
	docType?: string;
	sortBy?: string;
	sortType?: string;
}

const MAX_FILTERS_LENGTH = 3;

const payloadFormatDate = (dateValue) => formatDate({
	date       : dateValue,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});

const useAccountCollection = ({ entityType, currencyType }) => {
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		page     : 1,
		accMode  : 'AR',
		sortBy   : '',
		sortType : 'Asc',
	});
	const { query, debounceQuery } = useDebounceQuery();

	const {
		search,
		date,
		paymentDocumentStatus,
		docType,
		accMode,
		page,
		sortBy,
		sortType,
	} = globalFilters;

	const [{ data, loading }, listApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'get_payments_accounts',
			method  : 'get',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await listApiTrigger({
				params: {
					docType               : docType || undefined,
					paymentDocumentStatus : paymentDocumentStatus || undefined,
					page                  : page || undefined,
					accMode               : accMode || undefined,
					pageLimit             : 10,
					startDate             : date?.startDate
						? payloadFormatDate(date?.startDate)
						: undefined,
					endDate: date?.endDate
						? payloadFormatDate(date?.endDate)
						: undefined,
					query        : query || undefined,
					entityType   : entityType || undefined,
					currencyType : currencyType || undefined,
					sortBy       : sortBy || undefined,
					sortType     : sortBy ? sortType : undefined,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [
		accMode,
		listApiTrigger,
		currencyType,
		date?.endDate,
		date?.startDate,
		docType,
		entityType,
		page,
		paymentDocumentStatus,
		query,
		sortBy,
		sortType,
	]);
	const clearFilters = () => {
		if (Object.keys(globalFilters).length > MAX_FILTERS_LENGTH) {
			setGlobalFilters({
				page      : 1,
				pageLimit : 10,
				accMode   : 'AR',
			});
		} else {
			refetch();
		}
	};

	useEffect(() => {
		refetch();
	}, [
		query,
		date,
		sortBy,
		sortType,
		entityType,
		currencyType,
		paymentDocumentStatus,
		docType,
		refetch,
	]);

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	return {
		data,
		refetch,
		globalFilters,
		setGlobalFilters,
		loading,
		clearFilters,
	};
};

export default useAccountCollection;
