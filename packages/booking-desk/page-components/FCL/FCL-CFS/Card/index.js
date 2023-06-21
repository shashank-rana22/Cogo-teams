import { IcMFcfs } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../commons/Card/CardHeader';
import PortDetails from '../../../../commons/Card/PortDetails/SingleLocation';
import ShipmentInfo from '../../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../../config/constants.json';
import isCardCritical from '../../../../helpers/isCardCritical';
import styles from '../../card.module.css';

import CargoDetails from './CargoDetails';

export default function Card({ item = {}, couldBeCardsCritical = false }) {
	const router = useRouter();
	const handleCardClick = (e) => {
		const newUrl = e.currentTarget.href;
		window.sessionStorage.setItem('prev_nav', newUrl);
	};

	const criticalClass = couldBeCardsCritical && isCardCritical({ item }) ? styles.critical_card : '';

	return (
		<a
			href={`${window.location.origin}/${router?.query?.partner_id}
			/shipments/${item?.id}?${CONSTANTS.url_navigation_params}`}
			className={`${styles.card} ${criticalClass}`}
			onClick={handleCardClick}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcMFcfs, text: 'FCL CFS' }} />

				<div className={styles.separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>
		</a>
	);
}
