import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../../commons/Card/CardHeader';
import PortDetails from '../../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../commons/Card/ShipmentInfo';
import isCardCritical from '../../../../helpers/isCardCritical';
import styles from '../../card.module.css';

import CargoDetails from './CargoDetails';

export default function Card({ item = {}, couldBeCardsCritical = false, activeTab = '' }) {
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
		</a>
	);
}
