import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
	partnerId = '',
}) {
	const { email = '', mobile_number = '', mobile_country_code = '' } = userData || {};

	const { submitKyc = () => {}, loading = false } = useSubmitOmniChannelKyc();

	const { kyc_status } = organizationData || {};

	const emailParams = email ? `&email=${email}` : '';
	const countryCodeRegex = GLOBAL_CONSTANTS.regex_patterns.mobile_country_code_format;
	const countryCode = mobile_country_code?.replace(countryCodeRegex, COUNTRY_CODE_PREFIX);

	const queryParams = `?mobile=${mobile_number}&mobile_country_code=${countryCode}${emailParams}`;

	const handleRoute = () => {
		window.open(`/${partnerId}/create-importer-exporter${queryParams}`, '_blank');
	};

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
							Submit KYC Documents
						</Button>

					)}
				</div>

			) : (
				((userId || leadUserId) && (
					<Button
						size="sm"
						themeType="secondary"
						onClick={handleRoute}
					>
						Onboard User
					</Button>
				))
			)
			}

		</div>

	);
}

export default AgentQuickActions;
