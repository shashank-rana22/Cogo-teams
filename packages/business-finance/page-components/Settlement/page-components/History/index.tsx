import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs';
import Filter from '../../../commons/Filters';
import { historyFilters } from '../../configurations/history-filters';
import useHistorySettlemet from '../../hooks/useHistorySettlement';

import CustomTable from './customTable';
import SelectState from './SelectState';
import styles from './styles.module.css';

function History() {
	// const [show, setShow] = useState(false);

	const { data, loading, refetch, filters, setFilters, apiData, setApiData } = useHistorySettlemet();

	const { list = [] } = apiData || {};

	const onPageChange = (val:number) => {
		setFilters({ ...filters, page: val });
	};

	const onClose = () => {
		setShow(false);
	};
	console.log('data', data);

	console.log('apiData', apiData);

	// const { list = [], pageNo = 1, totalRecords = 0 } = (data as DataInterface || {});

	// if (isEmpty(list)) {
	// 	return (
	// 		<SelectState />
	// 	);
	// }

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters(filters)} setFilters={setFilters} filters={filters} pageKey="page" />
				<Input
					name="query"
					onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
					placeholder="Search by Document Number"
					size="md"
					suffix={<IcMSearchlight height="20px" width="20px" />}
					className={styles.search_div}
				/>
			</div>
			<CustomTable
				data={apiData}
				filters={filters}
				setFilters={setFilters}
				refetch={refetch}
				loading={loading}
				onPageChange={onPageChange}
			/>
			{!apiData?.list && !loading && <SelectState />}
			{!loading && apiData?.list?.length <= 0 && <EmptyStateDocs />}
		</div>
	);
}

export default History;
