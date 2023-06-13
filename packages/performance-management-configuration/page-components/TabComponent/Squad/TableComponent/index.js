import StyledTable from '../../../../commons/StyledTable';

import getColumns from './getColumns';

function TableComponent() {
	const columns = getColumns();
	const list = [{}];
	const LOADING = false;

	return (
		<div>
			<StyledTable
				columns={columns}
				data={list}
				loading={LOADING}
			/>
		</div>
	);
}

export default TableComponent;
