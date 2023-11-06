import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateChannelPartnerDocument from '../../../../../../hooks/useUpdateChannelPartnerDocument';
import useUpdateOrganizationDocument from '../../../../../../hooks/useUpdateOrganizationDocument';
import useUpdateRequestStatus from '../../../../../../hooks/useUpdateRerquestStatus';
import useVerificationKyc from '../../../../../../hooks/useVerificationKyc';

import AccountAllocateCard from './AccountAllocateCard';
import CallDetails from './CallDetails';
import DemoCard from './DemoCard';
import KycVerifyCard from './KycVerifyCard';
import OrganicCustomer from './OrganicCustomer';
import RejectAccount from './RejectModal';
import ScheduleDemo from './ScheduleDemo';
import styles from './styles.module.css';
import TradeTypeVerifyCard from './TradeTypeVerifyCard';
import VerifyAccount from './VerifyAccount';

const ADOPTIONS_COMPOONENT_MAPPING = {
	kyc_verification         : KycVerifyCard,
	trade_party_verification : TradeTypeVerifyCard,
	onboarded_customer       : OrganicCustomer,
	missed_call              : CallDetails,
	allocation_request       : AccountAllocateCard,
	demo_request             : DemoCard,
};

function List({
	setActiveTab = () => {}, mailProps = {},
	verifyAccount = {}, setVerifyAccount = () => {},
	list = [], onboardingRequest = () => {},
}) {
	const { accountType = '' } = verifyAccount || {};

	const dispatch = useDispatch();

	const [scheduleDemo, setScheduleDemo] = useState({
		isScheduleDemo : false,
		scheduleData   : null,
		scheduleType   : '',
	});
	const [rejectData, setRejectData] = useState({
		showRejectModal : false,
		reason          : [],
		type            : '',
	});
	const [rejectAccount, setRejectAccount] = useState({
		show         : false,
		rejectReason : '',
	});
	const [selectDoc, setSelectDoc] = useState({
		docType : '',
		docUrl  : '',
		docId   : '',
	});

	const { onStatusUpdate = () => {}, loadingUpdate = false } = useUpdateRequestStatus({
		setRejectData,
		onboardingRequest,
	});

	const { verifyKyc = () => {}, loading = false } = useVerificationKyc({
		setRejectAccount,
		setVerifyAccount,
		onboardingRequest,
		accountType,
	});

	const { updateDocument = () => {}, updateLoading = false } = useUpdateOrganizationDocument({
		setRejectAccount,
		setVerifyAccount,
		onboardingRequest,
	});

	const { updateCpDocument = () => {}, cpLoading = false } = useUpdateChannelPartnerDocument({
		setRejectAccount,
		setVerifyAccount,
		onboardingRequest,
	});

	const handlePlaceCall = ({ number, code, userName, leadUserId, pocId }) => {
		if (!number) {
			Toast.error('Mobile number is invalid');
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime            : new Date(),
					orgId                : null,
					userId               : pocId,
					mobile_number        : number,
					mobile_country_code  : code,
					userName,
					isUnkownUser         : !pocId,
					lead_user_id         : leadUserId,
					lead_organization_id : null,
				},
			}),
		);
	};

	const handleOpenMessage = ({
		number, code, userName, pocId, leadUserId,
		whatsapp_country_code, email, whatsapp_number,
	}) => {
		let numberEFormat;

		if (whatsapp_country_code) {
			numberEFormat = `${whatsapp_country_code?.replace('+', '') || ''}${whatsapp_number || ''}`;
		} else if (code) {
			numberEFormat = `${code?.replace('+', '') || ''}${number || ''}`;
		}

		const chatData = {
			user_id                 : pocId,
			user_name               : userName,
			whatsapp_number_eformat : whatsapp_number || number,
			email,
			channel_type            : 'whatsapp',
			countryCode             : whatsapp_country_code || code,
			mobile_no               : numberEFormat,
			organization_id         : null,
			lead_user_id            : leadUserId,

		};
		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : chatData,
			tab               : 'message',
		}));
	};

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_container}>
				<Image src={GLOBAL_CONSTANTS.image_url.list_empty} width={380} height={300} alt="list empty" />
			</div>
		);
	}

	const COMPONENT_PROPS = {
		kyc_verification: {
			setVerifyAccount,
			handlePlaceCall,
		},
		trade_party_verification: {
			setVerifyAccount,
		},
		onboarded_customer: {
			setScheduleDemo,
			handlePlaceCall,
		},
		missed_call: {
			handlePlaceCall,
			handleOpenMessage,
		},
		allocation_request: {
			setVerifyAccount,
			onStatusUpdate,
			loadingUpdate,
			rejectData,
			setRejectData,
		},
		demo_request: {
			mailProps,
			setScheduleDemo,
		},
	};

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { request_type = '', id = '' } = item || {};

				const Component = ADOPTIONS_COMPOONENT_MAPPING?.[request_type];

				return (
					<Component key={id} {...(COMPONENT_PROPS?.[request_type] || {})} item={item} />
				);
			})}

			<ScheduleDemo
				scheduleDemo={scheduleDemo}
				setScheduleDemo={setScheduleDemo}
				onboardingRequest={onboardingRequest}
			/>
			<VerifyAccount
				setVerifyAccount={setVerifyAccount}
				verifyAccount={verifyAccount}
				setRejectAccount={setRejectAccount}
				verifyKyc={verifyKyc}
				loading={loading || updateLoading || cpLoading}
				updateDocument={updateDocument}
				updateCpDocument={updateCpDocument}
				selectDoc={selectDoc}
				setSelectDoc={setSelectDoc}
			/>
			<RejectAccount
				setRejectAccount={setRejectAccount}
				rejectAccount={rejectAccount}
				setVerifyAccount={setVerifyAccount}
				verifyAccount={verifyAccount}
				verifyKyc={verifyKyc}
				loading={loading || cpLoading}
				selectDoc={selectDoc}
				updateCpDocument={updateCpDocument}
			/>
		</div>
	);
}

export default List;
