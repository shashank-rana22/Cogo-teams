import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAShipAmber } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EmptyState from '../../../common/EmptyState';
import ListLoader from '../ListLoader';

import styles from './styles.module.css';

const MSG_COUNT = 0;
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
	const { page } = filters;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setFilters((prev) => ({ ...prev, page: page + PAGE_FACTOR }));
			}
		}, TIME_DURATION_FOR_SET_TME_OUT);
	}, [loading, setFilters, page]);

	function RenderContent() {
		if (loading && page === PAGE_FACTOR) {
			return <ListLoader />;
		}

		if (!loading && !channelList?.length) {
			return <EmptyState isMobile />;
		}

		return channelList?.map((item) => (
			<Button
				key={item?.id}
				className={cl` ${styles.card} ${id === item?.id ? styles.colored : ''}`}
				themeType="tertiary"
				tabIndex={0}
				onClick={() => setId(item?.id)}
			>
				<div className={styles.ship_image_container}>
					<IcAShipAmber height={30} width={30} />
				</div>

				<div className={styles.card_item}>

					<div className={styles.serial_id}>{item?.channel_name}</div>

					<div className={styles.updated_at}>
						{formatDate({
							date       : item?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ' | ',
						})}
					</div>
				</div>

				{(messageContentArr || []).map((obj) => (
					obj?.mainKey === item?.id && obj[user_id] > MSG_COUNT && id !== item?.id ? (
						<div key={item?.id} className={styles.circle}>{obj[user_id]}</div>
					) : null))}
			</Button>
		));
	}

	return (
		<div className={styles.list_container} ref={refOuter}>
			<InfiniteScroll
				pageStart={1}
				initialLoad={false}
				loadMore={!showUnreadChat && loadMore}
				hasMore={page < total_page}
				useWindow={false}
			>
				{RenderContent()}
			</InfiniteScroll>

			{loading && !isEmpty(listData) && !showUnreadChat && (
				<div className={styles.custom_loader}>Loading...</div>
			)}
		</div>
	);
}
export default ListBody;
