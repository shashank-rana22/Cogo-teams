import { Pill, Placeholder } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';

import getListPromoCode from '../../../hooks/useGetListPromocode';
import useGetOrganization from '../../../hooks/useGetOrganization';
import useGetOrganizationCogopoints from '../../../hooks/useGetOrganizationCogopoints';

// import LoadingState from './LoaderState';
import OrgAgentDetails from './OrgAgentDetails';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

function OrganizationDetails({ activeMessageCard }) {
	const { organizationData = {}, orgLoading } = useGetOrganization({ activeMessageCard });
	// const orgLoading = true;
	const { pointData, pointLoading } = useGetOrganizationCogopoints({ activeMessageCard });
	const { promoData, promoLoading } = getListPromoCode({ activeMessageCard });

	const { agent, account_type, kyc_status, serial_id, short_name, city } = organizationData || {};
	const { display_name } = city || {};

	const { total_redeemable } = pointData || {};

	// if (orgLoading) {
	// 	return <LoadingState />;
	// }

	return (
		<div className={styles.container}>
			<div className={styles.title}>Organisation Details</div>
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
			<div className={styles.agent_title}>Agent Details (2)</div>
			<div className={styles.agent_div}>
				<OrgAgentDetails agent={agent} orgLoading={orgLoading} />
			</div>

			<div className={styles.agent_title}>Reedemable Cogopoints</div>
			<div className={styles.points}>
				<div className={styles.cogo_icon}>
					<IcCCogoCoin width={20} height={20} />
				</div>

				<div className={styles.cogopoints}>Cogopoints : </div>
				{pointLoading ? (
					<Placeholder height="18px" width="35px" margin="0px 0px 0px 8px" />
				) : (
					<div className={styles.value}>{total_redeemable}</div>
				)}
			</div>
			<div className={styles.agent_title}>Available Promocodes</div>
			<div className={styles.promotion_cards}>
				<PromocodeThumbnail promoData={promoData} promoLoading={promoLoading} />
			</div>
		</div>

	);
}
export default OrganizationDetails;
