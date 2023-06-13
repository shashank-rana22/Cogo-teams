import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import { historyFilters } from '../../configurations/history-filters';
import useHistorySettlemet from '../../hooks/useHistorySettlement';

import CustomTable from './customTable';
import styles from './styles.module.css';

function History() {
	// const [show, setShow] = useState(false);

	const { data, loading, refetch, filters, setFilters } = useHistorySettlemet();

	const onPageChange = (val:number) => {
		setFilters({ ...filters, page: val });
	};

	const onClose = () => {
		setShow(false);
	};

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters} setFilters={setFilters} filters={filters} pageKey="page" />
				<Input
					name="query"
					onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
					placeholder="Search by Document Number"
					size="md"
					suffix={<IcMSearchlight height="20px" width="20px" />}
					className={styles.search_div}
				/>
			</div>
			<CustomTable />
		</div>
	);
}

export default History;
