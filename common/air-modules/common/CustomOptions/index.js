import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { IcCError, IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';

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

const getAccountType = ({ account_type = '', tags = [] }) => {
	if (account_type === 'service_provider') return 'LSP';
	if (tags.includes('partner')) return 'CP';
	return 'IE';
};

function CustomOptions({
	business_name = '', trade_name = '', kyc_status = '', cogo_entity = {},
	account_type = '', tags = [],
}) {
	const code = cogo_entity?.entity_code;
	const country_code = ENTITY_MAPPING[code]?.country_code;

	return (
		<div className={styles.option_container}>
			<div className={styles.option_name_container}>
				<div>{business_name}</div>

				{country_code ? (
					<div className={styles.trade_name}>
						{`${trade_name} (${country_code})`}
					</div>
				) : null}
			</div>

			<div className={styles.icn_container}>
				<div className={styles.account_type}>
					{getAccountType({ account_type, tags })}
				</div>

				<div className={styles.icon}>
					{KYC_ICON_MAPPING[kyc_status] || KYC_ICON_MAPPING.pending_from_user}
				</div>
			</div>
		</div>
	);
}

export default CustomOptions;
