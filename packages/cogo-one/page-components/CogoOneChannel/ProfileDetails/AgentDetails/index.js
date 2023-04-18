import { Avatar, Pill, Placeholder, Toast } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { isEmpty, snakeCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateLeadProfile from '../../../../hooks/useCreateLeadProfile';
import useGetUser from '../../../../hooks/useGetUser';
import hideDetails from '../../../../utils/hideDetails';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';
import VoiceCallComponent from './VoiceCallComponent';

function AgentDetails({
	activeMessageCard = {},
	activeTab,
	activeVoiceCard = {},
	formattedMessageData = {},
	customerId = '',
	updateLeaduser = () => {},
	setModalType = () => {},
	setActiveMessage = () => {},
	activeRoomLoading,
}) {
	const {
		user_details = null,
		user_type, id = '',
		channel_type = '',
	} = activeMessageCard || {};

	const {
		user_id,
		lead_user_id,
		email,
		user_name: messageName,
		mobile_no,
		organization_id,
		sender,
		channel_type,
	} = formattedMessageData || {};

	const [showAddNumber, setShowAddNumber] = useState(false);
	const [profileValue, setProfilevalue] = useState({
		name         : '',
		country_code : '+91',
		number       : '',
	});
	const [showError, setShowError] = useState(false);

	const emptyState = isEmpty(user_details) && activeTab === 'message';

	const {
		user_data = {},
		user_number = '',
		organization_id: voiceOrgId = '',
	} = activeVoiceCard || {};

	const DATA_MAPPING = {
		voice: {
			userId        : user_data?.id,
			name          : user_data?.name,
			userEmail     : user_data?.email,
			mobile_number : user_number,
			orgId         : voiceOrgId,
			leadUserId    : null,
		},
		message: {
			userId        : user_id,
			name          : messageName,
			userEmail     : email,
			mobile_number : mobile_no,
			orgId         : organization_id,
			leadUserId    : lead_user_id,
		},
	};

	const { userId, name, userEmail, mobile_number, orgId, leadUserId } = DATA_MAPPING[activeTab];

	const { leadUserProfile, loading: leadLoading } = useCreateLeadProfile({ updateLeaduser, setShowError, sender });

	const { userData, loading } = useGetUser({ userId, lead_user_id: leadUserId, customerId });

	const { mobile_verified, whatsapp_verified } = userData || {};

	const VERIFICATION_STATUS = [
		{
			label      : mobile_verified ? 'Verified' : 'Not Verified',
			color      : mobile_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcMCall />,
		},
		{
			label      : whatsapp_verified ? 'Verified' : 'Not Verified',
			color      : whatsapp_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcCWhatsapp />,
		},
	];

	const handleSubmit = async () => {
		if (!isEmpty(profileValue?.name) && !isEmpty(profileValue?.number)) {
			await leadUserProfile({ profileValue });
			setShowAddNumber(false);
			setProfilevalue({});
		} else {
			setShowError(true);
		}
	};

	const handleClick = () => {
		const OMNICHANNEL_URL = window?.location?.href?.split('?')?.[0];
		navigator.clipboard.writeText(`${OMNICHANNEL_URL}?assigned_chat=${id}&channel_type=${channel_type}`);
		Toast.success('Copied!!!');
	};

	return (isEmpty(userId) && isEmpty(leadUserId) && isEmpty(mobile_no) && activeRoomLoading) ? (
		<>
			<div className={styles.title}>Profile</div>
			<EmptyState
				type="profile"
				user_type={user_type}
				leadLoading={leadLoading}
				handleSubmit={handleSubmit}
				showAddNumber={showAddNumber}
				setProfilevalue={setProfilevalue}
				setShowAddNumber={setShowAddNumber}
				profileValue={profileValue}
				showError={showError}
				setShowError={setShowError}
			/>
		</>
	) : (
		<>
			<div className={styles.top_div}>
				<div className={styles.title}>Profile</div>
				{activeTab === 'message' && (
					<div
						role="presentation"
						className={styles.copy_link}
						onClick={handleClick}
					>
						Share
					</div>
				)}
			</div>
			<div className={styles.content}>
				<Avatar
					src="https://www.w3schools.com/howto/img_avatar.png"
					alt="img"
					disabled={false}
					className={styles.user_div}
				/>

				<div className={styles.details}>
					{loading ? (
						<>
							<Placeholder
								height="13px"
								width="120px"
								margin="0px 0px 10px 0px"
							/>
							<Placeholder
								height="13px"
								width="120px"
								margin="0px 0px 0px 0px"
							/>
						</>
					) : (
						<>
							<div className={styles.name}>
								{name || 'unknown user'}
							</div>
							<div className={styles.email}>
								{userEmail ? hideDetails({ data: userEmail, type: 'mail' }) : ''}
							</div>
						</>
					)}
				</div>
			</div>
			{(leadUserId || userId) && (
				<div className={styles.verification_pills}>
					{VERIFICATION_STATUS.map((item, index) => {
						const itemKey = `${snakeCase(item.label)}_${index}`;
						return (
							<div key={itemKey}>
								{loading ? (
									<Placeholder
										height="20px"
										width="120px"
										margin="10px 0px 10px 0px"
									/>
								) : (
									<Pill
										key={item.label}
										prefix={item.prefixIcon}
										size="md"
										color={item.color}
									>
										<div className={styles.pill_name}>
											{item.label}
										</div>
									</Pill>
								)}
							</div>
						);
					})}
				</div>
			)}
			{loading ? (
				<Placeholder
					height="50px"
					width="220px"
					margin="0px 0px 0px 0px"
				/>
			) : (
				<VoiceCallComponent
					userMobile={mobile_number}
					orgId={orgId}
					userId={userId}
					userName={name}
					emptyState={emptyState}
					activeTab={activeTab}
					setModalType={setModalType}
				/>
			)}
			{(mobile_no || user_number) && (
				<>
					<div className={styles.conversation_title}>Other Channels</div>
					<ConversationContainer
						userData={userData}
						noData={!leadUserId && !userId}
						loading={loading}
						activeCardData={DATA_MAPPING[activeTab] || {}}
						activeMessageCard={activeMessageCard}
						setActiveMessage={setActiveMessage}
						leadLoading={leadLoading}
						activeRoomLoading={activeRoomLoading}
					/>
				</>
			)}
		</>
	);
}
export default AgentDetails;
