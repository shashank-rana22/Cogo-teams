import { Pagination, Placeholder } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import getColumns from '../getColumns';

import styles from './styles.module.css';

function DesktopView({ dataArr, setFilters, handleOpenModal, handleDeleteModal, loading }) {
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
				data={list}
				emptyText="No Data Found"
				loading={loading}
			/>
			<div className={styles.pagination}>
				{loading ? <Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" /> : (
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				)}
			</div>
		</>
	);
}

export default DesktopView;
