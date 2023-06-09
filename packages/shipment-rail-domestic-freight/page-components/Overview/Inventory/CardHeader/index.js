import { Checkbox, cl } from '@cogoport/components';
import ShipmentInventoryContext from '@cogoport/context/page-components/ShipmentInventoryContext';
import { useContext } from 'react';

import styles from './styles.module.css';

function CardHeader() {
	const {
		route: { routeList },
		globalRoute: { globalRouteState = {}, setGlobalRouteState = () => {} },
	} = useContext(ShipmentInventoryContext);

	const onChange = () => {
		if (globalRouteState?.allSelected) {
			setGlobalRouteState({
				...globalRouteState,
				allSelected : false,
				routeList   : new Set(),
			});
		} else {
			setGlobalRouteState({
				...globalRouteState,
				allSelected : true,
				routeList   : new Set(Array(routeList?.length || 0)
					.fill()
					.map((_, idx) => idx)),
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.header} ${styles.container}`}>
				<Checkbox
					checked={!!globalRouteState?.allSelected}
					onChange={onChange}
				/>
				<div className={styles.text}>Container No</div>
			</div>

			<div className={styles.header}>Location</div>
			<div className={cl`${styles.header} ${styles.status}`}>Status</div>
		</div>
	);
}

export default CardHeader;
