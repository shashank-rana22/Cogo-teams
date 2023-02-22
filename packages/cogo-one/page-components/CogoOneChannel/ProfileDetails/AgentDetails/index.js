import { Avatar, Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { isEmpty, snakeCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateLeadProfile from '../../../../hooks/useCreateLeadProfile';
import useGetUser from '../../../../hooks/useGetUser';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';
import VoiceCallComponent from './VoiceCallComponent';

function AgentDetails({
	activeMessageCard = {},
	activeTab,
	activeVoiceCard = {},
	FormattedMessageData = {},
	customerId = '',
}) {
	const { user_details = null, user_type } = activeMessageCard || {};
	const {
		user_id,
		lead_user_id,
		email,
		user_name: messageName,
		mobile_no,
		organization_id,
	} = FormattedMessageData || {};

	const [showAddNumber, setShowAddNumber] = useState(false);
	const [profileValue, setProfilevalue] = useState({
		name   : '',
		number : '',
	});

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

	const { leadUserProfile, loading: leadLoading, leadId } = useCreateLeadProfile();

	const { userData, loading } = useGetUser({ userId, id: { leade_user_id: leadUserId || leadId }, customerId });

	const { mobile_verified, whatsapp_verified } = userData || {};

	const VERIFICATION_STATUS = [
		{
			label      : mobile_verified ? 'Verified' : 'Not Verified',
			color      : 'green',
			size       : 'sm',
			prefixIcon : <IcMCall />,
		},
		{
			label      : whatsapp_verified ? 'Verified' : 'Not Verified',
			color      : 'green',
			size       : 'sm',
			prefixIcon : <IcCWhatsapp />,
		},
	];

	const handleSubmit = async () => {
		await leadUserProfile({ profileValue });
		setShowAddNumber(false);
		setProfilevalue({});
	};

	return (isEmpty(userId) && isEmpty(leadUserId)) && isEmpty(mobile_no) ? (
		<EmptyState
			type="profile"
			user_type={user_type}
			leadLoading={leadLoading}
			handleSubmit={handleSubmit}
			showAddNumber={showAddNumber}
			setProfilevalue={setProfilevalue}
			setShowAddNumber={setShowAddNumber}
			profileValue={profileValue}
		/>
	) : (
		<>
			<div className={styles.title}>Profile</div>
			<div className={styles.content}>
				<Avatar
					src="https://www.w3schools.com/howto/img_avatar.png"
					alt="img"
					disabled={false}
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
							<div className={styles.email}>{userEmail || '-'}</div>
						</>
					)}
				</div>
			</div>
			<div className={styles.verification_pills}>
				{VERIFICATION_STATUS.map((item, index) => {
					const itemKey = `${snakeCase(item.label)}_${index}`;
					return (
						<div key={itemKey}>
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
						</div>
					);
				})}
			</div>
			{loading ? (
				<Placeholder
					height="13px"
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
				/>
			)}
			{!isEmpty(mobile_no) && (
				<>
					<div className={styles.conversation_title}>Other Channels</div>
					<ConversationContainer userData={userData} userId={userId} />
				</>
			)}
		</>
	);
}
export default AgentDetails;
