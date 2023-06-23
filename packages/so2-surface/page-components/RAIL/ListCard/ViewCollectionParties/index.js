import useListShipmentCollectionParty from '../../../../hooks/useListShipmentCollectionParty';

import CollectionPartyCard from './CollectionPartyCard';
import styles from './styles.module.css';

function ViewCollectionParties({ shipmentId }) {
	const { loading, data } = useListShipmentCollectionParty(shipmentId);

	const list = data?.list;

	return (
		<div>
			<div className={styles.line} />
			<div className={styles.main}>
				{list?.map((item) => (
					<CollectionPartyCard
						key={item?.service_provider_id}
						data={item}
					/>
				))}
			</div>
		</div>

	);
}

export default ViewCollectionParties;
