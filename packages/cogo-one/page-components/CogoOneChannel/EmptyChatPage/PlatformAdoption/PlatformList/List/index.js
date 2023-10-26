import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateRequestStatus from '../../../../../../hooks/useUpdateRerquestStatus';
import useVerificationDocument from '../../../../../../hooks/useVerificationDocument';

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

const formatList = ({ list = [], type = '' }) => (list || []).filter((item) => type === item?.request_type);

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

	const { onStatusUpdate = () => {}, loadingUpdate = false } = useUpdateRequestStatus({
		setRejectData,
		onboardingRequest,
	});

	const { verifyDocument = () => {}, loading = false } = useVerificationDocument({
		setRejectAccount,
		setVerifyAccount,
		onboardingRequest,
		accountType,
	});

	const kycList = formatList({ list, type: 'kyc_verification' });
	const tradePartyList = formatList({ list, type: 'trade_party_verification' });
	const organincList = formatList({ list, type: 'onboarded_customer' });
	const missedList = formatList({ list, type: 'missed_call' });
	const allocationList = formatList({ list, type: 'allocation_request' });
	const demoList = formatList({ list, type: 'demo_request' });

	const handlePlaceCall = ({ number, code, userName, leadUserId, pocId }) => {
		if (!number) {
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
				<Image src={GLOBAL_CONSTANTS.image_url.list_empty} width={380} height={300} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!isEmpty(kycList) ? (
				<KycVerifyCard
					list={kycList}
					setVerifyAccount={setVerifyAccount}
					handlePlaceCall={handlePlaceCall}
				/>
			) : null}
			{!isEmpty(tradePartyList) ? (
				<TradeTypeVerifyCard
					list={tradePartyList}
					setVerifyAccount={setVerifyAccount}
				/>
			) : null}
			{!isEmpty(organincList) ? (
				<OrganicCustomer
					list={organincList}
					setScheduleDemo={setScheduleDemo}
					handlePlaceCall={handlePlaceCall}
				/>
			) : null}
			{!isEmpty(missedList) ? (
				<CallDetails
					list={missedList}
					handlePlaceCall={handlePlaceCall}
					handleOpenMessage={handleOpenMessage}
				/>
			) : null}

			{!isEmpty(allocationList) ? (
				<AccountAllocateCard
					list={allocationList}
					setVerifyAccount={setVerifyAccount}
					onStatusUpdate={onStatusUpdate}
					loadingUpdate={loadingUpdate}
					rejectData={rejectData}
					setRejectData={setRejectData}
				/>
			) : null}

			{!isEmpty(demoList) ? (
				<DemoCard
					list={demoList}
					mailProps={mailProps}
					setScheduleDemo={setScheduleDemo}
				/>

			) : null}

			<ScheduleDemo
				scheduleDemo={scheduleDemo}
				setScheduleDemo={setScheduleDemo}
				demoList={demoList}
				onboardingRequest={onboardingRequest}
			/>
			<VerifyAccount
				setVerifyAccount={setVerifyAccount}
				verifyAccount={verifyAccount}
				setRejectAccount={setRejectAccount}
				verifyDocument={verifyDocument}
				loading={loading}
			/>
			<RejectAccount
				setRejectAccount={setRejectAccount}
				rejectAccount={rejectAccount}
				setVerifyAccount={setVerifyAccount}
				verifyAccount={verifyAccount}
				verifyDocument={verifyDocument}
				loading={loading}
			/>
		</div>
	);
}

export default List;
