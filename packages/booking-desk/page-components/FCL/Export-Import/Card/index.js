import { IcCFfcl } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../../commons/Card/CardHeader';
import PortDetails from '../../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../../config/constants.json';
import isCardCritical from '../../../../helpers/isCardCritical';
import styles from '../../card.module.css';

import CargoDetails from './CargoDetails';

export default function Card({ item = {}, couldBeCardsCritical = false, activeTab = '' }) {
	const criticalClass = couldBeCardsCritical && isCardCritical({ item, activeTab }) ? styles.critical_card : '';

	return (
		<Link
			href="/booking/fcl/[shipment_id]"
			as={`/booking/fcl/${item.id}?${CONSTANTS.url_navigation_params}`}
			className={`${styles.card} ${criticalClass}`}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={styles.separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} activeTab={activeTab} item={item} />
			</div>

			{item?.approved_at ? (
				<div className={styles.card_footer}>
					Approved by RD at:
					{' '}
					{format(item.approved_at, 'dd MMM yyyy | hh:mm aaa')}
				</div>
			) : null}
		</Link>
	);
}
