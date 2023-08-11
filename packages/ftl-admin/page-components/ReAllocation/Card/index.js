import { Checkbox } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
} from '../../../common/ShipmentCard';

import styles from './styles.module.css';

function Card({
	data = {},
	isSelectable = false,
	selectedShipments = new Set(),
	setSelectedShipments = () => {},
}) {
	const router = useRouter();

	const handleCardClick = (e) => {
		if (e.target?.type === 'checkbox') { return; }
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${data?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			className={styles.container}
			onClick={handleCardClick}
			role="presentation"
		>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
					{!!isSelectable && (
						<Checkbox
							checked={selectedShipments.has(data?.id)}
							onChange={(e) => {
								if (e?.target?.checked) {
									selectedShipments.add(data?.id);
								} else selectedShipments.delete(data?.id);
								setSelectedShipments(new Set(selectedShipments));
							}}
						/>
					)}
					<div>
						<BasicDetails data={data} />

						<AssignedStakeholder data={data} />
					</div>
				</div>

				<div className={styles.divider} />

				<div className={styles.icon_container}>
					<ShipmentIcon shipment_type={data?.shipment_type} />
				</div>

				<div className={styles.location_container}>
					<DualLocation data={data} />
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
