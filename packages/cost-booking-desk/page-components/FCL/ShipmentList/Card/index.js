import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFfcl, IcMFcustoms, IcMFlocalCharges } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useContext } from 'react';

import CardHeader from '../../../../common/Card/CardHeader';
import LineItems from '../../../../common/Card/LineItems';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';
import CONSTANTS from '../../../../config/constants.json';
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

const SHIPMENT_TYPE = {
	fcl_freight: 'fcl',
};

const STEPPER_TAB = ['import', 'export'];

function Card({ item = {} }) {
	const router = useRouter();
	const contextValues = useContext(CostBookingDeskContext);

	const { partner_id = '' } = router.query || {};

	const { shipmentType, stepperTab, activeTab } = contextValues || {};

	const hrefPrefix = shipmentType in SHIPMENT_TYPE && STEPPER_TAB.includes(stepperTab)
		? `${window.location.origin}/v2/${partner_id}/booking/${SHIPMENT_TYPE[shipmentType]}/`
		: `${window.location.origin}/${partner_id}/shipments/`;

	const handleCardClick = (e) => {
		const newUrl = e.currentTarget.href;
		window.sessionStorage.setItem('prev_nav', newUrl);
	};

	const iconProps = SHIPMENT_ICON[item?.shipment_type] || SHIPMENT_ICON.fcl_freight;

	const isSinglePort = ['fcl_freight_local', 'fcl_customs'].includes(item?.shipment_type);

	const isShipmentCritical = getCriticalShipment({ contextValues, shipment: item });

	const showGateInCutOff = ['assigned', 'in_progress'].includes(activeTab) && item?.gate_in_cutoff;

	return (
		<a
			href={`${hrefPrefix}${item?.id}?${CONSTANTS.url_navigation_params}`}
			onClick={handleCardClick}
			className={cl`${styles.card} ${isShipmentCritical ? styles.animate_card : ''}`}
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
					{['fcl_freight_local', 'fcl_customs']?.includes(item?.shipment_type)
						? <CargoDetailsLocal item={item} />
						: <CargoDetails cargo_details={item?.cargo_details || []} item={item} />}
				</div>
			</div>

			{showGateInCutOff ? (
				<div className={styles.gate_in_cutoff}>
					GateIn Cutoff:
					{' '}
					{formatDate({
						date       : item.gate_in_cutoff,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ', ',
					}) || 'NA'}
				</div>
			) : null}
		</a>
	);
}
export default Card;
