import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AccountAllocateCard from './AccountAllocateCard';
import CallDetails from './CallDetails';
// import DemoCard from './DemoCard';
import KycVerifyCard from './KycVerifyCard';
import OrganicCustomer from './OrganicCustomer';
import ScheduleDemo from './ScheduleDemo';
import styles from './styles.module.css';
import TradeTypeVerifyCard from './TradeTypeVerifyCard';
import VerifyAccount from './VerifyAccount';

const formatList = ({ list = [], type = '' }) => (list || []).filter((item) => type === item?.request_type);

function AdoptionList({
	// mailProps = {}, loading = false,
	verifyAccount = {}, setVerifyAccount = () => {},
	list = [],
}) {
	const [scheduleDemo, setScheduleDemo] = useState({
		isScheduleDemo : false,
		scheduleData   : null,
	});

	const kycList = formatList({ list, type: 'kyc_verification' });
	const tradePartyList = formatList({ list, type: 'trade_party_verification' });
	const organincList = formatList({ list, type: 'onboarded_customer' });
	const missedList = formatList({ list, type: 'missed_call' });
	const allocationList = formatList({ list, type: 'allocation_request' });

	return (
		<div className={styles.container}>
			{!isEmpty(kycList) ? (
				<KycVerifyCard
					list={kycList}
					setVerifyAccount={setVerifyAccount}
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
					setVerifyAccount={setVerifyAccount}
				/>
			) : null}
			{!isEmpty(missedList) ? (<CallDetails list={missedList} />) : null}

			{!isEmpty(allocationList) ? (
				<AccountAllocateCard
					list={allocationList}
					setVerifyAccount={setVerifyAccount}
				/>
			) : null}

			{/* <DemoCard
				itm={itm}
				mailProps={mailProps}
				setScheduleDemo={setScheduleDemo}
			/> */}

			<ScheduleDemo scheduleDemo={scheduleDemo} setScheduleDemo={setScheduleDemo} />
			<VerifyAccount setVerifyAccount={setVerifyAccount} verifyAccount={verifyAccount} />
		</div>
	);
}

export default AdoptionList;
