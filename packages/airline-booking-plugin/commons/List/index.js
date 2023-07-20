import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import CONSTANTS from '../../constants/constants';

import EmptyState from './EmptyState';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const { START_PAGE, MOBILE_SCREEN_SIZE } = CONSTANTS;
const TIMEOUT_TIME = 1000;
const SCROLLING_LIMIT = 10;

function Render({ loading = false, finalList = [], fields = [], functions = {}, isMobile = false }) {
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
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
	finalList = [],
	setFinalList = () => {},
}) {
	const [isMobile, setIsMobile] = useState(false);
	const { list = [], total_count:totalCount } = listData;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setPage((prev) => prev + START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [loading, setPage]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < MOBILE_SCREEN_SIZE);
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
				setFinalList((prev) => prev.concat(list));
			}
		}
	}, [list, page, setFinalList]);

	return (
		<section>
			{!isMobile && <ListHeader fields={fields} />}
			<div className={styles.scroll}>
				<InfiniteScroll
					pageStart={1}
					initialLoad={false}
					loadMore={loadMore}
					hasMore={page < Math.ceil(totalCount / SCROLLING_LIMIT)}
					loader={!loading ? (
						<div className={styles.loading_style}>
							<Loader />
						</div>
					) : null}
					useWindow={false}
					threshold={600}
				>
					<Render
						loading={loading}
						finalList={finalList}
						fields={fields}
						functions={functions}
						isMobile={isMobile}
					/>

				</InfiniteScroll>
				{isEmpty(finalList) && !loading ? <EmptyState /> : null}
				{loading && (
					<div className={styles.loading_style}>
						<Loader />
					</div>
				)}
				{finalList.length === totalCount && !isEmpty(finalList) ? (
					<div className={styles.end_message}>No more data to show</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
