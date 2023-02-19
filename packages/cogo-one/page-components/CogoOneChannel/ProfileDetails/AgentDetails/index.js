import { Avatar, Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { isEmpty, snakeCase } from '@cogoport/utils';

import useGetUser from '../../../../hooks/useGetUser';
import FormatData from '../../../../utils/formatData';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';
import VoiceCallComponent from './VoiceCallComponent';

function AgentDetails({ activeMessageCard, activeTab, activeVoiceCard }) {
	const { user_details = {} } = activeMessageCard || {};
	const emptyState = isEmpty(user_details) && activeTab === 'message';

	const {
		userId,
		userMail,
		userMobile,
		userName,
		orgId,
		// agentId,
		// countryCode,
		leadUserId,
	} = FormatData({ activeMessageCard, activeTab, activeVoiceCard });

	const { userData, loading } = useGetUser({ userId, leadUserId });

	const {
		mobile_verified,
		whatsapp_verified,
	} = userData || {};

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

	return (
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
							<Placeholder height="13px" width="120px" margin="0px 0px 10px 0px" />
							<Placeholder height="13px" width="120px" margin="0px 0px 0px 0px" />
						</>
					) : (
						<>
							<div className={styles.name}>
								{userName || 'unknown user'}
							</div>
							<div className={styles.email}>
								{userMail || '-'}
							</div>
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
								<div className={styles.pill_name}>{item.label}</div>
							</Pill>
						</div>
					);
				})}
			</div>
			{loading ? (
				<Placeholder height="13px" width="220px" margin="0px 0px 0px 0px" />
			) : (
				<VoiceCallComponent
					userMobile={userMobile}
					orgId={orgId}
					// agentId={agentId}
					// countryCode={countryCode}
					userId={userId}
					userName={userName}
					emptyState={emptyState}
				/>

			)}
			<div className={styles.conversation_title}>Other Channels</div>
			<ConversationContainer userData={userData} userId={userId} />
		</>
	);
}
export default AgentDetails;
