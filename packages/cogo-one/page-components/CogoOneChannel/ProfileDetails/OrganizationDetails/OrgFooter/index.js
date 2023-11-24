import { Placeholder, Loader } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ConvertToCpModal from '../ConvertToCpModal';
import ListPromos from '../listPromos';
import OrgAgentDetails from '../OrgAgentDetails';
import OrganizationUsers from '../OrganizationUsers';
import QuotationDetails from '../QuotationDetails';

import styles from './styles.module.css';

const LOADER_COUNT_FOR_CARD = 3;

function OrgFooter({
	showConvertModal = false,
	setShowConvertModal = () => {},
	organizationId = '',
	refetchOrgDetails = () => {},
	orgLoading = false,
	agent = {},
	showOrgUsers = false,
	handleScroll = () => {},
	organizationUsersLoading = false,
	organizationUserList = [],
	hasVoiceCallAccess = false,
	setActiveTab = () => {},
	pointLoading = false,
	total_redeemable = 0,
	promoLoading = false,
	list = [],
	isMobile = false,
}) {
	return (
		<>
			{showConvertModal ? (
				<ConvertToCpModal
					showConvertModal={showConvertModal}
					setShowConvertModal={setShowConvertModal}
					organizationId={organizationId}
					refetchOrgDetails={refetchOrgDetails}
				/>
			) : null }

			{!orgLoading && !isEmpty(agent) && (
				<>
					<div className={styles.agent_title}>Agent Details</div>
					<div>
						<OrgAgentDetails agent={agent} />
					</div>
				</>

			)}
			{showOrgUsers ? (
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
										setActiveTab={setActiveTab}
										isMobile={isMobile}
									/>
								))}
							</>
						)}
					</div>
				</>
			) : null}

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

		</>
	);
}

export default OrgFooter;
