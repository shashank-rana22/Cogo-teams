import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';

import CargoDetails from './CargoDetails';
import { card, card_body, card_footer, separator } from './styles.module.css';

export default function Card({ item = {} }) {
	return (
		<div className={card}>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} />

				<div className={separator} />

				<CargoDetails cargo_details={item} />
			</div>

			<div className={card_footer}>
				Approved by RD at: 09 Mar 2023|06:06 pm (Hardcode)
			</div>
		</div>
	);
}
