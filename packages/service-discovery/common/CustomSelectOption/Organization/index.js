import { IcCError, IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const KYC_ICON_MAPPING = {
	pending_from_user: (
		<IcCError width={16} height={16} style={{ marginTop: 2 }} />
	),
	pending_verification: (
		<IcCError width={16} height={16} style={{ marginTop: 2 }} />
	),
	verified : <IcCFtick width={20} height={20} />,
	rejected : (
		<IcCFcrossInCircle width={16} height={16} style={{ marginTop: 2 }} />
	),
};

function Organization(props) {
	const { data, option } = props;

	const { account_type, tags, business_name, trade_name, kyc_status } = data || option || {};

	const getAccountType = () => {
		if (account_type === 'service_provider') return 'LSP';
		if ((tags || []).includes('partner')) return 'CP';
		return 'IE';
	};

	return (
		<div className={styles.option_container}>
			<div className={styles.option_name_container}>
				<div className={styles.business_name}>{business_name}</div>

				<div className={styles.trade_name}>{trade_name}</div>
			</div>

			<div className={styles.icn_container}>
				<div className={styles.account_type}>
					{getAccountType()}
				</div>

				<div className={styles.icon}>
					{KYC_ICON_MAPPING[kyc_status]}
				</div>
			</div>
		</div>
	);
}

export default Organization;
