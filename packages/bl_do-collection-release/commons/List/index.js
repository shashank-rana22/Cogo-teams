import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import Card from '../Card';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

export default function List({
	data = {},
	stateProps = {},
	couldBeCardsCritical = false,
	setStateProps = () => {},
	refetch = () => {},
}) {
	const [openItem, setOpenItem] = useState(null);
	const { list = [], total } = data;

	const renderPagination = (
		<div className={styles.pagination_container}>
			<Pagination
				type="table"
				currentPage={stateProps.page}
				onPageChange={(val) => setStateProps({ ...stateProps, page: val })}
				totalItems={total}
				pageSize={10}
			/>
		</div>
	);

	return (
		list.length === 0 ? <EmptyState /> : (
			<div className={styles.container}>
				{renderPagination}
				<div className={styles.list_container}>
					{list.map((item) => (
						<Card
							key={item?.id}
							item={item}
							stateProps={stateProps}
							setStateProps={setStateProps}
							couldBeCardsCritical={couldBeCardsCritical}
							openItem={openItem}
							refetch={refetch}
							setOpenItem={setOpenItem}
						/>
					))}
					{renderPagination}
				</div>
			</div>
		)
	);
}
