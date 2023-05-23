import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetTypewiseBreakdown = ({
	apiKey,
	isDataSelected = false,
	selectedData,
	byEtd,
	headerFilters,
}) => {
	const scope = useSelector(({ general }) => general.scope);
	const { entity_code = INITIAL_ARRAY } = headerFilters;

	const [{ loading, data, error }, trigger] = useRequest({
		url    : `/get_${apiKey}_wise_financial_breakdown`,
		method : 'GET',
		scope,
	}, { manual: true });

	const getTypewiseBreakdown = useCallback(
		async () => {
			const { indexValue, type, id } = selectedData || {};

			const getDate = new Date(Date.parse(indexValue));

			const formattedDate = formatDate({
				date       : getDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});

			try {
				await trigger({
					params: {
						as_on_date  : formattedDate,
						type,
						sub_type    : type === 'cost' ? undefined : id,
						by_etd      : byEtd,
						entity_code : entity_code?.length > 0 ? entity_code : undefined,
					},
				});
			} catch (err) {
				console.log(err, 'err');
			}
		},
		[byEtd, entity_code, selectedData, trigger],
	);

	useEffect(() => {
		if (isDataSelected) {
			getTypewiseBreakdown();
		}
	}, [getTypewiseBreakdown, isDataSelected]);

	return {
		loading,
		data,
		breakdownError: error,
	};
};

export default useGetTypewiseBreakdown;
