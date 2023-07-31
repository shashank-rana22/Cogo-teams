import { cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAShipAmber } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EmptyState from '../../common/EmptyState';
import useGetChannel from '../../hooks/useGetChannel';
import useGetShipmentChatList from '../../hooks/useGetShipmentChatList';
import useUpdateSeen from '../../hooks/useUpdateSeen';
import Details from '../Details';

import ListHeader from './ListHeader';
import ListLoader from './ListLoader';
import styles from './styles.module.css';

const TIME_DURATION_FOR_SET_TME_OUT = 200;
const PAGE_FACTOR = 1;
const MSG_COUNT = 0;

function List({
	setShow = () => { },
	messageContentArr = [],
	user_id = '',
	setSeenLoading = () => { },
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const refOuter = useRef(null);
	const [id, setId] = useState('');
	const [showUnreadChat, setShowUnreadChat] = useState(false);
	const [status, setStatus] = useState('active');
	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});
	const [filters, setFilters] = useState({ page: 1 });
	const { page, q } = filters;

	const getListPayload = {
		page,
		filters: {
			subscribe_user_id: user_id,
			status,
			q,
		},
	};
	const states = { list, setList };
	const { listData, total_page, loading } = useGetShipmentChatList({ payload: getListPayload, states });

	const defaultChannel = listData?.find((obj) => obj?.source_id === shipment_data?.id);
	const channelId = defaultChannel ? defaultChannel?.id : listData[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const updateSeenPayload = { id, showUnreadChat };
	const { loading: seenLoading } = useUpdateSeen({ payload: updateSeenPayload });

	const getChannelPayload = { id };
	const {
		loadingChannel,
		getChannel,
		channel,
	} = useGetChannel({ payload: getChannelPayload });

	const get = {
		loadingChannel,
		refetch : getChannel,
		data    : {
			channelData    : channel?.summary || {},
			primaryService : channel?.primary_service_detail,
		},
	};

	let unSeenMsg = [];
	unSeenMsg = messageContentArr.filter((item) => item[user_id]);
	const unreadDataList = unSeenMsg?.map((obj) => obj?.channel_details);
	const channelList = showUnreadChat ? unreadDataList : listData;

	const handleClick = () => {
		refOuter.current.scrollTop = 0;
		setShowUnreadChat(!showUnreadChat);
	};

	useEffect(() => {
		setId(channelId);
	}, [channelId]);

	useEffect(() => {
		setSeenLoading(seenLoading);
	}, [seenLoading, setSeenLoading]);

	useEffect(() => {
		refOuter.current.scrollTop = 0;
		setList({
			data       : [],
			total      : 0,
			total_page : 0,
		});
		setFilters({ page: 1 });
	}, [status, setFilters]);

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setFilters({ ...filters, page: page + PAGE_FACTOR });
			}
		}, TIME_DURATION_FOR_SET_TME_OUT);
	}, [loading, filters, setFilters, page]);

	const renderContent = () => {
		if (loading && isEmpty(listData)) {
			return <ListLoader />;
		}

		if (!loading && !channelList?.length) {
			return <EmptyState isMobile />;
		}

		return channelList?.map((item) => (
			<div
				key={item?.id}
				className={cl` ${styles.card} ${id === item?.id ? styles.colored : ''}`}
				role="button"
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
			</div>
		));
	};

	return (
		<div style={{ display: 'flex' }}>
			<div className={styles.container}>

				<ListHeader
					status={status}
					setStatus={setStatus}
					setShow={setShow}
					filters={filters}
					setFilters={setFilters}
					showUnreadChat={showUnreadChat}
					handleClick={handleClick}
				/>

				<div className={styles.list_container} ref={refOuter}>
					<InfiniteScroll
						pageStart={1}
						initialLoad={false}
						loadMore={!showUnreadChat && loadMore}
						hasMore={page < total_page}
						useWindow={false}
					>
						{renderContent()}
					</InfiniteScroll>

					{loading && !isEmpty(listData) && !showUnreadChat && (
						<div className={styles.custom_loader}>Loading...</div>
					)}
				</div>

			</div>

			{(!id || (!loading && isEmpty(channelList))) ? (
				<div className={styles.initial_state}>
					<img
						src={GLOBAL_CONSTANTS.image_url.ic_initial_state_svg}
						alt="empty"
					/>

					<div className={styles.text}>
						Welcome to Cogo Chat
					</div>
				</div>
			) : (
				channelList?.map((item) => (
					<Details
						key={item?.id}
						setShow={setShow}
						subscribedUsers={item?.subscribed_user_ids}
						id={item?.id}
						activeId={id}
						sourceId={item?.source_id}
						source={item?.source}
						get={get}
						personalData={channel}
					/>
				))
			)}
		</div>
	);
}

export default List;
