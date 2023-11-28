import { Button, Pill } from '@cogoport/components';
import { getMobilePrefixFromCountryCode } from '@cogoport/forms/utils/getMobilePrefixFromCountryCode';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import useSubmitOmniChannelKyc from '../../../../../hooks/useSubmitOmniChannelKyc';

import OnboardUserModal from './OnboardUserModal';
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
	name = '',
}) {
	const dispatch = useDispatch();

	const {
		email = '',
		lead_user_details : leadUserDetails = {},
		mobile_no : mobileNo = '', country_code : countryCode = '', lead_organization_id = '',
	} = formattedMessageData || {};

	const mobileCountryCode = getMobilePrefixFromCountryCode({ countryCode });

	const [showUserModal, setShowUserModal] = useState(false);

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

	const openLeadOrgModal = () => {
		dispatch(
			setProfileState({
				lead_feedback_form_data: {
					lead_organization_id,
					lead_user_id : leadUserId,
					source       : 'cogo_one',
				},
				lead_feedback_form_type: 'lead_org_feedback',
			}),
		);
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
						onClick={() => { setShowUserModal(true); }}
					>
						Onboard User
					</Button>
				))
			)
			}

			{(lead_organization_id && !orgId) ? (
				<Button
					size="sm"
					themeType="accent"
					onClick={openLeadOrgModal}
					className={styles.feedback_button}
				>
					Create Feedback
				</Button>
			) : null}
			{showUserModal
				? (
					<OnboardUserModal
						handleRoute={handleRoute}
						showUserModal={showUserModal}
						setShowUserModal={setShowUserModal}
						mobileNumber={mobileNumber}
						mobileCountryCode={mobileCountryCode}
						name={name}
						email={email}
					/>
				) : null}
		</div>

	);
}

export default AgentQuickActions;
