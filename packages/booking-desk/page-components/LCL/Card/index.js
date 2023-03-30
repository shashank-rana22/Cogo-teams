import { IcCFlcl } from '@cogoport/icons-react';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import canCardAnimate from '../../../helpers/canCardAnimate';

import CargoDetails from './CargoDetails';
import { card, card_body, card_footer, separator, animate_card } from './styles.module.css';

export default function Card({ item = {}, isCardAnimatable = false }) {
	return (
		<div className={`${card} ${isCardAnimatable && canCardAnimate({ item }) ? animate_card : ''}`}>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} icon={{ Icon: IcCFlcl, text: 'LCL' }} />

				<div className={separator} />

				<CargoDetails cargo_details={item} />
			</div>

			<div className={card_footer}>
				Approved by RD at: 09 Mar 2023|06:06 pm (Hardcode)
			</div>
		</div>
	);
}
