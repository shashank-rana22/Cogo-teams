import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../../common/Card/CardHeader';
import CargoDetails from '../../../../common/Card/CargoDetails';
import LineItems from '../../../../common/Card/LineItems';
import PortDetails from '../../../../common/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';

import styles from './styles.module.css';

function Card({ item = {} }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			className={styles.card}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.port}>
					<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />
				</div>

				<div className={styles.separator} />

				<div className={styles.line_item}>
					<LineItems item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.cargo}>
					<CargoDetails cargo_details={item?.cargo_details || []} item={item} />
				</div>
			</div>

			<div className={styles.footer}>
				GateIn Cutoff:
				{' '}
				{format(item.gate_in_cutoff, 'dd MMM yyyy, hh:mm aaa', null, true)}
			</div>

		</div>
	);
}
export default Card;
