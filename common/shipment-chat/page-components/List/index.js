import { Button, Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext, useState, useEffect, useRef } from 'react';

import useGetChannel from '../../hooks/useGetChannel';
import useGetShipmentChatList from '../../hooks/useGetShipmentChatList';
import useUpdateSeen from '../../hooks/useUpdateSeen';
import Details from '../Details';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

const STATUS_MAPPING = {
	inactive : 'inactive',
	active   : 'active',
	unread   : 'unread',
};

function List({
	setShow = () => { },
	messageContentArr = [],
	user_id = '',
	setSeenLoading = () => {},
}) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const refOuter = useRef(null);

	const [id, setId] = useState('');

	const [showUnreadChat, setShowUnreadChat] = useState(false);

	const [status, setStatus] = useState('active');

	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});

	const [filters, setFilters] = useState({ page: 1, q: shipment_data?.serial_id });

	const { page = 1, q = '' } = filters || {};

	const getListPayload = {
		page,
		filters: {
			subscribe_user_id : user_id,
			status            : STATUS_MAPPING[status],
			q,
		},
	};

	const states = { list, setList };

	const { listData, total_page, loading } = useGetShipmentChatList({ payload: getListPayload, states });

	const defaultChannel = listData?.find((obj) => obj?.source_id === shipment_data?.id);

	const channelId = defaultChannel ? defaultChannel?.id : listData[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const updateSeenPayload = { id, showUnreadChat, status };

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
	(unreadDataList || []).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

	let filteredUnreadList = unreadDataList || [];

	if (q) {
		filteredUnreadList = (unreadDataList || []).filter(
			(item) => item?.channel_name?.toLowerCase()?.includes(q?.toString()?.toLowerCase()),
		);
	}

	const channelList = showUnreadChat || status === 'unread' ? filteredUnreadList : listData;

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
		setFilters({
			page : 1,
			q    : shipment_data?.serial_id,
		});
	}, [status, setFilters, shipment_data?.serial_id]);

	return (
		<div className={styles.list_container}>
			<div className={styles.container}>

				<ListHeader
					status={status}
					setStatus={setStatus}
					setShow={setShow}
					setFilters={setFilters}
					showUnreadChat={showUnreadChat}
					handleClick={handleClick}
					shipment_data={shipment_data}
				/>

				<ListBody
					total_page={total_page}
					loading={loading}
					filters={filters}
					channelList={channelList}
					id={id}
					setId={setId}
					messageContentArr={messageContentArr}
					user_id={user_id}
					refOuter={refOuter}
					showUnreadChat={showUnreadChat}
					listData={listData}
					setFilters={setFilters}
				/>

			</div>

			{(!id || isEmpty(channelList)) ? (
				<div className={styles.initial_state}>
					<Button
						themeType="tertiary"
						className={styles.close_icon}
						onClick={() => setShow(false)}
					>
						<IcMCross />
					</Button>

					{loading ? <Loader /> : (
						<>
							<img
								src={GLOBAL_CONSTANTS.image_url.ic_initial_state_svg}
								alt="empty"
							/>

							<div className={styles.text}>
								Welcome to Cogo Chat
							</div>
						</>
					)}
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
