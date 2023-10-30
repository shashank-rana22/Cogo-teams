import { useRouter } from '@cogoport/next';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
	SingleLocation,
} from '../../../common/ShipmentCard';
import CONSTANTS from '../../../config/constants.json';
import isSingleLocation from '../../../utils/checkSingleLocation';

import styles from './styles.module.css';

const SHIPMENT_TYPE = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
	ftl_freight : 'ftl',

};

function Card({ data = {} }) {
	const router = useRouter();
	const { partner_id = '' } = router.query || {};
	const { shipment_type = '' } = data;

	let href = Object.keys(SHIPMENT_TYPE).includes(shipment_type)
		? `${window.location.origin}/v2/${partner_id}/booking/${SHIPMENT_TYPE[shipment_type]}/`
		: `${window.location.origin}/${partner_id}/shipments/`;
	href += `/${data?.id}?${CONSTANTS.url_navigation_params}`;

	const handleCardClick = (e) => {
		const newUrl = e.currentTarget.href;
		window.sessionStorage.setItem('prev_nav', newUrl);
	};

	return (
		<a
			href={href}
			className={styles.container}
			onClick={handleCardClick}
		>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
					<BasicDetails data={data} />

					<AssignedStakeholder data={data} />
				</div>

				<div className={styles.divider} />

				<div className={styles.icon_container}>
					<ShipmentIcon shipment_type={shipment_type} />
				</div>

				<div className={styles.location_container}>
					{isSingleLocation(shipment_type) ? (
						<SingleLocation data={data} />
					) : (
						<DualLocation data={data} />
					)}
				</div>

				<div className={styles.divider} />

				<div className={styles.pill_container}>
					<CargoPills data={data} />
				</div>
			</div>
		</a>
	);
}

export default Card;
