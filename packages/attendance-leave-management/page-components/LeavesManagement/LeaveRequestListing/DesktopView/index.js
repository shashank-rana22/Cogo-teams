import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import getColumns from '../getColumns';

function DesktopView({ dataArr = [] }) {
	const columns = getColumns();
	return (
		<StyledTable
			columns={columns}
			data={dataArr}
			emptyText="No Data Found"
			loading={false}
		/>
	);
}

export default DesktopView;
