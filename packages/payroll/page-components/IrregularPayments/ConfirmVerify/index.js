import { Input, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import StyledTable from '../../../common/YellowTable/StyledTable';
import useGetListIrregularPayments from '../../../hooks/useGetListIrregularPayments';

import { columns } from './columnsData';
import styles from './styles.module.css';

function ConfirmVerify() {
	const [page, setPage] = useState(GLOBAL_CONSTANTS.one);
	const { loading, data: paymentsList, debounceQuery } = useGetListIrregularPayments(page);
	const { total_count, page_limit } = paymentsList || {};
	let list = paymentsList?.list || [];

	const [searchQuery, setSearchQuery] = useState('');
	const handleSearch = (value) => {
		debounceQuery(value);
		setSearchQuery(value);
	};

	const colors = ['#849E4C', '#7278AD', '#F68B21'];
	list = list.map((item) => {
		const randomIndex = Math.floor(Math.random() * list.length);
		return ({ ...item, color: colors[randomIndex] });
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<span className={styles.heading}>Confirm and verify</span>
				<Input
					value={searchQuery}
					onChange={handleSearch}
					placeholder="Search"
				/>
			</div>
			<StyledTable columns={columns} data={list} loading={loading} />
			{total_count > page_limit ? (
				<div className={styles.pagination}>
					<Pagination
						type="compact"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(pageNumber) => setPage(pageNumber)}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ConfirmVerify;
