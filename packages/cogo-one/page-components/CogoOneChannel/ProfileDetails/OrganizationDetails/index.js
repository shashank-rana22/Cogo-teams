import { Pill, Placeholder, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import useGetListPromotions from '../../../../hooks/useGetListPromocode';
import useGetOrganization from '../../../../hooks/useGetOrganization';
import useGetOrganizationCogopoints from '../../../../hooks/useGetOrganizationCogopoints';

import OrgAgentDetails from './OrgAgentDetails';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

function OrganizationDetails({ activeTab = '', activeVoiceCard = {}, FormattedMessageData = {} }) {
	const { organization_id:messageOrgId = '' } = FormattedMessageData || {};
	const { organization_id:voiceOrgId = '' } = activeVoiceCard || {};

	const organizationId = activeTab === 'message' ? messageOrgId : voiceOrgId;

	const { organizationData = {}, orgLoading } = useGetOrganization({ organizationId });

	const {
		pointData = {},
		pointLoading,
	} = useGetOrganizationCogopoints({ organizationId });

	const { promoData = {}, promoLoading } = useGetListPromotions({ organizationId });
	const { list = [] } = promoData || {};
	const { agent = {}, account_type, kyc_status, serial_id, short_name, city } = organizationData || {};
	const { display_name } = city || {};

	const { total_redeemable } = pointData || {};

	if (isEmpty(organizationId)) {
		return (
			<div className={styles.container}>
				<div className={styles.title}>Organisation Details</div>
				<EmptyState />
			</div>
		);
	}

	function ListPromos() {
		return isEmpty(list) ? (
			<div className={styles.promotion_cards_empty_state}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/promocodes_not_found.svg"
					alt="promocode"
					width="200px"
					height="200px"
				/>
			</div>
		) : (
			<div className={styles.promotion_cards}>
				<PromocodeThumbnail list={list} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Organisation Details</div>
			{orgLoading ? (
				<>
					<div className={styles.content}>
						<div className={styles.organization_details}>
							<Placeholder width="220px" height="25px" />
							<Placeholder width="120px" height="15px" margin="10px 0 0 0 " />
						</div>
						<div className={styles.status}>
							<Placeholder width="60px" height="15px" />
						</div>
					</div>
					<div className={styles.name}>
						<Placeholder width="120px" height="15px" margin="10px 0 0 0 " />
						<Placeholder width="80px" height="15px" margin="10px 0 0 0 " />
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
					<div className={styles.name}>
						ID:
						{' '}
						{serial_id}
					</div>
					<div>
						<Pill
							key="Importer/Exporter"
							size="sm"
							color="#FFF7BF"
						>
							{account_type === 'importer_exporter' ? 'Importer/Exporter' : ''}
						</Pill>
					</div>
				</>
			)}

			{!isEmpty(agent) && (
				<>
					<div className={styles.agent_title}>Agent Details</div>
					<div className={styles.agent_div}>
						<OrgAgentDetails agent={agent} orgLoading={orgLoading} />
					</div>
				</>

			)}

			<div className={styles.agent_title}>Reedemable Cogopoints</div>
			<div className={styles.points}>
				<div className={styles.cogo_icon}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg"
						alt="coin"
						className={styles.cogocoins_icon}
					/>
				</div>

				<div className={styles.cogopoints}>Cogopoints : </div>
				{pointLoading ? (
					<Placeholder height="18px" width="35px" margin="0px 0px 0px 8px" />
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
				<ListPromos />

			)}
		</div>

	);
}
export default OrganizationDetails;
