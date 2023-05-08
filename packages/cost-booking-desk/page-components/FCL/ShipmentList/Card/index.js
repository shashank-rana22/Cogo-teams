import { IcCFfcl, IcMFcustoms, IcMFlocalCharges } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import { useContext } from 'react';

import CardHeader from '../../../../common/Card/CardHeader';
import LineItems from '../../../../common/Card/LineItems';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';
import CostBookingDeskContext from '../../../../context/CostBookingDeskContext';
import getCriticalShipment from '../../../../helpers/getCriticalShipment';

import CargoDetails from './CargoDetails';
import CargoDetailsLocal from './CargoDetails_v2';
import DualPort from './PortDetails/DualLocation';
import SinglePort from './PortDetails/SingleLocation';
import styles from './styles.module.css';

const SHIPMENT_ICON = {
	fcl_customs: {
		Icon : IcMFcustoms,
		text : 'FCL Customs',
	},
	fcl_freight_local: {
		Icon : IcMFlocalCharges,
		text : 'FCL Local',
	},
	fcl_freight: {
		Icon : IcCFfcl,
		text : 'FCL',
	},
};

function Card({ item = {} }) {
	const contextValues = useContext(CostBookingDeskContext);

	const { activeTab } = contextValues || {};

	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};

	const iconProps = SHIPMENT_ICON[item?.shipment_type] || SHIPMENT_ICON.fcl_freight;

	const isSinglePort = ['fcl_freight_local', 'fcl_customs'].includes(item?.shipment_type);

	const isShipmentCritical = getCriticalShipment({ contextValues, shipment: item });

	const showGateInCutOff = ['assigned', 'in_progress'].includes(activeTab) && item?.gate_in_cutoff;

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			className={`${styles.card} ${isShipmentCritical ? styles.animate_card : ''}`}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.port}>
					{isSinglePort
						? <SinglePort data={item} icon={iconProps} />
						: <DualPort data={item} icon={iconProps} />}
				</div>

				<div className={styles.separator} />

				<div className={styles.line_item}>
					<LineItems item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.cargo}>
					{item?.shipment_type === 'fcl_freight_local'
						? <CargoDetailsLocal item={item} />
						: <CargoDetails cargo_details={item?.cargo_details || []} item={item} />}
				</div>
			</div>

			{showGateInCutOff ? (
				<div className={styles.gate_in_cutoff}>
					GateIn Cutoff:
					{' '}
					{format(item.gate_in_cutoff, 'dd MMM yyyy, hh:mm aaa')}
				</div>
			) : null}
		</div>
	);
}
export default Card;
