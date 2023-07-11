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
	const { shipmentPendingTasks = [], totalRecords } = data;

	const handleRender = () => {
		if (loading || shipmentPendingTasks.length) {
			return (shipmentPendingTasks || []).map((singleitem:GenericObject) => (
				<CardItem
					key={singleitem.id}
					singleitem={singleitem}
					fields={fields}
					functions={functions}
					loading={loading}
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
				{!loading && Number(shipmentPendingTasks.length) > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(totalRecords)}
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
