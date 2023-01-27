import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

// import {
// 	NestedObj,
// 	FunctionObjects,
// 	ListDataProps,
// } from '../Interfaces/index';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
// import commonFunctions from './commonFunctions';
import styles from './styles.module.css';

// export interface Props {
// 	sort?: NestedObj;
// 	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>;
// 	itemData: ListDataProps;
// 	fields: any;
// 	functions?: FunctionObjects;
// 	loading?: boolean;
// 	currentPage?: number;
// 	handlePageChange?: (currentPage: number) => void;
// 	showPagination?: boolean;
// 	showHeader?: boolean;
// 	setPage?: any;
// 	finalData?: any;
// 	setFinalData?: any;
// 	activeTab?: any;
// 	checkedRows?: any;
// 	setCheckedRows?: any;
// 	setBulkEnabled?: any;
// }

function CardList({
	fields = [],
	data = [],
	loading = false,
	statsLoading,
	setEdit = false,
	setItem,
	setPage,
	page,
	finalList = [],
	setFinalList,
	functions = () => {},
}) {
	const { list = [], total_count = 0 } = data;

	console.log('loading', loading);

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + 1);
			}
		}, 1000);
	}, [loading]);

	const handleRender = () => (finalList || [1, 2, 3, 4, 5]).map((singleitem) => (
		<CardItem
			singleitem={singleitem}
			loading={loading}
			fields={fields}
			functions={functions}
		/>
	));

	useEffect(() => {
		if (page === 1) {
			setFinalList([...list]);
		} else {
			setFinalList(finalList.concat(list));
		}
	}, [list]);

	return (
		<section>
			<Header fields={fields} />
			<div className={styles.scroll}>
				<InfiniteScroll
					pageStart={1}
					initialLoad={false}
					loadMore={loadMore}
					hasMore={page < Math.ceil(total_count / 10)}
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
				{finalList.length === total_count && finalList.length > 0 ? (
					<div className={styles.end_message}>No more data to show</div>
				) : null}
			</div>
		</section>
	);
}

export default CardList;
