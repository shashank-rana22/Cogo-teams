import { Input, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSearchlight, IcMUnread } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EmptyState from '../../common/EmptyState';
// import CreateChannel from './CreateChannel';
import useGetChannel from '../../hooks/useGetChannel';
import useGetShipmentChatList from '../../hooks/useGetShipmentChatList';
import useUpdateSeen from '../../hooks/useUpdateSeen';
import Details from '../Details';

import ListHeader from './ListHeader';
import ListLoader from './ListLoader';
import styles from './styles.module.css';

function List({
	setShow = () => { },
	isMobile,
	MessageContentArr = [],
	user_id = '',
	setSeenLoading = () => { },
}) {
	const refOuter = useRef(null);
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [count, setCount] = useState(0);
	const [storeId, useStoreId] = useState();
	const [id, setId] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [showUnreadChat, setShowUnreadChat] = useState(false);
	const [status, setStatus] = useState('active');

	console.log(GLOBAL_CONSTANTS, 'GLOBAL_CONSTANTS');

	const {
		ListData, page, total_page, filters, setFilters,
		loading, refetch,
	} = useGetShipmentChatList({ status });

	const defaultChannel = ListData?.find((obj) => obj?.source_id === shipment_data?.id);
	const data = defaultChannel ? defaultChannel?.id : ListData[0]?.id;

	const { onCreate, loading: seenLoading } = useUpdateSeen({ channel_id: id });

	const { get, personal_data } = useGetChannel({ channel_id: id });

	useEffect(() => {
		setSeenLoading(seenLoading);
	}, [seenLoading, setSeenLoading]);

	useEffect(() => {
		if (id && !showUnreadChat) {
			onCreate(id);
		} else if (showUnreadChat && count === 0) {
			setCount(1);
			// useStoreId(id);
		} else {
			setCount(0);
			onCreate(storeId);
		}
	}, [id, showUnreadChat, count, storeId, onCreate]);

	useEffect(() => {
		setId(data);
	}, [data]);

	let unSeenMsg = [];
	unSeenMsg = MessageContentArr.filter((item) => item[user_id]);

	const unreadDataList = unSeenMsg?.map((obj) => obj?.channel_details);

	const handleClick = () => {
		refOuter.current.scrollTop = 0;
		setShowUnreadChat(!showUnreadChat);
	};

	console.log(refOuter, 'refOuter');

	const channelList = showUnreadChat ? unreadDataList : ListData;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				setFilters({ ...filters, page: page + 1 });
			}
		}, 200);
	}, [loading, filters, setFilters, page]);

	console.log(filters, 'qqqqqqq');

	const renderContent = () => {
		if (loading && isEmpty(ListData)) {
			return <ListLoader />;
		}

		if (!loading && !channelList?.length) {
			return <EmptyState isMobile />;
		}

		return channelList?.map((item) => (
			<div
				className={cl` ${styles.card} ${id === item?.id ? styles.colored : ''}`}
				role="button"
				tabIndex={0}
				onClick={() => setId(item?.id)}
			>
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

				{(MessageContentArr || []).map((obj) => (
					obj?.mainKey === item?.id && obj[user_id] > 0 && id !== item?.id ? (
						<div className={styles.circle}>{obj[user_id]}</div>
					) : null))}
			</div>
		));
	};

	useEffect(() => {
		setFilters({ page: 1 });
		refOuter.current.scrollTop = 0;
	}, [status, setFilters]);

	return (
		<div style={{ display: 'flex' }}>
			<div className={cl`${styles.container} ${showMenu ? styles.show_menu : ''}`}>

				<ListHeader
					status={status}
					setStatus={setStatus}
					setShow={setShow}
				/>

				<div className={styles.sub_container}>
					<div className={styles.search}>
						<Input
							value={filters?.q}
							placeholder="Search"
							onChange={(e) => setFilters({
								...(filters || {}),
								q: e,
							})}
							suffix={<IcMSearchlight />}
						/>
						<div
							className={styles.filter_box}
							role="button"
							tabIndex={0}
							// className={showUnreadChat ? 'filled' : ' '}
							onClick={() => handleClick()}
						>
							<IcMUnread />
						</div>
					</div>

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
						<div>
							{renderContent()}
						</div>

						{loading && !isEmpty(ListData) && !showUnreadChat && (
							<div className={styles.custom_loader}>Loading...</div>
						)}
					</div>

					{/* <CreateChannel refetch={refetch} /> */}
				</div>
			</div>

			{!id ? (
				<div className={styles.initial}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-initialstate.svg"
						alt="empty"
						style={{ width: '38em', height: '17em' }}
					/>

					<span style={{ fontSize: '18px', fontWeight: '600' }}>
						Welcome to Cogo Chat
					</span>
				</div>
			) : (
				channelList?.map((item) => (
					<Details
						setShow={setShow}
						subscribedUsers={item?.subscribed_user_ids}
						id={item?.id}
						activeId={id}
						sourceId={item?.source_id}
						source={item?.source}
						onSeen={onCreate}
						setShowMenu={setShowMenu}
						isMobile={isMobile}
						get={get}
						personal_data={personal_data}
					/>
				))
			)}
		</div>
	);
}

export default List;
