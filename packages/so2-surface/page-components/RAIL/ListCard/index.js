import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';
import ViewCollectionParties from './ViewCollectionParties/index';

function ListCard({ item = {} }) {
	const [dropDown, setDropDown] = useState(false);

	return (
		<div className={styles.list_card} aria-hidden="true">
			<ListHeader item={item} />
			<ListBody item={item} />
			{dropDown ? <ViewCollectionParties shipmentId={item?.id} /> : null}
			<button
				onClick={() => setDropDown((prev) => !prev)}
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
			</button>
		</div>
	);
}
export default ListCard;
