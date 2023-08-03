import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';

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

		<div className={styles.main_container}>
			{
			(user_id)
				? (
					<div>

						{kyc_status === 'verified' ? (
							<Pill
								size="md"
								color="green"
							>
								KYC Verified
							</Pill>
						) : (

							<Button
								size="sm"
								themeType="secondary"
								onClick={() => submitKyc({ organization_id, user_id, lead_user_id })}
								disabled={loading}
							>
								Verify KYC
							</Button>

						)}
					</div>

				) : (
					<Button
						size="sm"
						themeType="secondary"
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
					</Button>
				)
				}

		</div>

	);
}

export default AgentQuickActions;
