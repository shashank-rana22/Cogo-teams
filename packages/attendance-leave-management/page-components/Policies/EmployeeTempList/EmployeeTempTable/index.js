import React from 'react';

// import useGetEmployee from '../../../../common/useGetLocationColumn';
import StyledTable from '../../../../common/StyledTable';
import useGetEmployeeTempColumns from '../../../../common/useGetEmployeeTempColumns';

import styles from './styles.module.css';

function EmployeeTable({ data = {}, loading = false }) {
	// const [selectBulk, setSelectBulk] = useState(false);
	// const [selectedIds, setSelectedIds] = useState([]);
	// const [openUpdateModal, setOpenUpdateModal] = useState(false);
	// const [selectedData, setSelectedData] = useState({});

	// const { list, page, page_limit, total_count } = data || {};

	// const onPageChange = (pageNumber) => {
	// 	setFilters((prev) => ({
	// 		...prev,
	// 		page: pageNumber,
	// 	}));
	// 	setSelectedData({});
	// 	selectBulk(false);
	// 	setSelectedIds([]);
	// };

	// const handleModal = (val) => {
	// 	setSelectedData(val);
	// 	setOpenUpdateModal(true);
	// };

	// const columns = useGetLocationColumn({
	// 	data,
	// });

	// const handleCloseModal = () => {
	// 	setOpenUpdateModal(false);
	// };

	const columns = useGetEmployeeTempColumns({
		data,
	});

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={data} loading={loading} className="table_height" />
			{/* <div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={onPageChange}
				/>
			</div> */}
		</div>
	);
}

export default EmployeeTable;
