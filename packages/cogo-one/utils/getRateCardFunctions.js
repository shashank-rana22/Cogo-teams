import { setProfileState } from '@cogoport/store/reducers/profile';

export const getRateCardFunction = ({
	cardData = {},
	mailProps = {},
	dispatch = null,
	setActiveTab = () => {},
	isTriggeredFromSideBar = false,
}) => {
	const { setButtonType, setEmailState, signature } = mailProps;
	const { service_provider_poc = {}, service_provider_id = '' } = cardData || {};

	const {
		email = '',
		mobile_country_code = '',
		mobile_number = '',
		whatsapp_country_code = '',
		whatsapp_number = '',
		id = '',
		name = '',
	} = service_provider_poc || {};

	const handleVoiceCall = (e) => {
		e.stopPropagation();

		if (!mobile_number) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime           : new Date(),
					orgId               : '',
					id,
					mobile_number,
					mobile_country_code : `+${mobile_country_code?.replace('+', '')}`,
					userName            : name,
					isUnkownUser        : !id,
				},
			}),
		);
	};

	const handleSendMail = (e) => {
		e.stopPropagation();

		setButtonType('send_mail');

		setEmailState(
			(prev) => ({
				...prev,
				body          : signature,
				rteContent    : '',
				subject       : '',
				toUserEmail   : [email] || [],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
	};

	const handleOpenMessage = () => {
		if (isTriggeredFromSideBar) {
			return;
		}

		let numberEFormat;

		if (whatsapp_country_code) {
			numberEFormat = `${whatsapp_country_code?.replace('+', '') || ''}${whatsapp_number || ''}`;
		} else if (mobile_country_code) {
			numberEFormat = `${mobile_country_code?.replace('+', '') || ''}${mobile_number || ''}`;
		}

		const chatData = {
			user_id                 : id,
			user_name               : name,
			whatsapp_number_eformat : whatsapp_number || mobile_number,
			email,
			channel_type            : 'whatsapp',
			countryCode             : whatsapp_country_code || mobile_country_code,
			mobile_no               : numberEFormat,
			organization_id         : service_provider_id,
			defaultSideNav          : 'flash_shipment_bookings',
		};

		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : chatData,
			tab               : 'message',
		}));
	};

	return {
		handleOpenMessage,
		handleSendMail,
		handleVoiceCall,
	};
};
