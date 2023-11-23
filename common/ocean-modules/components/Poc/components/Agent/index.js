import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetEntities from '../../../../hooks/useGetEntities';
import Card from '../Card';

import styles from './styles.module.css';

function Agent({ primary_service = {}, shipmentStakeholderData = [] }) {
	const entity_id = Object.values(ENTITY_MAPPING).filter(
		(value) => value?.country_code === primary_service?.origin_port?.country_code,
	)[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const { listEntities = {} } = useGetEntities({ entity_id });

	return (
		<Card title="Origin Agent">
			{shipmentStakeholderData?.map((item) => {
				const {
					stakeholder_type = '',
					user: {
						name = '', email = '', mobile_country_code = '', mobile_number = '',
					},
					id,
				} = item || {};

				if (stakeholder_type !== 'origin_booking_agent') {
					return null;
				}

				const contact_number = `${mobile_country_code} ${mobile_number}`;

				return (
					<div className={styles.stakeholder_container} key={id}>
						<div className={styles.business_name}>Origin KAM Details</div>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								Name
								{' '}
								:
							</span>
							{name}
						</div>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								Contact
								{' '}
								:
							</span>
							{contact_number}
						</div>
						<div className={styles.stakeholder}>
							<span className={styles.stakeholder_type}>
								Email
								{' '}
								:
							</span>
							{email}
						</div>
					</div>
				);
			})}
			{(listEntities?.list || []).map((item) => (
				<div key={item?.id}>
					<div className={styles.business_name}>{item?.business_name}</div>
					<div className={styles.address}>{item?.addresses?.[GLOBAL_CONSTANTS.zeroth_index]?.address}</div>
				</div>
			))}
		</Card>
	);
}

export default Agent;
