import { useRouter } from '@cogoport/next';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function ListCard({ item = {} }) {
	const Router = useRouter();

	const { shipment_type = '', id = '' } = item;

	const onRowClick = () => {
		if (shipment_type === 'air_freight') {
			Router.push(`/booking/air-freight/${id}`);
			sessionStorage.setItem('air_booking_desk_nav', '/booking/air-freight/');
		} else {
			const newHref = `${window.location.origin}/${Router?.query?.partner_id}/shipments/${id}`;
			window.location.replace(newHref);
			window.sessionStorage.setItem('prev_nav', newHref);
		}
	};

	return (
		<div className={styles.list_card} onClick={() => onRowClick()} aria-hidden="true">
			<ListHeader item={item} />
			<ListBody item={item} />
		</div>
	);
}
export default ListCard;
