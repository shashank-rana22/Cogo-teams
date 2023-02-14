import { Pill } from '@cogoport/components';
import { IcCCogoCoin } from '@cogoport/icons-react';

// import useGetListOrganization from '../../../hooks/useGetListOrganization';

import OrgAgentDetails from './OrgAgentDetails';
import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

function OrganizationDetails() {
	// const { data } = useGetListOrganization();
	// console.log('data', data);
	return (
		<div className={styles.container}>
			<div className={styles.title}>Organisation Details</div>
			<div className={styles.content}>
				<div className={styles.organization_details}>
					<div className={styles.name}>Shri Hari Shipping Service </div>
					<div className={styles.location}>Mumbai, India</div>
				</div>
				<div>
					<Pill
						key="Verified"
					// prefix={item.prefixIcon}
						size="sm"
						color="#DDEBC0"
					>
						Verified
					</Pill>
				</div>
			</div>
			<div className={styles.name}>ID: 387343434</div>
			<div>
				<Pill
					key="Importer/Exporter"
					// prefix={item.prefixIcon}
					size="sm"
					color="#FFF7BF"
				>
					Importer/Exporter
				</Pill>
			</div>
			<div className={styles.agent_title}>Agent Details (2)</div>
			<OrgAgentDetails />
			<div className={styles.agent_title}>Reedemable Cogopoints</div>
			<div className={styles.points}>
				<div className={styles.cogo_icon}>
					<IcCCogoCoin width={20} height={20} />
				</div>

				<div className={styles.cogopoints}>Cogopoints : </div>
				<div className={styles.value}>9,00,000</div>
			</div>
			<div className={styles.agent_title}>Available Promocodes</div>
			<div className={styles.promotion_cards}>
				<PromocodeThumbnail />
			</div>
		</div>

	);
}
export default OrganizationDetails;
