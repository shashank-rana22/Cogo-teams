import { cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import useReplyMail from '../../../../hooks/useReplyMail';
import MailModal from '../MailList/MailModal';
import NewWhatsappMessage from '../NewWhatsappMessage';

import DialCallModal from './DialCallModal';
import { ICONS_MAPPING } from './iconsMappings';
import styles from './styles.module.css';

const ICON_STYLES = ['position_1', 'position_2', 'position_3', 'position_4', 'position_5'];

function CommunicationModals({
	mailProps = {},
	setModalType = () => {},
	modalType = {},
	userId = '',
	viewType = '',
	setOpenKamContacts = () => {},
	setSendBulkTemplates = () => {},
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [showDialModal, setShowDialModal] = useState(false);

	const {
		replyMailApi = () => {},
		replyLoading = false,
	} = useReplyMail(mailProps);

	const { buttonType, setButtonType, activeMail } = mailProps;

	const ACCESSIBLE_BUTTONS = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accessible_new_communications || [];

	const CLICK_FUNCTIONS = {
		new_call     : () => setShowDialModal(true),
		new_whatsapp : () => setModalType({
			type : 'whatsapp_new_message_modal',
			data : {},
		}),
		new_mail        : () => setButtonType('send_mail'),
		global_contacts : () => setOpenKamContacts(true),
		sp_contacts     : () => {
			setSendBulkTemplates((prevVal) => !prevVal);
			setIsChecked(false);
		},
	};

	return (
		<>
			<div className={styles.wrapper}>
				<input
					id="plus_checkbox"
					type="checkbox"
					className={styles.checkbox}
					checked={isChecked}
					readOnly
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
							{ACCESSIBLE_BUTTONS.map((buttonKey, index) => {
								const Comp = ICONS_MAPPING[buttonKey] || null;

								const clickFunc = CLICK_FUNCTIONS[buttonKey] || null;

								if (!Comp) {
									return null;
								}

								return (
									<div key={buttonKey} className={cl`${styles.action} ${styles[ICON_STYLES[index]]}`}>
										<Comp key={buttonKey} onClick={clickFunc} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<NewWhatsappMessage
				key={modalType?.type}
				setModalType={setModalType}
				modalType={modalType}
				viewType={viewType}
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

			{showDialModal && (
				<DialCallModal
					setShowDialModal={setShowDialModal}
					showDialModal={showDialModal}
				/>
			)}
		</>
	);
}

export default CommunicationModals;
