import { Button, Pill, Popover } from '@cogoport/components';

import getPillsFormat from '../../../../../../helpers/getPillsFormat';

import PopoverContent from './PopoverContent';

const KEY_FROM_ITEM = ['inco_term', 'trade_type', 'free_days_detention_destination'];

function CargoPills({ item }) {
	const { cargo_details = [] } = item || {};

	const initialPills = cargo_details?.[0] || {};

	KEY_FROM_ITEM.forEach((itemKey) => {
		if (item?.[itemKey]) { initialPills[itemKey] = item?.[itemKey]; }
	});

	return (
		<div>
			<div>
				{getPillsFormat(initialPills).map((pill) => <Pill>{pill}</Pill>)}

				{cargo_details?.length > 1 ? (
					<div>
						<Popover render={<PopoverContent list={cargo_details?.slice(1)} />} placement="bottom">
							<Button>{`+${cargo_details.length - 1}`}</Button>
						</Popover>
					</div>
				) : null }

			</div>

		</div>
	);
}
export default CargoPills;
