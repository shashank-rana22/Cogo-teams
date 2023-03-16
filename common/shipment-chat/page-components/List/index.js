import React, {
	useState,
	useEffect,
	useContext,
	useCallback,
	useRef,
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Input, Popover, cl } from '@cogoport/components';
// import { Flex } from '@cogoport/front/components';
// import formatDate from '@cogo/globalization/utils/formatDate';
// import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { isEmpty, startCase } from '@cogoport/utils';
import {
	IcMArrowDown,
	IcMSearchlight,
	IcMArrowBack,
	IcMUnread,
} from '@cogoport/icons-react';
// import Details from '../Details';
import useGetShipmentChatList from '../../hooks/useGetShipmentChatList';
// import { ShipmentDetailContext } from '../../../Context';
import EmptyState from '../../common/EmptyState';
// import CreateChannel from './CreateChannel';
// import useUpdateSeen from '../hooks/useUpdateSeen';
import useGetChannel from '../../hooks/useGetChannel';
// import ListLoader from './ListLoader';
import styles from './styles.module.css';

// import {
// 	Container,
// 	Heading,
// 	Search,
// 	ListContainer,
// 	Card,
// 	SerialId,
// 	UpdatedAt,
// 	Circle,
// 	SubContainer,
// 	Initial,
// 	MenuCloseBtn,
// 	FilterBox,
// 	CustomLoader,
// 	Header,
// 	ChannelsType,
// 	Text,
// 	PopoverContainer,
// 	Line,
// } from './styles';

const List = ({
	setShow = () => { },
	isMobile,
	MessageContentArr = [],
	user_id = '',
	setSeenLoading = () => { },
}) => {
	const refOuter = useRef(null);
	// const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [count, setCount] = useState(0);
	const [storeId, useStoreId] = useState();
	const [id, setId] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [showUnreadChat, setShowUnreadChat] = useState(false);
	const [status, setStatus] = useState('active');

	const { ListData, page, total_page, filters, hookSetters, loading, refetch } =
		useGetShipmentChatList({ status });

	// const defaultChannel = ListData?.find((obj) => {
	// 	return obj?.source_id === shipment_data?.id;
	// });

	const defaultChannel = {};

	const data = defaultChannel ? defaultChannel?.id : ListData[0]?.id;

	// const { onCreate, loading: seenLoading } = useUpdateSeen({ channel_id: id });

	const { get, personal_data } = useGetChannel({ channel_id: id });

	// useEffect(() => {
	// 	setSeenLoading(seenLoading);
	// }, [seenLoading]);

	useEffect(() => {
		// if (id && !showUnreadChat) {
		// 	onCreate(id);
		// } else if (showUnreadChat && count === 0) {
		// 	setCount(1);
		// 	useStoreId(id);
		// } else {
		// 	setCount(0);
		// 	onCreate(storeId);
		// }
	}, [id, showUnreadChat]);

	useEffect(() => {
		setId(data);
	}, [data]);

	let unSeenMsg = [];
	unSeenMsg = MessageContentArr.filter((item) => {
		return item[user_id];
	});

	const unreadDataList = unSeenMsg?.map((obj) => {
		return obj?.channel_details;
	});

	const handleClick = () => {
		refOuter.current.scrollTop = 0;
		setShowUnreadChat(!showUnreadChat);
	};

	const channelList = showUnreadChat ? unreadDataList : ListData;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!loading) {
				hookSetters.setFilters({ ...filters, page: page + 1 });
			}
		}, 200);
	}, [loading]);

	const renderContent = () => {
		// if (loading && isEmpty(ListData)) {
		// 	return <ListLoader />;
		// }

		if (!loading && !channelList?.length) {
			return <EmptyState isMobile />;
		}

		return channelList?.map((item) => {
			const className = id === item?.id ? 'colored' : 'not_color';

			return (
				<div className={styles.card} onClick={() => setId(item?.id)} className={className}>
					<Flex direction="column">
						<div className={styles.serial_id} className={className}>{item?.channel_name}</div>

						{/* <UpdatedAt className={className}>
							{formatDate({
								date: item?.updated_at,
								dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat: GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType: 'dateTime',
								separator: ' | ',
							})}
						</UpdatedAt> */}
					</Flex>

					{(MessageContentArr || []).map((obj) =>
						obj?.mainKey === item?.id && obj[user_id] > 0 && id !== item?.id ? (
							<div className={styles.circle}>{obj[user_id]}</div>
						) : null,
					)}
				</div>
			);
		});
	};

	const handleSelect = (currentStatus) => {
		refOuter.current.scrollTop = 0;
		hookSetters.setFilters({ page: 1 });
		setStatus(currentStatus);
	};

	const content = () => {
		return (
			<div className={styles.channels_type}>
				<div className={styles.text} onClick={() => handleSelect('active')}>Active</div>
				<div className={styles.line} />
				<div className={styles.text} onClick={() => handleSelect('inactive')}> Inactive</div>
			</div>
		);
	};

	return (
		<>
			<div className={cl`${styles.container} ${showMenu ? styles.show_menu : ''}`}>
				<div className={styles.popover_container}>
					<Popover
						theme="light"
						interactive
						placement="top"
						content={content()}
					>
						<div className={styles.header}>
							<div className={styles.heading}>{startCase(status)} Shipments </div>
							<IcMArrowDown width={15} height={15} />
						</div>
					</Popover>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.search}>
						<Input
							className="primary sm"
							value={filters?.q}
							placeholder="Search for a Shipment ID"
							onChange={(e) =>
								hookSetters.setFilters({
									...(filters || {}),
									q: e.target?.value,
								})
							}
							suffix={<IcMSearchlight />}
						/>
						<div className={styles.filter_box}
							className={showUnreadChat ? 'filled' : ' '}
							onClick={() => handleClick()}
						>
							<IcMUnread />
						</div>
					</div>

					<div className={styles.list_container} ref={refOuter}>
						{/* <InfiniteScroll
							pageStart={1}
							initialLoad={false}
							loadMore={!showUnreadChat && loadMore}
							hasMore={page < total_page}
							useWindow={false}
						>
							{renderContent()}
						</InfiniteScroll> */}
						<div>
							{renderContent()}
						</div>

						{loading && !isEmpty(ListData) && !showUnreadChat && (
							<div className={styles.custom_loader}>Loading...</div>
						)}
					</div>

					{isMobile ? (
						<div className={styles.menu_close_btn}>
							<IcMArrowBack
								width={21}
								height={21}
								onClick={() => setShowMenu(false)}
							/>
						</div>
					) : null}

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
				// channelList?.map((item) => (
				// 	<Details
				// 		setShow={setShow}
				// 		subscribedUsers={item?.subscribed_user_ids}
				// 		id={item?.id}
				// 		activeId={id}
				// 		sourceId={item?.source_id}
				// 		source={item?.source}
				// 		onSeen={onCreate}
				// 		setShowMenu={setShowMenu}
				// 		isMobile={isMobile}
				// 		get={get}
				// 		personal_data={personal_data}
				// 	/>
				// ))
				null
			)}
		</>
	);
};

export default List;
