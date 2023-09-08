import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetEntities from '../../../../hooks/useGetEntities';
import Card from '../Card';

import styles from './styles.module.css';

function Agent({ primary_service = {} }) {
	const entity_id = Object.values(ENTITY_MAPPING).filter(
		(value) => value?.country_code === primary_service?.origin_port?.country_code,
	)[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const { listEntities = {} } = useGetEntities({ entity_id });

	return (
		<Card title="Origin Agent">
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
