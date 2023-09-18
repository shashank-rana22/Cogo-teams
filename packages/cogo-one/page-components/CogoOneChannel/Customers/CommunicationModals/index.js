import { cl, Toast } from '@cogoport/components';
import { IcMPlus, IcMEmail } from '@cogoport/icons-react';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import MailEditorModal from '../MailList/MailModal';
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

	const { buttonType, setButtonType, activeMail } = mailProps;

	const ACCESSIBLE_BUTTONS = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accessible_new_communications || [];
	const showOnlyEmailCommunication = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_email_communication;

	const CLICK_FUNCTIONS = {
		new_call     : () => setShowDialModal(true),
		new_whatsapp : () => setModalType({
			type : 'whatsapp_new_message_modal',
			data : {},
		}),
		new_mail: () => {
			if (buttonType) {
				Toast.warn('Email compose is already in progress');
				return;
			}
			setButtonType('send_mail');
		},
		global_contacts : () => setOpenKamContacts(true),
		sp_contacts     : () => {
			setSendBulkTemplates((prevVal) => !prevVal);
			setIsChecked(false);
		},
	};

	if (showOnlyEmailCommunication) {
		return (
			<>
				<div
					className={styles.wrapper}
					role="presentation"
					onClick={CLICK_FUNCTIONS?.new_mail}
				>
					<div className={cl`${styles.plus_circle} ${styles.single_communication}`}>
						<div className={styles.wheel_box}>
							<IcMEmail
								fill="#ffffff"
								width={25}
								height={30}
							/>
						</div>
					</div>
				</div>

				{!!buttonType && (
					<MailEditorModal
						mailProps={mailProps}
						userId={userId}
						activeMail={activeMail}
						viewType={viewType}
					/>
				)}
			</>
		);
	}

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
				<div htmlFor="plus_checkbox" className={cl`${styles.plus_circle} ${styles.multiple_communication}`}>
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
				<MailEditorModal
					mailProps={mailProps}
					userId={userId}
					activeMail={activeMail}
					viewType={viewType}
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
