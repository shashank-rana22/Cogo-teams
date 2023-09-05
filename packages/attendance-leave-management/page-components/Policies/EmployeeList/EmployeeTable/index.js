import { Pagination, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetLocationColumn from '../../../../common/useGetLocationColumn';
import UpdateModal from '../UpdateModal';

import styles from './styles.module.css';

const ARRAY_COUNT = 1;

function EmployeeTable({
	data = {}, setFilters = () => {}, filters = {}, searchQuery = '',
	selectedLocation = '', refetch = () => {}, loading = false,
}) {
	const [selectBulk, setSelectBulk] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [selectedData, setSelectedData] = useState({});

	const { list, page, page_limit, total_count } = data || {};

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
		setSelectedData({});
		selectBulk(false);
		setSelectedIds([]);
	};

	const handleModal = (val) => {
		setSelectedData(val);
		setOpenUpdateModal(true);
	};

	const handleAllSelect = (e) => {
		const { checked } = e.target;

		if (checked) {
			const ids = list.map((val) => val.employee_id);
			return setSelectedIds(ids);
		}

		return setSelectedIds([]);
	};

	const handleSelectId = (e, id) => {
		const { checked } = e.target;
		if (checked) {
			return setSelectedIds((prev) => ([...prev, id]));
		}
		const filterArr = selectedIds.filter((val) => val !== id);
		return setSelectedIds(filterArr);
	};

	const columns = useGetLocationColumn({
		handleModal,
		handleAllSelect,
		handleSelectId,
		list,
		selectedIds,
	});

	const handleBulk = () => {
		setSelectBulk(true);
		setSelectedIds([]);
		setSelectedData({});
		setOpenUpdateModal(true);
	};

	const handleCloseModal = () => {
		setOpenUpdateModal(false);
	};

	return (
		<div className={cl`${styles.container} ${selectedIds.length > GLOBAL_CONSTANTS.zeroth_index && styles.mb_100}`}>
			<StyledTable columns={columns} data={list} className="table_height" loading={loading} />
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={onPageChange}
				/>
			</div>
			{openUpdateModal && (
				<UpdateModal
					show={openUpdateModal}
					onClose={handleCloseModal}
					selectedData={selectedData}
					filtersData={filters}
					searchQuery={searchQuery}
					selectedLocation={selectedLocation}
					refetch={refetch}
					setSelectedData={setSelectedData}
					selectedIds={selectedIds}
					setSelectedIds={setSelectedIds}
					isBulkUpdate={selectBulk}
					setSelectBulk={setSelectBulk}
				/>
			)}
			{selectedIds.length > GLOBAL_CONSTANTS.zeroth_index && (
				<div className={styles.footer}>
					<div>
						<span className={styles.footer_text}>
							{selectedIds.length === list?.length
								? `All ${selectedIds.length} employees are selected.`
								: `${selectedIds.length} employee${selectedIds.length > ARRAY_COUNT ? 's are' : ' is'}
								selected on this page.`}
						</span>
						<span className={styles.all_select} aria-hidden onClick={handleBulk}>
							Select All
							{' '}
							{total_count}
							{' '}
							Employees
						</span>
					</div>
					<Button size="md" themeType="primary" onClick={() => handleModal('')}>Make Changes</Button>
				</div>
			)}
		</div>
	);
}

export default EmployeeTable;
