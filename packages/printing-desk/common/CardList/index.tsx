import { Pagination } from '@cogoport/components';
import React from 'react';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, DataType, GenericObject } from './Interfaces';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: DataType;
	loading?: boolean;
	page?: number;
	setPage?: React.FC;
	functions?: FunctionObjects;
}

function CardList({
	fields = [],
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
} :Props) {
	const { list = [], total_count:totalCount } = data;

	const handleRender = () => {
		if (loading || list.length) {
			return (list || []).map((singleitem:GenericObject) => (
				<CardItem
					key={singleitem.id}
					singleitem={singleitem}
					fields={fields}
					functions={functions}
				/>
			));
		}
		return <EmptyState />;
	};

	return (
		<section>
			<Header fields={fields} />
			<div className={styles.scroll}>
				{handleRender()}
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

export default CardList;
