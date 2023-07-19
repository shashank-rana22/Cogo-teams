import { IcCFfcl } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../config/constants.json';
import styles from '../card.module.css';

import CardFooter from './CardFooter';

export default function Card({ item = {}, activeTab = '' }) {
	return (
		<Link
			href="/booking/igm/fcl/[shipment_id]"
			as={`/booking/igm/fcl/${item.id}?${CONSTANTS.url_navigation_params}`}
			className={styles.card}
		>
			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={styles.separator} />

				<div className={styles.heading}>
					<span>CFS Address:</span>
					<div className={styles.cfs_details}>
						RSP Tower, Plot No.28-P, Urban Estate, Sector - 44 ,Gurgaon – 122003, Haryana, India
					</div>
				</div>
			</div>

			{activeTab !== 'daily_report' ? <CardFooter item={item} /> : null}
		</Link>
	);
}
