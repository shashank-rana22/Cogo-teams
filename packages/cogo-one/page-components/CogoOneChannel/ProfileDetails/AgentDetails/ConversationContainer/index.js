import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CommunicationModal from '../../../../../common/CommunicationModal';
import otherChannelsConfig from '../../../../../configurations/other-channels-config';
import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

const LOADER_LENGTH = 2;

function ConversationContainer({
	userData = {},
	loading = false,
	noData = false,
	activeCardData = {},
	activeMessageCard = {},
	setActiveMessage = () => {},
	activeRoomLoading = false,
	viewType = '',
}) {
	const [modalType, setModalType] = useState(null);
	const { user_channel_ids = {}, channel_type = '', user_details = {} } = activeMessageCard || {};
	const { business_name = '' } = user_details || {};
	const showLoader = loading || activeRoomLoading;

	const modifiedOtherChannelsConfig = otherChannelsConfig.map((eachRoomConfig) => {
		const { id_name = '' } = eachRoomConfig || {};
		return {
			...eachRoomConfig, has_existing_room: id_name && (id_name in user_channel_ids),
		};
	});

	const closeModal = () => {
		setModalType(null);
	};

	const onCardClick = ({ other_channel_type, has_existing_room = false, id_name }) => {
		if (has_existing_room) {
			setActiveMessage({
				channel_type: other_channel_type, id: user_channel_ids?.[id_name],
			});
		} else {
			setModalType(other_channel_type);
		}
	};

	if (showLoader) {
		return ([...Array(LOADER_LENGTH).keys()].map((key) => (
			<div className={styles.container} key={key}>
				<div className={styles.icon_type}>
					<Placeholder type="circle" radius="30px" />
				</div>
				<div className={styles.details}>
					<div className={styles.header}>
						<div className={styles.name}>
							<Placeholder
								height="16px"
								width="160px"
							/>
						</div>
					</div>
					<div className={styles.organization}>
						<Placeholder
							height="10px"
							width="80px"
							margin="10px 0px 0px 0px"
						/>
					</div>
				</div>
			</div>
		))
		);
	}

	if ((isEmpty(userData) || noData)) {
		return <div className={styles.empty}>No data Found...</div>;
	}

	return (
		<>
			<div className={styles.wrapper}>
				{modifiedOtherChannelsConfig
					.map(({
						name,
						icon,
						value_type,
						other_channel_type,
						id_name = '',
						has_existing_room = false,
					}) => {
						const show = (!has_existing_room ? userData?.[name] : true)
						&& other_channel_type !== channel_type;
						return (
							show && (
								<div
									key={name}
									role="presentation"
									className={styles.contacts_container}
									onClick={() => onCardClick({ other_channel_type, id_name, has_existing_room })}
								>
									<div className={styles.container}>
										<div className={styles.icon_type}>
											{icon}
										</div>
										<div className={styles.details}>
											<div className={styles.header}>
												<div className={styles.name}>
													{userData?.name || ''}
												</div>
											</div>
											<div
												className={styles.organization}
											>
												{hideDetails({
													data : userData?.[name] || business_name,
													type : value_type,
												})}
											</div>
										</div>
									</div>
								</div>
							)
						);
					})}
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
