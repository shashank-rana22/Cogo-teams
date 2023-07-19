import { Button, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import useGetUser from '../../../hooks/useGetUser';
import CommunicationModal from '../../CommunicationModal';

import styles from './styles.module.css';

const COUNTRY_CODE_START = 0;
const COUNTRY_CODE_END = 2;

function SuggestedActions({ formattedData = {} }) {
	const dispatch = useDispatch();

	const [modalType, setModalType] = useState(null);

	const geo = getGeoConstants();

	const {
		id = '',
		user_id,
		user_name,
		mobile_no,
		organization_id,
		lead_user_id,
	} = formattedData;

	const ACTIVE_CARD_DATA = {
		userId     : user_id,
		leadUserId : lead_user_id,
		name       : user_name,
	};

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;

	const code = mobile_no?.slice(COUNTRY_CODE_START, COUNTRY_CODE_END);
	const number = mobile_no?.slice(COUNTRY_CODE_END);

	const { userData } = useGetUser({ userId: user_id, lead_user_id, customerId: id });

	const handleCall = () => {
		if (mobile_no && hasVoiceCallAccess) {
			dispatch(
				setProfileState({
					is_in_voice_call          : true,
					voice_call_recipient_data : {
						startTime           : new Date(),
						orgId               : organization_id,
						userId              : user_id,
						mobile_number       : number,
						mobile_country_code : `+${code}`,
						userName            : user_name,
						isUnkownUser        : !user_id,
					},
				}),
			);
		}
	};

	const handleSendEmail = () => {
		setModalType('email');
	};

	const handleSendTemplate = () => {
		setModalType('whatsapp');
	};

	const closeModal = () => {
		setModalType(null);
	};

	const ACTIONS = [
		{
			label    : 'Call',
			action   : handleCall,
			disabled : !mobile_no || !hasVoiceCallAccess,
		},
		{ label: 'Message on WhatsApp', action: handleSendTemplate, disabled: false },
		{ label: 'Send Email', action: handleSendEmail, disabled: false },
	];

	return (
		<>
			<div className={styles.suggested_actions}>Suggested Actions :</div>
			<div className={styles.actions}>
				{(ACTIONS || []).map((item) => (
					<Button
						onClick={item?.action}
						className={cl`${styles.actions_button} ${item?.disabled ? styles.action_disabled : ''}`}
						key={item}
						size="sm"
						themeType="secondary"
					>
						{item.label}
					</Button>
				))}
			</div>

			{modalType && (
				<CommunicationModal
					modalType={modalType}
					closeModal={closeModal}
					userData={userData}
					activeCardData={ACTIVE_CARD_DATA}
				/>
			)}
		</>

	);
}

export default SuggestedActions;
