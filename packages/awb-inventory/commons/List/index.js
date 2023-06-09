import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import CONSTANTS from '../../configurations/constants';

import EmptyState from './EmptyState';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const { START_PAGE, MOBILE_SCREEN_SIZE, EMPTY_LIST_SIZE } = CONSTANTS;
const TIMEOUT_TIME = 1000;
const HAS_MORE_COUNT = 10;

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page,
	setPage,
	functions,
	finalList,
	setFinalList,
}) {
	const [isMobile, setIsMobile] = useState(false);
	const { list = [], total_count:totalCount } = listData;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((p) => p + START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [loading, setPage]);

	const render = () => {
		if (loading || finalList.length) {
			return (finalList || []).map((singleitem) => (
				<ListItem
					key={singleitem.id}
					singleitem={singleitem}
					fields={fields}
					functions={functions}
					isMobile={isMobile}
				/>
			));
		}
		return <EmptyState />;
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < MOBILE_SCREEN_SIZE) {
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
			if (page === START_PAGE) {
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
					hasMore={page < Math.ceil(totalCount / HAS_MORE_COUNT)}
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
				{finalList.length === totalCount && finalList.length > EMPTY_LIST_SIZE ? (
					<div className={styles.end_message}>No more data to show</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
