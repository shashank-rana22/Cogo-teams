import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, DataType } from './Interfaces';
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

function CardList({
	fields = [],
	data = {},
	loading = false,
	page,
	setPage,
	finalList = [],
	setFinalList,
	functions,
} :Props) {
	const { list = [], total_count:totalCount = 0 } = data;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + 1);
			}
		}, 1000);
	}, [loading, setPage]);

	const handleRender = () => (finalList || [1, 2, 3, 4, 5]).map((singleitem) => (
		<CardItem
			singleitem={singleitem}
			fields={fields}
			functions={functions}
		/>
	));

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
			<Header fields={fields} />
			<div className={styles.scroll}>
				<InfiniteScroll
					pageStart={1}
					initialLoad={false}
					loadMore={loadMore}
					hasMore={page < Math.ceil(totalCount / 10)}
					loader={
                        !loading ? (
	<div className={styles.loading_style}>
		<Loader />
	</div>
                        ) : null
                    }
					useWindow={false}
					threshold={600}
				>
					<div className="card-list-data">{handleRender()}</div>
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

export default CardList;
