import { Loader, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';

import EmptyState from './EmptyState';
import GetFinalList from './GetFinalList';
import GetLocation from './GetFinalList/GetLocation';
import { FunctionObjects, FieldType, DataType } from './Interfaces';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: DataType;
	loading?: boolean;
	page?: number;
	setPage?: any;
	finalList?: any;
	setFinalList?: any;
	functions?: FunctionObjects;
}

function List({
	fields = [],
	data = {},
	loading = false,
	page,
	setPage,
	finalList = [],
	setFinalList,
	functions,
} :Props) {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { list = {}, total_count = 0 } = data;
	const { finalData } = GetFinalList({ list, data, loading });

	const handleRender = () => (finalData || [1, 2, 3, 4, 5]).map((singleitem) => (
		<ListItem
			singleitem={singleitem}
			fields={fields}
			functions={functions}
			loading={loading}
		/>
	));

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				{!loading && finalData.length <= 0 ? <EmptyState />
					: <div className="card-list-data">{handleRender()}</div>}
				{
					loading && <div className={styles.loader}><Loader /></div>
				}
				{!loading && finalData.length > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={total_count}
							pageSize={10}
							type="table"
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
