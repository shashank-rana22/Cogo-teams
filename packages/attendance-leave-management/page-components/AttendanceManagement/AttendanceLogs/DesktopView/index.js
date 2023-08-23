import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetAttendanceColumns from '../../../../common/useGetAttendanceColumns';

function DesktopView({ dataArr = {} }) {
	const { normal_shift, weekend_shift } = dataArr || {};
	const columns = useGetAttendanceColumns({ normal_shift, weekend_shift });
	return (
		<StyledTable columns={columns} data={dataArr.details} />
	);
}

export default DesktopView;
