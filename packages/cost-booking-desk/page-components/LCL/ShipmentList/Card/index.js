import { IcCFlclCustoms, IcMFlcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../common/Card/CardHeader';
import CargoDetails from '../../../../common/Card/CargoDetails';
import LineItems from '../../../../common/Card/LineItems';
import PortDetails from '../../../../common/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';

import styles from './styles.module.css';

const SHIPMENT_ICON = {
	lcl_customs: {
		Icon : IcCFlclCustoms,
		text : 'LCL Customs',
	},
	lcl_freight: {
		Icon : IcMFlcl,
		text : 'LCL',
	},
};

function Card({ item = {} }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};

	const iconProps = SHIPMENT_ICON[item?.shipment_type] || SHIPMENT_ICON.lcl_freight;

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
					<PortDetails data={item} icon={iconProps} />
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
		</div>
	);
}
export default Card;
