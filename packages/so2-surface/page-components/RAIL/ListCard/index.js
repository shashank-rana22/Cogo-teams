// import { useRouter } from '@cogoport/next';

import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';
import ViewCollectionParties from './ViewCollectionParties';

function ListCard({ item = {} }) {
	const [dropDown, setDropDown] = useState(false);
	console.log('itemhello', item);
	// const Router = useRouter();
	// const { shipment_type = '', id = '' } = item;

	// const onRowClick = () => {
	// 	if (shipment_type === 'air_freight') {
	// 		Router.push(`/booking/air-freight/${id}`);
	// 	} else {
	// 		const newHref = `${window.location.origin}/${Router?.query?.partner_id}/shipments/${id}`;
	// 		window.location.replace(newHref);
	// 		window.sessionStorage.setItem('prev_nav', newHref);
	// 	}
	// };

	return (
		// <div className={styles.list_card} onClick={() => onRowClick()} aria-hidden="true">
		<div className={styles.list_card} aria-hidden="true">
			<ListHeader item={item} />
			<ListBody item={item} />
			{dropDown ? <ViewCollectionParties shipmentId={item?.id} /> : null}
			<div
				role="button"
				tabIndex={0}
				onClick={() => setDropDown(!dropDown)}
				className={styles.dropdown}
			>
				{ dropDown ? (
					<div className={styles.dropdown_inner}>
						<div>See Less</div>
						<IcMArrowUp />
					</div>
				) : (
					<div className={styles.dropdown_inner}>
						<div>See More</div>
						<IcMArrowDown />
					</div>
				) }

			</div>

		</div>
	);
}
export default ListCard;
