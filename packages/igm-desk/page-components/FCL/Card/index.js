import { IcCFfcl } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import PortDetails from '../../../commons/Card/PortDetails';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../config/constants.json';

import CardFooter from './CardFooter';
import styles from './styles.module.css';

export default function Card({ item = {}, activeTab = '' }) {
	return (
		<Link
			href="/booking/igm/fcl/[shipment_id]"
			as={`/booking/igm/fcl/${item.id}?${CONSTANTS.url_navigation_params}`}
			className={styles.card}
		>
			<section className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={styles.separator} />

				<div className={styles.heading}>
					<span>CFS Address:</span>
					<span className={styles.cfs_details}>
						{item?.cfs_address ?? 'NA'}
					</span>
				</div>
			</section>

			{activeTab !== 'daily_report' ? <CardFooter item={item} /> : null}
		</Link>
	);
}
