import { Pill, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getPillsFormat from '../../../helpers/getPillsFormat';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

const KEY_FROM_ITEM = ['trade_type', 'free_days_detention_destination', 'container_size', 'container_type',
	'commodity', 'containers_count', 'cargo_weight_per_container', 'destination_cargo_handling_type',
	'truck_type', 'trucks_count'];

const MINIMUM_COUNT_FOR_PLURAL = 1;

function CargoPills({ data = {} }) {
	const { cargo_details } = data || {};

	const [initialPills = {}, ...restPills] = cargo_details || [];

	KEY_FROM_ITEM.forEach((itemKey) => {
		if (data?.[itemKey]) {
			if (itemKey === 'trucks_count') {
				const truckCount = data?.[itemKey];
				initialPills[itemKey] = `${data?.[itemKey]} truck${+truckCount > MINIMUM_COUNT_FOR_PLURAL
					? 's' : ''}`;
				return;
			}
			initialPills[itemKey] = data?.[itemKey];
		}
	});

	return (
		<div className={styles.container} style={data?.fm_rejection_reason ? { flex: 1 } : {}}>
			{getPillsFormat(initialPills)?.map((pill) => (
				<Pill key={pill}>{pill}</Pill>
			))}

			{!isEmpty(restPills) ? (
				<div className={styles.popover_container}>
					<Popover
						render={<PopoverContent list={restPills} />}
						placement="bottom"
						trigger="mouseenter"
					>
						<div className={styles.popover_button_content}>
							{`+${restPills?.length} 
							Detail${cargo_details?.length > MINIMUM_COUNT_FOR_PLURAL ? 's' : ''}`}
						</div>
					</Popover>
				</div>
			) : null}
		</div>
	);
}
export default CargoPills;
