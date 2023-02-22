import { Table } from '@cogoport/components';

import useGetTableData from '../../hooks/useGetTableData';

function CrmTable() {
	const { columns } = useGetTableData();
	const data = [{}];
	return (
		<div>
			<Table columns={columns} data={data} />
		</div>

	);
}

export default CrmTable;
