import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';

import useSubmitOmniChannelKyc from '../../../../../hooks/useSubmitOmniChannelKyc';

import styles from './styles.module.css';

const COUNTRY_CODE_PREFIX = '%2B';

function AgentQuickActions({
	userData = {},
	orgId = '',
	userId = '',
	leadUserId = '',
	organizationData = {},
	fetchOrganization = () => {},
}) {
	const { email = '', mobile_number = '', mobile_country_code = '' } = userData || {};

	const { push } = useRouter();

	const { submitKyc = () => {}, loading = false } = useSubmitOmniChannelKyc();

	const { kyc_status } = organizationData || {};

	const emailParams = email ? `&email=${email}` : '';
	const countryCodeRegex = GLOBAL_CONSTANTS.regex_patterns.mobile_country_code_format;
	const countryCode = mobile_country_code.replace(countryCodeRegex, COUNTRY_CODE_PREFIX);

	const queryParams = `?mobile=${mobile_number}&mobile_country_code=${countryCode}${emailParams}`;
	const redirectionUrl = `/create-importer-exporter${queryParams}`;

	return (

		<div className={styles.main_container}>
			{
			orgId ? (

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
							onClick={() => submitKyc({ orgId, userId, leadUserId, fetchOrganization })}
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
					onClick={() => push(redirectionUrl)}
				>
					Onboard User
				</Button>
			)
				}

		</div>

	);
}

export default AgentQuickActions;
