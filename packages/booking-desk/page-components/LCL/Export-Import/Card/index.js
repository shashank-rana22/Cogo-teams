import { IcCFlcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../commons/Card/CardHeader';
import PortDetails from '../../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../commons/Card/ShipmentInfo';
import isCardCritical from '../../../../helpers/isCardCritical';
import styles from '../../card.module.css';

import CargoDetails from './CargoDetails';

export default function Card({ item = {}, couldBeCardsCritical = false }) {
	const router = useRouter();
	const handleCardClick = (e) => {
		window.location.href = e.target.href;

		window.sessionStorage.setItem('prev_nav', e.target.href);
		window.location.href = e.target.href;
	};
	const criticalClass = couldBeCardsCritical && isCardCritical({ item }) ? styles.critical_card : '';

	return (
		<a
			href={`${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`}
			className={`${styles.card} ${criticalClass}`}
			onClick={handleCardClick}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcCFlcl, text: 'LCL' }} />

				<div className={styles.separator} />

				<CargoDetails cargo_details={item} />
			</div>
		</a>
	);
}
