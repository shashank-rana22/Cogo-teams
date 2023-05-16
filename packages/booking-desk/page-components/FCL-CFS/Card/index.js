import { IcMFcfs } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/SingleLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import isCardCritical from '../../../helpers/isCardCritical';

import CargoDetails from './CargoDetails';
import styles from './styles.module.css';

export default function Card({ item = {}, couldBeCardsCritical = false }) {
	const router = useRouter();
	const handleCardClick = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			className={`${styles.card} ${couldBeCardsCritical && isCardCritical({ item }) ? styles.critical_card : ''}`}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				<PortDetails data={item} icon={{ Icon: IcMFcfs, text: 'FCL CFS' }} />

				<div className={styles.separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>
		</div>
	);
}
