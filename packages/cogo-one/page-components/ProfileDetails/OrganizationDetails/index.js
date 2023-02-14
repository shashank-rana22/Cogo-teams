import { Pill, Carousel } from '@cogoport/components';

import OrgAgentDetails from './OrgAgentDetails';
import styles from './styles.module.css';

function OrganizationDetails() {
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
				<div className={styles.cogopoints}>Cogopoints : </div>
				<div className={styles.value}>9,00,000</div>
			</div>
			<div className={styles.agent_title}>Available Promocodes</div>
			<div className={styles.promotion}>
				<Carousel size="sm" showDots showArrow={false}>
					<div className={styles.promo_image} />
				</Carousel>
			</div>
		</div>

	);
}
export default OrganizationDetails;
