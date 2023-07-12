import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function CardList({
	fields = [],
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
}) {
	const { shipmentPendingTasks = [], totalRecords } = data;

	const handleRender = () => {
		if (loading || shipmentPendingTasks.length) {
			return (shipmentPendingTasks || []).map((singleitem) => (
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
				{!loading && !isEmpty(shipmentPendingTasks.length) ? (
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
