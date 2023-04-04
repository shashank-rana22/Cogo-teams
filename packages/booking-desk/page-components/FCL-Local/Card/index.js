import { IcMFlocalCharges } from '@cogoport/icons-react';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/SingleLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import canCardAnimate from '../../../helpers/canCardAnimate';

import CargoDetails from './CargoDetails';
import { card, card_body, card_footer, separator, animate_card } from './styles.module.css';

export default function Card({ item = {}, isCardAnimatable = false }) {
	const handleCardClick = () => {
		let currUrl = window.location.href;
		currUrl = currUrl.replace('/v2/en-IN', '');
		const newUrl = currUrl.replace('booking-desk', `shipments/${item.id}`);

		window.location.href = newUrl;
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			className={`${card} ${isCardAnimatable && canCardAnimate({ item }) ? animate_card : ''}`}
		>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} icon={{ Icon: IcMFlocalCharges, text: 'FCL Local' }} />

				<div className={separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>

			<div className={card_footer}>
				Approved by RD at: 09 Mar 2023|06:06 pm (Hardcode)
			</div>
		</div>
	);
}
