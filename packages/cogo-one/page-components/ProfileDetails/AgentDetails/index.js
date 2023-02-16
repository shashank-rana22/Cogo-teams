import { Avatar, Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
// import { useState } from 'react';

// import UserAvatar from '../../../common/UserAvatar';
import useGetUser from '../../../hooks/useGetUser';
import VoiceCallComponent from '../../VoiceCallComponent';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';

function AgentDetails({ activeMessageCard }) {
	// const [swapUi, setSwapUi] = useState(false);
	// console.log('swapUi', swapUi);
	const { userData, loading } = useGetUser({ activeMessageCard });

	const { mobile_number_eformat, name, email, mobile_verified, whatsapp_verified } = userData || {};
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
							<div className={styles.name}>{name || 'NA'}</div>
							<div className={styles.name}>{email || '-'}</div>
						</>
					)}
				</div>
			</div>
			<div className={styles.verification_pills}>
				{VERIFICATION_STATUS.map((item) => (
					<div>
						<Pill
							key={item.label}
							prefix={item.prefixIcon}
							size="md"
							color={item.color}
						>
							<div className={styles.pill_name}>{item.label}</div>
						</Pill>
					</div>
				))}
			</div>
			{loading ? (
				<Placeholder height="13px" width="220px" margin="0px 0px 0px 0px" />
			) : (
				<VoiceCallComponent
					// swapUi={swapUi}
					// setSwapUi={setSwapUi}
					mobile_number_eformat={mobile_number_eformat}
				/>

			)}
			<div className={styles.conversation_title}>Other Channels (03)</div>
			<ConversationContainer />
		</>
	);
}
export default AgentDetails;
