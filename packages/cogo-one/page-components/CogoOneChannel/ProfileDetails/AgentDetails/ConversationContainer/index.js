import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CommunicationModal from '../../../../../common/CommunicationModal';
import otherChannelsConfig from '../../../../../configurations/other-channels-config';
import hideDetails from '../../../../../utils/hideDetails';

import LoadingState from './loadingState';
import styles from './styles.module.css';

const onCardClick = ({
	otherChannelType,
	hasExistingRoom = false,
	idName,
	userData,
	userChannelIds,
	setActiveMessage,
	setModalType,
	mailProps,
}) => {
	if (hasExistingRoom) {
		setActiveMessage({
			channel_type : otherChannelType,
			id           : userChannelIds?.[idName],
		});
		return;
	}

	if (otherChannelType === 'email') {
		const { setButtonType, setEmailState } = mailProps;
		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : '',
				subject       : '',
				toUserEmail   : [userData?.email],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
		return;
	}

	setModalType(otherChannelType);
};

function ConversationContainer({
	userData = {},
	loading = false,
	noData = false,
	activeCardData = {},
	activeMessageCard = {},
	setActiveMessage = () => {},
	activeRoomLoading = false,
	viewType = '',
	mailProps = {},
}) {
	const [modalType, setModalType] = useState(null);

	const {
		user_channel_ids = {},
		channel_type = '',
		user_details = {},
	} = activeMessageCard || {};

	const { business_name = '' } = user_details || {};
	const showLoader = loading || activeRoomLoading;

	const modifiedOtherChannelsConfig = otherChannelsConfig.map((eachRoomConfig) => {
		const { id_name = '' } = eachRoomConfig || {};

		return {
			...eachRoomConfig,
			has_existing_room: id_name && (id_name in user_channel_ids),
		};
	});

	const closeModal = () => {
		setModalType(null);
	};

	if (showLoader) {
		return <LoadingState />;
	}

	if ((isEmpty(userData) || noData)) {
		return (
			<div className={styles.empty}>
				No data Found...
			</div>
		);
	}

	return (
		<>
			<div className={styles.wrapper}>
				{modifiedOtherChannelsConfig.map(
					(item) => {
						const {
							name,
							icon,
							value_type,
							other_channel_type,
							id_name = '',
							has_existing_room = false,
						} = item;

						const show = (
							(has_existing_room ? true : userData?.[name]) && (other_channel_type !== channel_type)
						);

						if (!show) {
							return null;
						}

						return (
							<div
								key={name}
								role="presentation"
								className={styles.contacts_container}
								onClick={() => onCardClick({
									otherChannelType :	other_channel_type,
									idName           : id_name,
									hasExistingRoom  : has_existing_room,
									userChannelIds   : user_channel_ids,
									setActiveMessage,
									setModalType,
									mailProps,
									userData,
								})}
							>
								<div className={styles.container}>
									<div className={styles.icon_type}>{icon}</div>

									<div className={styles.details}>
										<div className={styles.header}>
											{userData?.name || ''}
										</div>

										<div className={styles.organization}>
											{hideDetails({
												data : userData?.[name] || business_name,
												type : value_type,
											})}
										</div>
									</div>
								</div>
							</div>
						);
					},
				)}
			</div>

			{modalType && (
				<CommunicationModal
					modalType={modalType}
					closeModal={closeModal}
					userData={userData}
					activeCardData={activeCardData}
					viewType={viewType}
				/>
			)}
		</>
	);
}

export default ConversationContainer;
