import { Pagination } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

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
	const [isMobile, setIsMobile] = useState(false);
	const { list = {}, total_count:totalCount } = listData;

	const render = () => {
		type TypeObject = string | number | Date | null | React.FC ;
		const showlist:TypeObject = list.length ? list : Array(6).fill(1);

		if (loading || list.length) {
			return (showlist).map((singleitem) => (
				<ListItem
					key={singleitem.id}
					singleitem={singleitem}
					fields={fields}
					functions={functions}
					loading={loading}
					isMobile={isMobile}
				/>
			));
		}
		return <EmptyState />;
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section>
			{!isMobile && <ListHeader fields={fields} />}
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
