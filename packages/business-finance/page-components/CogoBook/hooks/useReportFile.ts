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
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		};

		try {
			await sourceFileTrigger({
				params: {
					cogoEntityId : entityMapping[entity],
					period       : numericDate,
				},
			});
		} catch (error) {
			console.log(error, 'error');
		}
	}, [entity, numericDate, sourceFileTrigger]);
	return {
		sourceFileData,
		sourceFileLoading,
		refetch,
	};
};
export default useReportFile;
