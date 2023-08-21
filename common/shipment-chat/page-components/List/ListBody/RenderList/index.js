import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAShipAmber } from '@cogoport/icons-react';

import EmptyState from '../../../../common/EmptyState';
import ListLoader from '../../ListLoader';

import styles from './styles.module.css';

const MSG_COUNT = 0;
const PAGE_FACTOR = 1;

function RenderList({
	loading = false,
	page = 1,
	channelList = {},
	id = '',
	setId = () => {},
	messageContentArr = {},
	user_id = '',
}) {
	if (loading && page === PAGE_FACTOR) {
		return <ListLoader />;
	}

	if (!loading && !channelList?.length) {
		return <EmptyState isMobile />;
	}

	return (channelList || []).map((item) => (
		<div key={item?.id} className={id === item?.id ? styles.selected : ''}>
			<Button
				className={styles.card}
				themeType="tertiary"
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
					obj?.mainKey === item?.id && obj?.[user_id] > MSG_COUNT && id !== item?.id ? (
						<div key={item?.id} className={styles.circle}>{obj?.[user_id]}</div>
					) : null))}
			</Button>
		</div>
	));
}

export default RenderList;
