import { Pill, Popover } from '@cogoport/components';

import getPillsFormat from '../../../../../../helpers/getPillsFormat';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

const KEY_FROM_ITEM = ['inco_term', 'trade_type', 'free_days_detention_destination'];

function CargoPills({ item = {} }) {
	const { cargo_details = [] } = item || {};

	const initialPills = cargo_details?.[0] || {};

	KEY_FROM_ITEM.forEach((itemKey) => {
		if (item?.[itemKey]) { initialPills[itemKey] = item?.[itemKey]; }
	});

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
