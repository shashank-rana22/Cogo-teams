import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../common/Card/CardHeader';
import PortDetails from '../../../common/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../common/Card/ShipmentInfo';
import getAnimatedCard from '../../../helpers/getAnimatedCard';

import CargoDetails from './CargoDetails';
import LineItems from './LineItems';
import styles from './styles.module.css';

function Card({ item = {}, couldBeCardsCritical = false, activeTab = '' }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			// className={`${styles.card} ${animateClass ? styles.animate_card : ''}`}
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
			<div className={styles.card_footer}>
				{true ? (
					<div className={styles.footer}>
						GateIn Cutoff:
						{' '}
						{format(item.gate_in_cutoff, 'dd MMM yyyy, hh:mm aaa', null, true)}
					</div>
				) : null}

				<LineItems item={item} />
			</div>

		</div>
	);
}
export default Card;
