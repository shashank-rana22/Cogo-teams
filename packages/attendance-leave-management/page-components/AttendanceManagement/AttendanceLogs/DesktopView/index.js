import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetAttendanceColumns from '../../../../common/useGetAttendanceColumns';

function DesktopView({ dataArr = [] }) {
	const columns = useGetAttendanceColumns();
	return (
		<StyledTable columns={columns} data={dataArr} />
	);
}

export default DesktopView;
