import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus, IcMAppPoc } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import useReplyMail from '../../../../hooks/useReplyMail';
import DialCallModal from '../../DialCallModal';
import MailModal from '../MailList/MailModal';
import NewWhatsappMessage from '../NewWhatsappMessage';

import styles from './styles.module.css';

function CommunicationModals({
	mailProps = {},
	setModalType = () => {},
	modalType = {},
	userId = '',
	viewType = '',
	selectedAutoAssign = {},
	setSelectedAutoAssign = () => {},
	setAutoAssignChats = () => {},
	setOpenKamContacts = () => {},
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [showDialModal, setShowDialModal] = useState(false);

	const {
		replyMailApi = () => {},
		replyLoading = false,
	} = useReplyMail(mailProps);

	const { buttonType, setButtonType, activeMail } = mailProps;

	return (
		<>
			<div className={styles.wrapper}>
				<input
					id="plus_checkbox"
					type="checkbox"
					className={styles.checkbox}
					checked={isChecked}
				/>
				<div htmlFor="plus_checkbox" className={styles.plus_circle}>
					<div className={styles.wheel_box}>
						<IcMPlus
							onClick={() => setIsChecked((prev) => !prev)}
							fill="#ffffff"
							width={35}
							height={35}
						/>

						<div className={styles.wheel}>
							<div className={cl`${styles.action} ${styles.call_icon}`}>
								<Image
									onClick={() => setShowDialModal(true)}
									src={GLOBAL_CONSTANTS.image_url.call_icon}
									alt="call icon"
									role="presentation"
									height={60}
									width={60}
								/>
							</div>
							<div className={cl`${styles.action} ${styles.whatsapp_icon}`}>
								<Image
									onClick={() => setModalType({
										type : 'whatsapp_new_message_modal',
										data : {},
									})}
									src={GLOBAL_CONSTANTS.image_url.whatsapp_icon}
									alt="whatsapp icon"
									role="presentation"
									height={60}
									width={60}
								/>
							</div>

							<div className={cl`${styles.action} ${styles.mail_icon}`}>
								<Image
									onClick={() => setButtonType('send_mail')}
									src={GLOBAL_CONSTANTS.image_url.email_icon}
									alt="gmail icon"
									role="presentation"
									height={60}
									width={60}
								/>
							</div>
							{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.global_contacts && (
								<div className={cl`${styles.action} ${styles.contacts_icon}`}>
									<IcMAppPoc
										onClick={() => setOpenKamContacts(true)}
										height={25}
										width={25}
										fill="#432609"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<NewWhatsappMessage
				key={modalType?.type}
				setModalType={setModalType}
				modalType={modalType}
				viewType={viewType}
				selectedAutoAssign={selectedAutoAssign}
				setSelectedAutoAssign={setSelectedAutoAssign}
				setAutoAssignChats={setAutoAssignChats}
			/>

			{!!buttonType && (
				<MailModal
					mailProps={mailProps}
					userId={userId}
					activeMail={activeMail}
					replyMailApi={replyMailApi}
					replyLoading={replyLoading}
				/>
			)}

			<DialCallModal
				setShowDialModal={setShowDialModal}
				showDialModal={showDialModal}
			/>
		</>
	);
}

export default CommunicationModals;
