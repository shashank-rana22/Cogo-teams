import { Loader, Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from './EmptyState';
import GetFinalList from './GetFinalList';
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
	functions?: FunctionObjects;
}

function List({
	fields = [],
	data = {},
	loading = false,
	page,
	setPage,
	functions,
} :Props) {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { list = {} }:any = data;
	const { finalData } = GetFinalList({ list, data, loading });

	const handleRender = () => ((finalData.length && finalData) || Array(6).fill(1)).map((singleitem) => (
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
				{!loading && (finalData.length) <= 0 && <EmptyState />}
				{!!(loading || finalData.length) && (<div className="card-list-data">{handleRender()}</div>)}
				{!loading && finalData.length > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={list?.totalRecords}
							pageSize={10}
							type="table"
							onPageChange={(val) => { setPage(val); }}
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
