import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useSubmitOmniChannelKyc from '../../../../../hooks/useSubmitOmniChannelKyc';
import { getMobilePrefixFromCountryCode } from '../../../../../utils/getMobilePrefixFromCountryCode';

import styles from './styles.module.css';

const COUNTRY_CODE_PREFIX = '%2B';

function AgentQuickActions({
	orgId = '',
	userId = '',
	leadUserId = '',
	organizationData = {},
	fetchOrganization = () => {},
	partnerId = '',
	formattedMessageData = {},
}) {
	const {
		email = '',
		lead_user_details : leadUserDetails = {}, mobile_no : mobileNo = '', country_code : countryCode = '',
	} = formattedMessageData || {};
	const mobileCountryCode = getMobilePrefixFromCountryCode({ countryCode });

	const mobileNumber = (
		mobileNo?.substr(GLOBAL_CONSTANTS.zeroth_index, mobileCountryCode.length) === mobileCountryCode
	) ? mobileNo?.substr(mobileCountryCode.length) : mobileNo;

	const userEmail = email || leadUserDetails?.email;

	const { submitKyc = () => {}, loading = false } = useSubmitOmniChannelKyc();

	const { kyc_status } = organizationData || {};

	const emailParams = userEmail ? `&email=${userEmail}` : '';
	const formatCountryCode = COUNTRY_CODE_PREFIX + mobileCountryCode;

	const queryParams = `?mobile=${mobileNumber}&mobile_country_code=${formatCountryCode}${emailParams}`;

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
