import { Checkbox, Select, cl } from '@cogoport/components';
import ShipmentInventoryContext from '@cogoport/context/page-components/ShipmentInventoryContext';
import { useContext } from 'react';

import RoutePlan from '../RoutePlan';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Empty',
		value : 'empty',
	},
	{
		label : 'Loaded',
		value : 'loaded',
	},
];
function CardItems({ item = {}, index = 0 }) {
	const {
		route: { routeList, setRouteList },
		globalRoute: { globalRouteState = {}, setGlobalRouteState = () => {} },
	} = useContext(ShipmentInventoryContext);

	const handleChange = (name, value) => {
		routeList.splice(index, 1, { ...item, [name]: value });

		setRouteList([...routeList]);
	};

	const handleCheckboxChange = (containerIdx) => {
		const globalRouteList = globalRouteState?.routeList ?? new Set();

		if (globalRouteList.has(containerIdx)) {
			globalRouteList.delete(containerIdx);
		} else globalRouteList.add(containerIdx);

		if (globalRouteList.size === routeList.length) {
			globalRouteState.allSelected = true;
		} else globalRouteState.allSelected = false;

		setGlobalRouteState({ ...globalRouteState });
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.container_number_container} ${styles.text}`}>
				<Checkbox
					checked={globalRouteState?.routeList?.has(index)}
					onChange={() => handleCheckboxChange(index)}
				/>
				<div className={styles.container_number}>{item?.container_number}</div>
			</div>
			<div className={cl`${styles.route} ${styles.text}`}>
				<RoutePlan list={item} itemIdx={index} />
			</div>

			<div className={cl`${styles.status} ${styles.text}`}>
				<Select
					disabled={globalRouteState?.routeList?.has(index)}
					size="lg"
					options={OPTIONS}
					placeholder="Select"
					value={item.loading_status}
					onChange={(data) => handleChange('loading_status', data)}
				/>
			</div>
		</div>
	);
}
export default CardItems;
