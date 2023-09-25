import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import useGetTeamsMessages from '../../../../../../hooks/useGetTeamsMessages';
import ReceiveComponent from '../ReceiveComponent';
import SentComponent from '../SendComponent';

import styles from './styles.module.css';

const CONVERSATION_TYPE_MAPPING = {
	sent     : SentComponent,
	received : ReceiveComponent,
};
function LoadPrevMessages({
	loadingPrevMessages = false,
	isLastPage = false,
	refetch = () => {},
}) {
	if (loadingPrevMessages) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					alt="load"
					width={20}
					height={20}
				/>
			</div>
		);
	}

	return (
		<div className={styles.load_prev_messages}>
			{!isLastPage ? (
				<IcMRefresh
					className={styles.refresh_icon}
					onClick={refetch}
				/>
			) : null}
		</div>
	);
}

function MessagesThread({ firestore = {}, roomId = '' }) {
	const {
		firstLoadingMessages,
		messages = [],
		loadingPrevMessages = false,
		refetch = () => {},
		isLastPage = false,
		loggedInUserId = '',
		handleScroll = () => {},
	} = useGetTeamsMessages({ firestore, roomId });

	if (firstLoadingMessages) {
		return (
			<div className={styles.flex_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					type="video/gif"
					alt="loading"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	return (
		<div className={styles.main_container} onScroll={handleScroll}>
			<LoadPrevMessages
				loadingPrevMessages={loadingPrevMessages}
				isLastPage={isLastPage}
				refetch={refetch}
			/>

			<div className={styles.container}>
				{(messages || []).map((eachMessage) => {
					const conversationType = eachMessage?.send_by_id === loggedInUserId ? 'sent' : 'received';

					const Component = CONVERSATION_TYPE_MAPPING[conversationType];

					if (!Component) {
						return null;
					}

					return (
						<Component
							key={eachMessage?.created_at}
							eachMessage={eachMessage}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MessagesThread;
