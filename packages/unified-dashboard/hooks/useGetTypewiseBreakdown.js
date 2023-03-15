import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetTypewiseBreakdown = ({
	apiKey,
	isDataSelected,
	selectedData,
	byEtd,
	headerFilters,
}) => {
	const scope = useSelector(({ general }) => general.scope);
	const { entity_code = [] } = headerFilters;

	const [{ loading, data, error }, trigger] = useRequest({
		url    : `/get_${apiKey}_wise_financial_breakdown`,
		method : 'GET',
		scope,
	}, { manual: false });

	const getTypewiseBreakdown = async () => {
		const { indexValue, type, id } = selectedData || {};

		const getDate = new Date(Date.parse(indexValue));

		const formattedDate = formatDate({
			date       : getDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});

		await trigger({
			params: {
				as_on_date  : formattedDate,
				type,
				sub_type    : type === 'cost' ? undefined : id,
				by_etd      : byEtd,
				entity_code : entity_code.length > 0 ? entity_code : undefined,
			},
		});
	};

	useEffect(() => {
		if (isDataSelected) getTypewiseBreakdown();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(selectedData), JSON.stringify(entity_code)]);

	return {
		loading,
		data,
		breakdownError: error,
	};
};

export default useGetTypewiseBreakdown;
