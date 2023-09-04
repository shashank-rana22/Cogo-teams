import { Button, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useGetUser from '../../../hooks/useGetUser';
import CommunicationModal from '../../CommunicationModal';

import styles from './styles.module.css';

const COUNTRY_CODE_START = 0;
const COUNTRY_CODE_END = 2;

function SuggestedActions({ formattedData = {}, viewType = '', mailProps = {} }) {
	const dispatch = useDispatch();

	const [modalType, setModalType] = useState('');

	const geo = getGeoConstants();

	const {
		id = '',
		user_id,
		user_name,
		mobile_no,
		organization_id,
		lead_user_id,
		lead_user_details = {},
		user_details = {},
	} = formattedData;

	const ACTIVE_CARD_DATA = {
		userId     : user_id,
		leadUserId : lead_user_id,
		name       : user_name,
	};

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;
	const userMobileNumber = mobile_no || user_details?.whatsapp_number_eformat
	|| user_details?.mobile_number_eformat || lead_user_details?.whatsapp_number_eformat
	|| lead_user_details?.mobile_number_eformat;

	const code = userMobileNumber?.slice(COUNTRY_CODE_START, COUNTRY_CODE_END);
	const number = userMobileNumber?.slice(COUNTRY_CODE_END);

	const { userData = {} } = useGetUser({ userId: user_id, lead_user_id, customerId: id });

	const handleCall = () => {
		if (userMobileNumber && hasVoiceCallAccess) {
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
		if (!userData?.email) {
			return;
		}

		const { setButtonType, setEmailState } = mailProps;
		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : '',
				subject       : '',
				toUserEmail   : [userData?.email],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
	};

	const handleSendTemplate = () => {
		if (!userMobileNumber) {
			return;
		}
		setModalType('whatsapp');
	};

	const closeModal = () => {
		setModalType('');
	};

	const ACTIONS = [
		{
			label     : 'Call',
			action    : handleCall,
			disabled  : !userMobileNumber || !hasVoiceCallAccess,
			accessKey : 'new_call',
		},
		{
			label     : 'Message on WhatsApp',
			action    : handleSendTemplate,
			disabled  : !userMobileNumber,
			accessKey : 'new_whatsapp',
		},
		{
			label     : 'Send Email',
			action    : handleSendEmail,
			disabled  : !userData?.email,
			accessKey : 'new_mail',
		},
	];
	const accesibleButtons = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accessible_new_communications;

	return (
		<>
			<div className={styles.suggested_actions}>Suggested Actions :</div>
			<div className={styles.actions}>
				{(ACTIONS || []).map((item) => {
					if (!accesibleButtons?.includes(item?.accessKey)) {
						return null;
					}

					return (
						<Button
							onClick={item?.action}
							className={cl`${styles.actions_button} ${item?.disabled ? styles.action_disabled : ''}`}
							key={item?.accessKey}
							size="sm"
							themeType="secondary"
						>
							{item.label}
						</Button>
					);
				})}
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
