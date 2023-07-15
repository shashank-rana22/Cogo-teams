import { IcCFfcl } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../config/constants.json';
import styles from '../card.module.css';

import CardFooter from './CardFooter';
import CargoDetails from './CargoDetails';

export default function Card({ item = {}, activeTab = '' }) {
	return (
		<Link
			href="/booking/fcl/[shipment_id]"
			as={`/booking/fcl/${item.id}?${CONSTANTS.url_navigation_params}`}
			className={styles.card}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={styles.separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} activeTab={activeTab} item={item} />
			</div>

			{activeTab !== 'completed' ? <CardFooter item={item} /> : null}
		</Link>
	);
}
