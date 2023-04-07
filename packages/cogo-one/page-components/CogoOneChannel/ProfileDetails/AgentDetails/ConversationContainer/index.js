import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import OtherChannelsConfig from '../../../../../configurations/other-channels-config';
import hideDetails from '../../../../../utils/hideDetails';
import CommunicationModal from '../CommunicationModal';

import styles from './styles.module.css';

function ConversationContainer({
	userData,
	loading = false,
	noData = false,
	activeCardData = {},
	activeMessageCard = {},
	setActiveMessage,
	activeRoomLoading = false,
}) {
	const { user_channel_ids = {}, channel_type = '', user_details = {} } = activeMessageCard || {};
	const { business_name = '' } = user_details || {};
	const [modalType, setModalType] = useState(null);
	const showLoader = loading || activeRoomLoading;
	if (showLoader) {
		return ([...Array(2)].map(() => (
			<div className={styles.container}>
				<div className={styles.icon_type}>
					<Placeholder type="circle" radius="30px" />
				</div>
				<div className={styles.details}>
					<div className={styles.header}>
						<div className={styles.name}>
							<Placeholder
								height="16px"
								width="160px"
								margin="0px 0px 0px 0px"
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
				{OtherChannelsConfig
					.map(({ name, icon, value_type, other_channel_type }) => !isEmpty(userData?.[name])
						&& other_channel_type === 'email' && (
							<div
								role="presentation"
								className={styles.contacts_container}
								onClick={() => setModalType(other_channel_type)}
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
												data : userData?.[name],
												type : value_type,
											})}
										</div>
									</div>
								</div>
							</div>
					))}
				{OtherChannelsConfig
					.map(({ name, icon, value_type, other_channel_type, id_name = '' }) => !isEmpty(
						user_channel_ids?.[id_name],
					)
						&& other_channel_type !== channel_type
							&& (
								<div
									role="presentation"
									className={styles.contacts_container}
									onClick={() => {
										setActiveMessage({
											channel_type: other_channel_type, id: user_channel_ids?.[id_name],
										});
									}}
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
													data: userData?.[name]
														? userData?.[name]
														: business_name,
													type: value_type,
												})}
											</div>
										</div>
									</div>
								</div>
							))}
			</div>

			{modalType && (
				<CommunicationModal
					modalType={modalType}
					setModalType={setModalType}
					userData={userData}
					activeCardData={activeCardData}
				/>
			)}
		</>
	);
}

export default ConversationContainer;
