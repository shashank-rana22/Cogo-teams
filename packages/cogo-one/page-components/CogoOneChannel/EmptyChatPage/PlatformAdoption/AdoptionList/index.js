import React, { useState } from 'react';

import ADOPTION_CONTROLS from '../../../../../configurations/ADOPTION_CONTROLS';

import AccountAllocateCard from './AccountAllocateCard';
import CallDetails from './CallDetails';
import DemoCard from './DemoCard';
import KycVerifyCard from './KycVerifyCard';
import OrganicCustomer from './OrganicCustomer';
import ScheduleDemo from './ScheduleDemo';
import styles from './styles.module.css';
import TradeTypeVerifyCard from './TradeTypeVerifyCard';
import VerifyAccount from './VerifyAccount';

function AdoptionList({ mailProps = {}, verifyAccount = {}, setVerifyAccount = () => {} }) {
	const [scheduleDemo, setScheduleDemo] = useState({
		isScheduleDemo : false,
		scheduleData   : null,
	});

	return (
		<div className={styles.container}>
			{ADOPTION_CONTROLS?.map((itm) => {
				const { name = '' } = itm || {};

				return (
					<React.Fragment key={name}>
						{name === 'kyc_verification' ? (
							<KycVerifyCard
								itm={itm}
								setVerifyAccount={setVerifyAccount}
							/>
						) : null}
						{name === 'account_allocation_req' ? (
							<AccountAllocateCard
								itm={itm}
								setVerifyAccount={setVerifyAccount}
							/>
						) : null}
						{name === 'demo_request' ? (
							<DemoCard
								itm={itm}
								mailProps={mailProps}
								setScheduleDemo={setScheduleDemo}
							/>
						) : null}
						{name === 'trade_party_verification' ? (
							<TradeTypeVerifyCard
								itm={itm}
								setVerifyAccount={setVerifyAccount}
							/>
						) : null}
						{name === 'organic_customer' ? (
							<OrganicCustomer
								itm={itm}
								setScheduleDemo={setScheduleDemo}
								setVerifyAccount={setVerifyAccount}
							/>
						) : null}
						{name === 'call_customer' ? <CallDetails itm={itm} /> : null}

					</React.Fragment>
				);
			})}
			<ScheduleDemo scheduleDemo={scheduleDemo} setScheduleDemo={setScheduleDemo} />
			<VerifyAccount setVerifyAccount={setVerifyAccount} verifyAccount={verifyAccount} />
		</div>
	);
}

export default AdoptionList;
