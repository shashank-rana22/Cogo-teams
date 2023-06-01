import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

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
	finalList?: Array<object>;
	setFinalList?: Function;
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page,
	setPage,
	functions,
	finalList,
	setFinalList,
} :Props) {
	const [isMobile, setIsMobile] = useState(false);
	const { list = [], total_count:totalCount } = listData;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + 1);
			}
		}, 1000);
	}, [loading, setPage]);

	const render = () => {
		if (loading || finalList.length) {
			return (finalList || [1, 2, 3, 4, 5]).map((singleitem) => (
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

	useEffect(() => {
		if (!isEmpty(list)) {
			if (page === 1) {
				setFinalList([...list]);
			} else {
				setFinalList(finalList.concat(list));
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	return (
		<section>
			{!isMobile && <ListHeader fields={fields} />}
			<div className={styles.scroll}>
				<InfiniteScroll
					pageStart={1}
					initialLoad={false}
					loadMore={loadMore}
					hasMore={page < Math.ceil(totalCount / 10)}
					loader={!loading ? (
						<div className={styles.loading_style}>
							<Loader />
						</div>
					) : null}
					useWindow={false}
					threshold={600}
				>
					<div>{render()}</div>
				</InfiniteScroll>
				{isEmpty(finalList) && !loading ? <EmptyState /> : null}
				{loading && (
					<div className={styles.loading_style}>
						<Loader />
					</div>
				)}
				{finalList.length === totalCount && finalList.length > 0 ? (
					<div className={styles.end_message}>No more data to show</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
