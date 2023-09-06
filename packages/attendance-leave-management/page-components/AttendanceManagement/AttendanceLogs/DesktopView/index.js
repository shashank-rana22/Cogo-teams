import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetAttendanceColumns from '../../../../common/useGetAttendanceColumns';

function DesktopView({ dataArr = {}, loading = false, handleOpenModal = () => {} }) {
	const { normal_shift, weekend_shift } = dataArr || {};
	const columns = useGetAttendanceColumns({ normal_shift, weekend_shift, handleOpenModal });
	return (
		<StyledTable columns={columns} data={dataArr.details} loading={loading} />
	);
}

export default DesktopView;
