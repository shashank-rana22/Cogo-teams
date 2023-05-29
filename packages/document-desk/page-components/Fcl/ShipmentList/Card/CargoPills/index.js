import { Pill, Popover } from '@cogoport/components';

import getPillsFormat from '../../../../../helpers/getPillsFormat';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

const KEY_FROM_ITEM = ['inco_term', 'trade_type', 'bl_category'];

const LOCAL_CUSTOMS_ITEM = ['container_type', 'container_size', 'commodity',
	'containers_count', 'commodity', 'trade_type'];

function CargoPills({ item = {} }) {
	const { cargo_details = [], shipment_type = '' } = item || {};

	const initialPills = cargo_details?.[0] || {};

	if (shipment_type === 'fcl_freight') {
		KEY_FROM_ITEM.forEach((itemKey) => {
			if (item?.[itemKey]) { initialPills[itemKey] = item?.[itemKey]; }
		});
	} else {
		LOCAL_CUSTOMS_ITEM.forEach((itemKey) => {
			if (item?.[itemKey]) { initialPills[itemKey] = item?.[itemKey]; }
		});
	}

	return (
		<div className={styles.container}>
			{getPillsFormat(initialPills)?.map((pill) => <Pill>{pill}</Pill>)}

			{cargo_details?.length > 1 ? (
				<div className={styles.popover_container}>
					<Popover
						render={<PopoverContent list={cargo_details?.slice(1)} />}
						placement="bottom"
						trigger="mouseenter"
					>
						<div className={styles.popover_button_content}>
							{`+${cargo_details.length - 1} 
							Detail${cargo_details.length > 2 ? 's' : ''}` }
						</div>
					</Popover>
				</div>
			) : null }

		</div>
	);
}
export default CargoPills;
