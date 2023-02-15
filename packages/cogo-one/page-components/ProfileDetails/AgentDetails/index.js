import { Avatar, Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';

// import UserAvatar from '../../../common/UserAvatar';
import useGetUser from '../../../hooks/useGetUser';
import useOutgoingCall from '../../../hooks/useOutgoingCall';

import ConversationContainer from './ConversationContainer';
import styles from './styles.module.css';

function AgentDetails({ activeMessageCard }) {
	const { userData, loading } = useGetUser({ activeMessageCard });
	const { makeCallApi = () => {}, callLoading } = useOutgoingCall();

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

	const handleClick = async () => {
		await makeCallApi();
	};
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
			<div className={styles.number_div}>
				{/* <img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
					alt="hang-Up"
					className={styles.call_icon}
				/> */}
				<IcMCall className={styles.call_icon} onClick={handleClick} />
				{loading ? (
					<Placeholder height="13px" width="220px" margin="0px 0px 0px 0px" />
				) : (
					<div className={styles.number}>
						{mobile_number_eformat?.slice(0, 2)}
						{' '}
						{mobile_number_eformat?.slice(2)}
					</div>
				)}
			</div>
			<div className={styles.conversation_title}>Other Channels (03)</div>
			<ConversationContainer />
		</>
	);
}
export default AgentDetails;
