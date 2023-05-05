import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetPieBreakdown = ({ selectedPieData, byEtd, headerFilters }) => {
	const { entity_code = INITIAL_ARRAY } = headerFilters;
	const { apiKey } = selectedPieData || {};
	const [page, setPage] = useState(1);
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data, error }, trigger] = useRequest(
		{
			url    : `list_${apiKey}_wise_financial_details`,
			method : 'GET',
			scope,
		},
		{ manual: true },
	);

	const getPieBreakdown = useCallback(async () => {
		const { type, sub_type, indexValue } = selectedPieData || {};

		const getDate = new Date(Date.parse(indexValue));

		const formattedDate = formatDate({
			date       : getDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});

		try {
			await trigger({
				params: {
					type,
					sub_type,
					as_on_date   : formattedDate,
					page,
					page_size    : 10,
					by_etd : byEtd,
					entity_code  : entity_code?.length > 0 ? entity_code : undefined,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	}, [byEtd, entity_code, page, selectedPieData, trigger]);

	useEffect(() => {
		if (selectedPieData) getPieBreakdown();
	}, [getPieBreakdown, selectedPieData]);

	return {
		loading,
		data,
		error,
		setPage,
	};
};

export default useGetPieBreakdown;
