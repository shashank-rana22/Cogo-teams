import React from 'react';

import ADOPTION_CONTROLS from '../../../../../configurations/ADOPTION_CONTROLS';

import AccountAllocateCard from './AccountAllocateCard';
import DemoCard from './DemoCard';
import KycVerifyCard from './KycVerifyCard';
import styles from './styles.module.css';
import TradeTypeVerifyCard from './TradeTypeVerifyCard';

function AdoptionList({ mailProps = {} }) {
	return (
		<div className={styles.container}>
			{ADOPTION_CONTROLS?.map((itm) => {
				const {
					name = '', kycVerify = false,
					tradeTypeVerify = false, demo = false,
					accountAllocate = false,
				} = itm || {};

				return (
					<React.Fragment key={name}>
						{kycVerify ? <KycVerifyCard itm={itm} /> : null}
						{accountAllocate ? <AccountAllocateCard itm={itm} /> : null}
						{demo ? <DemoCard itm={itm} mailProps={mailProps} /> : null}
						{tradeTypeVerify ? <TradeTypeVerifyCard itm={itm} /> : null}
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default AdoptionList;
