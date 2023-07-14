import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListShipmentCollectionParty from '../../../../hooks/useListShipmentCollectionParty';

import CollectionPartyCard from './CollectionPartyCard';
import styles from './styles.module.css';

const LOADER_ARRAY_LENGTH = 5;
const LOADER_ARRAY = Array.from(Array(LOADER_ARRAY_LENGTH).keys());

function ViewCollectionParties({ shipmentId = '' }) {
	const { loading, data } = useListShipmentCollectionParty(shipmentId);

	const list = data?.list;

	const getCollectionPartyCard = () => (isEmpty(list)
		? (
			<div className={styles.flex}>
				No Data Found
			</div>
		)
		: list?.map((item) => (
			<CollectionPartyCard
				key={item?.service_provider_id}
				data={item}
			/>
		)));

	const getLoader = () => (
		<div className={styles.flex}>
			{LOADER_ARRAY.map((item) => (
				<Placeholder
					key={item}
					className={styles.placeholder}
				/>
			))}
		</div>
	);

	return (
		<section>
			<div className={styles.line} />
			<div className={styles.main}>
				{loading
					? getLoader()
					: getCollectionPartyCard()}
			</div>
		</section>
	);
}

export default ViewCollectionParties;
