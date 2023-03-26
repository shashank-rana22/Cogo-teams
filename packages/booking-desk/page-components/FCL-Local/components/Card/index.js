import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import ShipmentInfo from './ShipmentInfo';
import {
	card, card_header, card_body, card_footer, top_left, top_right, separator,
} from './styles.module.css';

export default function Card({ item = {} }) {
	const { trade_type, source } = item;
	const displaySource = source === 'direct' ? 'Sell Without Buy' : startCase(source);

	return (
		<div className={card}>
			<div className={card_header}>
				<Pill size="md" color="yellow" className={top_left}>{startCase(trade_type)}</Pill>
				<Pill size="md" color="var(--color-secondary-3)" className={top_right}>{displaySource}</Pill>
			</div>

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} />

				<div className={separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>

			<div className={card_footer}>
				Approved by RD at: 09 Mar 2023|06:06 pm (Hardcode)
			</div>
		</div>
	);
}
