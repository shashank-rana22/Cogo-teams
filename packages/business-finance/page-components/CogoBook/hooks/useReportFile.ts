import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useReportFile = ({ query }) => {
	const { month = '', entity = '' } = query || {};

	const [monthName, year] = (month.match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

	const numericDate = `${year}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ data:sourceFileData, loading:sourceFileLoading },
		sourceFileTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/segments',
			method  : 'get',
			authKey : 'get_pnl_statement_segments',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};

		try {
			await sourceFileTrigger({
				params: {
					cogoEntityId : entityMapping[entity],
					period       : numericDate,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [entity, numericDate, sourceFileTrigger]);
	return {
		sourceFileData,
		sourceFileLoading,
		refetch,
	};
};
export default useReportFile;
