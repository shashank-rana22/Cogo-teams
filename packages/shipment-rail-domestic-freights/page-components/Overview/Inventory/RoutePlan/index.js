import { cl, Radio, Tooltip } from '@cogoport/components';
import ShipmentInventoryContext from '@cogoport/context/page-components/ShipmentInventoryContext';
import { useContext } from 'react';

import styles from './styles.module.css';

const tooltipContent = (content) => (
	<div className={styles.tooltip_content}>{content}</div>
);

function RoutePlan({
	list = {},
	showSummary = false,
	routeStyles = {},
	type = null,
	itemIdx = -1,
}) {
	const {
		route: { routeList = [], setRouteList = () => {}, routeInformation = {} },
		globalRoute: { globalRouteState = {}, setGlobalRouteState = () => {} },
	} = useContext(ShipmentInventoryContext);

	const handleChange = (routeItem = {}, index = 0) => {
		const tempList = list;
		if (type === 'modal') {
			setGlobalRouteState({
				...globalRouteState,
				isChecked: { item: routeItem, index, static: index % 2 === 0 },
			});
		}
		if (!type) {
			tempList.isChecked = {
				index,
				item   : routeItem,
				static : index % 2 === 0,
			};

			setRouteList([...routeList]);
		}
	};

	const isChecked = (idx) => {
		if (!type) {
			return list?.isChecked?.index === idx;
		}

		if (type === 'modal') {
			return globalRouteState?.isChecked?.index === idx;
		}

		if (type === 'summary') {
			if (idx % 2 !== 0) return false;
			const route = routeInformation?.route ?? [];
			if (routeInformation?.stats?.shipment_state === 'container_departed') {
				if (idx === 2) return true;
			} else if (
				routeInformation?.stats?.shipment_state === 'container_arrived'
			) {
				if (idx === 2 * route.length - 4) return true;
				return false;
			} else if (routeInformation?.stats?.shipment_state === 'completed') {
				if (idx === 2 * route.length - 2) return true;
				return false;
			}
		}
		return false;
	};

	return (
		<div
			className={cl`${styles.container} ${!showSummary ? styles.without_summary : ''}`}
			style={{ ...routeStyles }}
		>
			{(list?.route || [])?.reduce(
				(acc, routeItem, idx, arr) => {
					acc.transitPaased = !acc.transitPaased ? isChecked(idx) : acc.transitPaased;

					acc.list.push(
						<div
							className={styles.route_item}
							data-last-item={idx === arr.length - 1}
						>
							<Radio
								size="md"
								disabled={globalRouteState?.routeList?.has(itemIdx)}
								checked={isChecked(idx)}
								onChange={() => handleChange(routeItem, idx)}
							/>

							<hr className={`${styles.line} ${acc.transitPaased ? styles.dotted : ''}`} />

							<div className={styles.label} data-in-transit={isChecked(idx)}>
								<Tooltip
									placement="bottom"
									content={tooltipContent(routeItem?.name || routeItem?.site_code)}
								>
									<span>{routeItem?.site_code || routeItem?.name}</span>
								</Tooltip>
							</div>
						</div>,
					);
					return acc;
				},
				{ list: [], transitPaased: false },
			).list}
		</div>
	);
}

export default RoutePlan;
