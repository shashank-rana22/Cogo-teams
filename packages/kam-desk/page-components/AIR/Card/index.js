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
import isSingleLocation from '../../../utils/checkSingleLocation';

import styles from './styles.module.css';

function Card({ data = {} }) {
	const router = useRouter();

	const handleCardClick = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${data?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			className={styles.container}
			onClick={handleCardClick}
			role="button"
			tabIndex={0}
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
					<ShipmentIcon shipment_type="air_freight" />
				</div>

				<div className={styles.location_container}>
					{isSingleLocation(data?.shipment_type) ? (
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
		</div>
	);
}

export default Card;
