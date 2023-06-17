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
	const { data } = props;

	const getAccountType = () => {
		if (data.account_type === 'service_provider') return 'LSP';
		if ((data.tags || []).includes('partner')) return 'CP';
		return 'IE';
	};

	return (
		<div className={styles.option_container}>
			<div className={styles.option_name_container}>
				<div className={styles.business_name}>{data.business_name}</div>

				<div className={styles.trade_name}>{data.trade_name}</div>
			</div>

			<div className={styles.icn_container}>
				<div className={styles.account_type}>
					{getAccountType()}
				</div>

				<div className={styles.icon}>
					{KYC_ICON_MAPPING[data.kyc_status]}
				</div>
			</div>
		</div>
	);
}

export default Organization;
