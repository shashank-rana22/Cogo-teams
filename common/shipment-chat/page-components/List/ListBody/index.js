import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import RenderList from './RenderList';
import styles from './styles.module.css';

const PAGE_FACTOR = 1;
const TIME_DURATION_FOR_SET_TME_OUT = 200;

function ListBody({
	loading = true,
	filters = { page: 1 },
	channelList = {},
	id = '',
	setId = () => {},
	messageContentArr = {},
	user_id = '',
	refOuter = {},
	showUnreadChat = false,
	total_page = 1,
	listData = {},
	setFilters = () => {},
}) {
	const { page = 1 } = filters || {};

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setFilters((prev) => ({ ...prev, page: page + PAGE_FACTOR }));
			}
		}, TIME_DURATION_FOR_SET_TME_OUT);
	}, [loading, setFilters, page]);

	return (
		<div className={styles.list_container} ref={refOuter}>
			<InfiniteScroll
				pageStart={1}
				initialLoad={false}
				loadMore={!showUnreadChat && loadMore}
				hasMore={page < total_page}
				useWindow={false}
			>
				<RenderList
					loading={loading}
					page={page}
					channelList={channelList}
					id={id}
					setId={setId}
					messageContentArr={messageContentArr}
					user_id={user_id}
				/>
			</InfiniteScroll>

			{(loading && !isEmpty(listData) && !showUnreadChat) ? (
				<div className={styles.custom_loader}>Loading...</div>
			) : null}
		</div>
	);
}
export default ListBody;
