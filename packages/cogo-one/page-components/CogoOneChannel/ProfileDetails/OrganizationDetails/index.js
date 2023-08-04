import { Button, Pill, Placeholder, Loader, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { ACCOUNT_TYPE } from '../../../../constants';
import useGetListOrganizationUsers from '../../../../hooks/useGetListOrganizationUsers';
import useGetListPromotions from '../../../../hooks/useGetListPromocode';
import useGetOrganization from '../../../../hooks/useGetOrganization';
import useGetOrganizationCogopoints from '../../../../hooks/useGetOrganizationCogopoints';

import ConvertToCpModal from './ConvertToCpModal';
import ListPromos from './listPromos';
import OrgAgentDetails from './OrgAgentDetails';
import OrganizationUsers from './OrganizationUsers';
import QuotationDetails from './QuotationDetails';
import styles from './styles.module.css';

const LOADER_COUNT_FOR_CARD = 3;

function OrganizationDetails({
	activeTab = '',
	activeVoiceCard = {},
	formattedMessageData = {},
	openNewTab = () => {},
	hideCpButton = false,
	getOrgDetails = () => {},
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const [showConvertModal, setShowConvertModal] = useState(false);

	const geo = getGeoConstants();

	const {
		organization_id: messageOrgId = '', user_id: messageUserId = '',
		account_type = '',
		lead_user_details = {},
	} = formattedMessageData || {};

	const { organization_id: voiceOrgId = '', user_id: voiceUserId = '' } = activeVoiceCard || {};
	const leadOrganizationId = lead_user_details?.lead_organization_id;
	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;
	const organizationId = activeTab === 'message' ? messageOrgId : voiceOrgId;
	const userId = activeTab === 'message' ? messageUserId : voiceUserId;

	const { organizationData = {}, orgLoading, fetchOrganization = () => {} } = useGetOrganization({
		organizationId,
		leadOrganizationId,
	});
	const { agent = {}, kyc_status, serial_id, short_name, city, tags = [] } = organizationData || {};
	const isOrgUsersVisible = account_type === 'service_provider';
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
								{short_name}
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

						{!hideCpButton && !orgLoading && organizationId ? (
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
			{showConvertModal && (
				<ConvertToCpModal
					showConvertModal={showConvertModal}
					setShowConvertModal={setShowConvertModal}
					organizationId={organizationId}
					refetchOrgDetails={refetchOrgDetails}
				/>
			) }

			{!orgLoading && !isEmpty(agent) && (
				<>
					<div className={styles.agent_title}>Agent Details</div>
					<div>
						<OrgAgentDetails agent={agent} />
					</div>
				</>

			)}

			{showOrgUsers && (
				<>
					<div className={styles.agent_title}>Organization Users</div>
					<div
						className={styles.organization_users}
						onScroll={handleScroll}
					>
						{organizationUsersLoading ? (
							<div className={styles.agent_loading_state}>
								{[...Array(LOADER_COUNT_FOR_CARD).keys()].map((key) => (
									<Placeholder width="80%" height="15px" margin="10px 0 0 0 " key={key} />
								))}
							</div>
						) : (
							<>
								{(organizationUserList || []).map((item) => (
									<OrganizationUsers
										user={item}
										key={item.id}
										hasVoiceCallAccess={hasVoiceCallAccess}
									/>
								))}
							</>
						)}
					</div>
				</>
			)}

			{organizationId ? (
				<>
					<div className={styles.agent_title}>User Reedemable Cogopoints</div>
					<div className={styles.points}>
						<div className={styles.cogo_icon}>
							<IcCCogoCoin className={styles.cogocoins_icon} />
						</div>

						<div className={styles.cogopoints}>Cogopoints : </div>
						{pointLoading ? (
							<Placeholder
								height="18px"
								width="35px"
								margin="0px 0px 0px 8px"
							/>
						) : (
							<div className={styles.value}>{total_redeemable || '0'}</div>
						)}
					</div>

					<div className={styles.agent_title}>Available Promocodes</div>

					{promoLoading ? (
						<div className={styles.loader_div}>
							<Loader themeType="primary" />
						</div>
					) : (
						<ListPromos list={list} />
					)}

					<QuotationDetails organizationId={organizationId} />
				</>
			) : null}
		</div>
	);
}
export default OrganizationDetails;
