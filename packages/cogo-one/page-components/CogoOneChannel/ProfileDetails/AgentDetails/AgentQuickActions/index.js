import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useSubmitOmniChannelKyc from '../../../../../hooks/useSubmitOmniChannelKyc';

import styles from './styles.module.css';

function AgentQuickActions({
	kyc_status = '',
	userData = {},
	organization_id = '',
	user_id = '',
	lead_user_id = '',
}) {
	const router = useRouter();

	const { email = '', mobile_number = '', mobile_country_code = '' } = userData;

	const { submitKyc = () => {}, loading = false } = useSubmitOmniChannelKyc();

	const emailParams = email ? `&email=${email}` : '';

	return (
		<div>
			{(user_id && !loading)
				? (

					<div>

						{kyc_status === 'verified' ? 'KYC Verified' : (
							<div
								role="presentation"
								className={styles.copy_link}
								onClick={() => submitKyc({ organization_id, user_id, lead_user_id })}
							>
								Verify KYC
							</div>
						)}
					</div>

				) : (
					<div
						role="presentation"
						className={styles.copy_link}
						onClick={() => {
							router.push(
								// eslint-disable-next-line max-len
								`/create-importer-exporter?mobile=${mobile_number}&mobile_country_code=${mobile_country_code.replace(GLOBAL_CONSTANTS.regex_patterns.mobile_country_code_format, '%2B')}${emailParams}`,
								// eslint-disable-next-line max-len
								`/create-importer-exporter?mobile=${mobile_number}&mobile_country_code=${mobile_country_code.replace(GLOBAL_CONSTANTS.regex_patterns.mobile_country_code_format, '%2B')}${emailParams}`,
							);
						}}
					>
						Onboard
					</div>
				)}

		</div>
	);
}

export default AgentQuickActions;
