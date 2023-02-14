import { Avatar, Pill } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';

function AgentDetails() {
	const VERIFICATION_STATUS = [
		{
			label      : 'Verified',
			color      : 'green',
			size       : 'sm',
			prefixIcon : <IcMCall />,
		},
		{
			label      : 'Verified',
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
					size="60px"
				/>
				<div className={styles.details}>
					<div className={styles.name}>John Wick</div>
					<div className={styles.name}>Product analyst</div>
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
			<div className={styles.number_div}>
				<IcMCall className={styles.call_icon} />
				<div className={styles.number}>+91 9348630630</div>
			</div>
			<div className={styles.conversation_title}>Other Channels (03)</div>
			<ConversationContainer />
		</>
	);
}
export default AgentDetails;
