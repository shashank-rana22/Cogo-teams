import { Button, Pill, Placeholder, Loader } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { ACCOUNT_TYPE } from '../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
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

const geo = getGeoConstants();

function OrganizationDetails({
	activeTab = '',
	activeVoiceCard = {},
	formattedMessageData = {},
	openNewTab = () => {},
	hideCpButton = false,
	getOrgDetails = () => {},
	viewType = '',
}) {
	const [showConvertModal, setShowConvertModal] = useState(false);
	const { organization_id: messageOrgId = '' } = formattedMessageData || {};
	const { organization_id: voiceOrgId = '' } = activeVoiceCard || {};

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;
	const organizationId = activeTab === 'message' ? messageOrgId : voiceOrgId;

	const { organizationData = {}, orgLoading, fetchOrganization = () => {} } = useGetOrganization({ organizationId });
	const isOrgUsersVisible = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_organization_users;

	const {
		organizationUsersData,
		organizationUsersLoading,
	} = useGetListOrganizationUsers({ organizationId, isOrgUsersVisible });
	const { list: organizationUserList = [] } = organizationUsersData || {};

	const showOrgUsers = isOrgUsersVisible && !organizationUsersLoading && !isEmpty(organizationUserList);

	const {
		pointData = {},
		pointLoading,
	} = useGetOrganizationCogopoints({ organizationId });

	const { promoData = {}, promoLoading } = useGetListPromotions({ organizationId });
	const { list = [] } = promoData || {};
	const { agent = {}, account_type, kyc_status, serial_id, short_name, city, tags = [] } = organizationData || {};
	const { display_name } = city || {};

	const { total_redeemable } = pointData || {};

	const refetchOrgDetails = () => {
		fetchOrganization();
		getOrgDetails();
	};

	if (isEmpty(organizationId)) {
		return (
			<div className={styles.container}>
				<div className={styles.title}>Organization Details</div>
				<EmptyState type="organization" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Organization Details</div>
			{orgLoading || organizationUsersLoading ? (
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
						// eslint-disable-next-line no-undef
						onClick={openNewTab}
					>
						ID:
						{' '}
						{serial_id}
					</div>
					<div className={styles.convert_to_cp}>
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
						{ !hideCpButton && !orgLoading && (
							<Button
								size="sm"
								themeType="primary"
								onClick={() => setShowConvertModal(true)}
							>
								Convert Account to CP
							</Button>
						)}
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
					<div className={styles.organization_users}>
						{(organizationUserList || []).map((item) => (
							<OrganizationUsers
								user={item}
								key={item.id}
								hasVoiceCallAccess={hasVoiceCallAccess}
							/>
						))}
					</div>
				</>
			)}

			<div className={styles.agent_title}>Reedemable Cogopoints</div>
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
		</div>
	);
}
export default OrganizationDetails;
