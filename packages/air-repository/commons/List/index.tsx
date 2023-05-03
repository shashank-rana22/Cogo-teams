import { Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, ListDataType } from './Interfaces';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: ListDataType;
	loading?: boolean;
	page?: number;
	setPage?: Function;
	functions?: FunctionObjects;
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page,
	setPage,
	functions,
} :Props) {
	const { list = {}, total_count:totalCount } = listData;

	const render = () => {
		type TypeObject = string | number | Date | null | React.FC ;
		const showlist:TypeObject = list.length ? list : Array(6).fill(1);

		if (loading || list.length) {
			return (showlist).map((singleitem) => (
				<div className="card-list-data">
					<ListItem
						singleitem={singleitem}
						fields={fields}
						functions={functions}
						loading={loading}
					/>
				</div>
			));
		}
		return <EmptyState />;
	};

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				{render()}
				{!loading && Number(list.length) > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(totalCount)}
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
