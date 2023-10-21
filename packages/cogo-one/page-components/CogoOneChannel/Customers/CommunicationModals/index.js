import { cl, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlus } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import NewWhatsappMessage from '../NewWhatsappMessage';

import DialCallModal from './DialCallModal';
import { ICONS_MAPPING } from './iconsMappings';
import styles from './styles.module.css';

const MailEditorModal = dynamic(() => import('./MailEditorModal'));

const ICON_STYLES = ['position_1', 'position_2', 'position_3', 'position_4', 'position_5'];
const NO_EXPANDABLE_MENU_IF_LENGTH = 1;

const HIDE_NEW_COMMUNICATIONS = ['teams'];

function CommunicationModals({
	mailProps = {},
	setModalType = () => {},
	modalType = {},
	userId = '',
	viewType = '',
	setOpenKamContacts = () => {},
	setSendBulkTemplates = () => {},
	firestore = {},
	activeSelect = '',
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [showDialModal, setShowDialModal] = useState(false);

	const { buttonType, setButtonType, activeMail, resetEmailState = () => {} } = mailProps;

	const ACCESSIBLE_BUTTONS = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accessible_new_communications || [];

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
			resetEmailState({ mailView: 'orgSpecific' });
		},
		global_contacts : () => setOpenKamContacts(true),
		sp_contacts     : () => {
			setSendBulkTemplates((prevVal) => !prevVal);
			setIsChecked(false);
		},
	};

	const Component = ICONS_MAPPING[ACCESSIBLE_BUTTONS[GLOBAL_CONSTANTS.zeroth_index]] || null;
	const clickFunction = CLICK_FUNCTIONS[ACCESSIBLE_BUTTONS[GLOBAL_CONSTANTS.zeroth_index]] || null;

	if (HIDE_NEW_COMMUNICATIONS.includes(activeSelect)) {
		return null;
	}

	return (
		<>
			<div className={styles.wrapper}>
				{ACCESSIBLE_BUTTONS.length === NO_EXPANDABLE_MENU_IF_LENGTH ? (
					<div className={styles.plus_circle}>
						<div className={styles.action}>
							{Component ? <Component onClick={clickFunction} /> : null}
						</div>
					</div>
				) : (
					<>
						<input
							id="plus_checkbox"
							type="checkbox"
							className={styles.checkbox}
							checked={isChecked}
							readOnly
						/>
						<div
							htmlFor="plus_checkbox"
							className={cl`${styles.plus_circle} ${styles.multiple_communication}`}
						>
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
											<div
												key={buttonKey}
												className={cl`${styles.action} ${styles[ICON_STYLES[index]]}`}
											>
												<Comp key={buttonKey} onClick={clickFunc} />
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</>
				)}
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
					firestore={firestore}
					resetEmailState={resetEmailState}
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
