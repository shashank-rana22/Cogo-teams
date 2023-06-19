import { useRouter } from '@cogoport/next';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function ListCard({ item = {} }) {
	const Router = useRouter();

	const { shipment_type = '', id = '' } = item;

	const shipmentType = shipment_type.replaceAll('_', '-');

	const onRowClick = () => {
		Router.push(`/booking/${shipmentType}/${id}`);
	};

	return (
		<div className={styles.list_card} onClick={() => onRowClick()} aria-hidden="true">
			<ListHeader item={item} />
			<ListBody item={item} />
		</div>
	);
}
export default ListCard;
