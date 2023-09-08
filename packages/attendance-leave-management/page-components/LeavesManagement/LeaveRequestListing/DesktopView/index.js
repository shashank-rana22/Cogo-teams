import { Pagination } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import getColumns from '../getColumns';

import styles from './styles.module.css';

const MAX_PAGE_LIMIT = 10;

function DesktopView({
	dataArr = {}, setFilters = () => {}, handleOpenModal = () => {},
	handleDeleteModal = () => {}, loading = false,
}) {
	const { list, page, page_limit, total_count } = dataArr || {};

	const columns = getColumns({ handleOpenModal, handleDeleteModal });
	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	return (
		<>
			<StyledTable
				columns={columns}
				data={list || []}
				emptyText="No Data Found"
				loading={loading}
			/>
			{total_count > MAX_PAGE_LIMIT && (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</>
	);
}

export default DesktopView;
