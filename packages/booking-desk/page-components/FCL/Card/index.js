import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import shouldAnimateCard from '../../../helpers/shouldAnimateCard';
import { getServiceIcon } from '../../../utils/FCL/getServiceIcon';

import CargoDetails from './CargoDetails';
import { card, card_body, card_footer, separator, animate_card } from './styles.module.css';

export default function Card({ item = {}, isCardAnimatable = false }) {
	const serviceIcon = getServiceIcon();

	return (
		<div className={`${card} ${isCardAnimatable && shouldAnimateCard({ item }) ? animate_card : ''}`}>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} serviceIcon={serviceIcon} />

				<div className={separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>

			<div className={card_footer}>
				Approved by RD at: 09 Mar 2023|06:06 pm (Hardcode)
			</div>
		</div>
	);
}
