import { Avatar, Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { snakeCase } from '@cogoport/utils';

// import UserAvatar from '../../../common/UserAvatar';
import useGetUser from '../../../../hooks/useGetUser';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';
import VoiceCallComponent from './VoiceCallComponent';

function AgentDetails({ activeMessageCard, activeTab, activeVoiceCard }) {
	const { user_id: userId } = activeVoiceCard || {};
	const { user_id } = getActiveCardDetails(activeMessageCard);
	const { user_id: mobileNumber } = activeMessageCard || {};

	const { user_data = {} } = activeVoiceCard || {};
	const { email: businessMail, name: businessName } = user_data || {};
	const { userData, loading } = useGetUser({ activeMessageCard, activeTab, activeVoiceCard });

	const {
		mobile_number_eformat,
		name,
		email,
		mobile_verified,
		whatsapp_verified,
		user_details,
		// agent_id,
		id,
	} = userData || {};

	const USER_ID = userId || user_id;
	const NUMBER = USER_ID === null ? mobileNumber : mobile_number_eformat;

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
								{activeTab === 'message' && (user_id !== null ? name : 'unknown User')}
								{activeTab === 'voice' && businessName}
							</div>
							<div className={styles.name}>
								{activeTab === 'message' && (user_id !== null ? email : '-')}
								{activeTab === 'voice' && businessMail}
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
					mobile_number_eformat={NUMBER}
					name={name}
					// user_details={user_details}
					// agentId={agent_id}
					noUserId={activeTab === 'message' ? user_id : id}
				/>

			)}
			<div className={styles.conversation_title}>Other Channels (03)</div>
			<ConversationContainer />
		</>
	);
}
export default AgentDetails;
