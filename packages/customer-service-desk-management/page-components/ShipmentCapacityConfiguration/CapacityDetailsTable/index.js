import { Table } from '@cogoport/components';

import getTableColumns from '../../../configurations/getTableColumns';
import getTableData from '../../../utils/getTableData';

function CapacityDetailsTable({ data = {}, loading = false }) {
	const { finalData = [] } = getTableData({ data });

	const columns = getTableColumns({ slabData: data.agent_experience_slabs });

	return (
		<Table columns={columns} data={finalData} loading={loading} />
	);
}

export default CapacityDetailsTable;
