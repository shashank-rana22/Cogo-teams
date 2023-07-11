import { isEmpty } from '@cogoport/utils';

import CargoDetails from './CargoDetails';
import PriceDetails from './PriceDetails';
import RouteDetails from './RouteDetails';
import styles from './styles.module.css';

function Card({ list, activeTab, setModalState }) {
	if (isEmpty(list)) {
		return null;
	}
	return (
		(list || []).map((item) => (
			<div className={styles.container} key={item?.id}>
				<RouteDetails item={item} />
				<CargoDetails item={item} />
				<PriceDetails item={item} activeTab={activeTab} setModalState={setModalState} />
			</div>
		))
	);
}
export default Card;
