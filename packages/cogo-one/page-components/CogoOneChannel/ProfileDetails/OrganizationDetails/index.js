import { Button, Pill, Placeholder, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { FIREBASE_TABS, ACCOUNT_TYPE } from '../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import useGetListOrganizationUsers from '../../../../hooks/useGetListOrganizationUsers';
import useGetListPromotions from '../../../../hooks/useGetListPromocode';
import useGetOrganization from '../../../../hooks/useGetOrganization';
import useGetOrganizationCogopoints from '../../../../hooks/useGetOrganizationCogopoints';

import OrgFooter from './OrgFooter';
import styles from './styles.module.css';
import SwitchOrg from './SwitchOrg';

const SWITCH_ORG_USERS_ENABLE = ['whatsapp', 'platform_chat'];

function OrganizationDetails({
	activeTab = '',
	activeVoiceCard = {},
	formattedMessageData = {},
	openNewTab = () => {},
	hideCpButton = false,
	getOrgDetails = () => {},
	viewType = '',
	setActiveTab = () => {},
	firestore = {},
	isMobile = false,
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const [showConvertModal, setShowConvertModal] = useState(false);

	const geo = getGeoConstants();

	const {
		organization_id: messageOrgId = '', user_id: messageUserId = '',
		account_type = '',
		lead_user_details = {},
		channel_type = '',
	} = formattedMessageData || {};

	const { organization_id: voiceOrgId = '', user_id: voiceUserId = '' } = activeVoiceCard || {};
	const leadOrganizationId = lead_user_details?.lead_organization_id;
	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;
	const organizationId = FIREBASE_TABS.includes(activeTab) ? messageOrgId : voiceOrgId;
	const userId = FIREBASE_TABS.includes(activeTab) ? messageUserId : voiceUserId;

	const { organizationData = {}, orgLoading, fetchOrganization = () => {} } = useGetOrganization({
		organizationId,
		leadOrganizationId,
	});
	const {
		agent = {}, kyc_status, serial_id, short_name, city, tags = [],
		business_name = '',
	} = organizationData || {};

	const isOrgUsersVisible = (account_type === 'service_provider')
	|| VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.customer_org_users;
	const {
		organizationUsersData,
		organizationUsersLoading,
		handleScroll = () => {},
	} = useGetListOrganizationUsers({ organizationId, isOrgUsersVisible });

	const { list: organizationUserList = [] } = organizationUsersData || {};

	const showOrgUsers = isOrgUsersVisible && !isEmpty(organizationUserList);

	const {
		pointData = {},
		pointLoading,
	} = useGetOrganizationCogopoints({ organizationId, userId });

	const { promoData = {}, promoLoading } = useGetListPromotions({ organizationId });
	const { list = [] } = promoData || {};

	const { display_name } = city || {};

	const { total_redeemable } = pointData || {};

	const refetchOrgDetails = () => {
		fetchOrganization();
		getOrgDetails();
	};

	const handleRoute = () => {
		window.open(`/${partnerId}/lead-organization/${leadOrganizationId}`, '_blank');
	};

	const hasAccessToConvertCp = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.convert_account_to_cp;

	if (isEmpty(organizationId || leadOrganizationId)) {
		return (
			<div className={styles.container}>
				<div className={styles.title}>Organization Details</div>
				<EmptyState type="organization" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{organizationId ? 'Organization Details' : 'Lead Organization Details'}
				{(organizationId && SWITCH_ORG_USERS_ENABLE.includes(channel_type)) ? (
					<SwitchOrg
						formattedData={formattedMessageData}
						firestore={firestore}
						key={organizationId}
						viewType={viewType}
					/>
				) : null}
			</div>
			{orgLoading ? (
				<>
					<div className={styles.content}>
						<div className={styles.organization_details}>
							<Placeholder width="220px" height="20px" />
						</div>
						<div className={styles.status}>
							<Placeholder width="60px" height="15px" />
						</div>
					</div>
					<div className={styles.name}>
						<Placeholder width="120px" height="30px" margin="10px 0 0 0 " />
					</div>
					<div className={styles.agent_title}>Agent Details</div>

					<div className={styles.agent_loading_state}>
						<Placeholder width="80%" height="15px" margin="10px 0 0 0 " />
						<Placeholder width="80%" height="15px" margin="10px 0 0 0 " />
						<Placeholder width="80%" height="15px" margin="10px 0 0 0 " />
					</div>
				</>
			) : (
				<>
					<div className={styles.content}>
						<div className={styles.organization_details}>
							<div className={styles.name}>
								{business_name || short_name }
							</div>
							<div className={styles.location}>{display_name}</div>
						</div>
						<div className={styles.status}>
							<Pill
								key="Verified"
								size="sm"
								color="#DDEBC0"
							>
								{kyc_status === 'verified' ? 'KYC Verified' : 'Not Verified'}
							</Pill>
						</div>
					</div>
					<div
						role="presentation"
						className={styles.name}
						style={{ cursor: 'pointer' }}
						onClick={organizationId ? openNewTab : handleRoute}
					>
						ID:
						{' '}
						{serial_id}
					</div>
					<div className={cl`${styles.convert_to_cp} ${account_type ? styles.check_type : ''}`}>
						{account_type ? (
							<Pill
								key="Importer/Exporter"
								size="sm"
								color="#FFF7BF"
							>
								{tags.includes('partner') ? 'Channel Partner' : (
									<div>
										{ACCOUNT_TYPE[account_type]}
									</div>
								)}
							</Pill>
						) : null }

						{!hideCpButton && !orgLoading && organizationId && hasAccessToConvertCp ? (
							<Button
								size="sm"
								themeType="primary"
								onClick={() => setShowConvertModal(true)}
							>
								Convert Account to CP
							</Button>
						) : null}
					</div>
				</>
			)}
			<OrgFooter
				showConvertModal={showConvertModal}
				setShowConvertModal={setShowConvertModal}
				organizationId={organizationId}
				refetchOrgDetails={refetchOrgDetails}
				orgLoading={orgLoading}
				agent={agent}
				showOrgUsers={showOrgUsers}
				handleScroll={handleScroll}
				organizationUsersLoading={organizationUsersLoading}
				organizationUserList={organizationUserList}
				hasVoiceCallAccess={hasVoiceCallAccess}
				setActiveTab={setActiveTab}
				pointLoading={pointLoading}
				total_redeemable={total_redeemable}
				promoLoading={promoLoading}
				list={list}
				isMobile={isMobile}
			/>
		</div>
	);
}
export default OrganizationDetails;
