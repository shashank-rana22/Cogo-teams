import { Tooltip, Checkbox } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useContext } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
} from '../../../common/ShipmentCard';
import { SIDBeforeDepartureContext } from '../context';

import styles from './styles.module.css';

function Card({ data = {}, isSelectable = false }) {
	const router = useRouter();

	const { selectedShipments, setSelectedShipments } = useContext(SIDBeforeDepartureContext);

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
			role="button"
			tabIndex={0}
		>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
					{!!isSelectable && (
						<Checkbox
							checked={selectedShipments.has(data?.serial_id)}
							onChange={(e) => {
								if (e?.target?.checked) {
									selectedShipments.add(data?.serial_id);
								} else selectedShipments.delete(data?.serial_id);
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
					{data?.fm_rejection_reason && (
						<Tooltip
							content={(
								<div className={styles.rejection_tooltip}>
									{data?.fm_rejection_reason}
								</div>
							)}
							placement="top"
						>
							<div style={{ marginBlock: 'auto' }}>
								<IcMInfo
									width={15}
									height={15}
									style={{ marginBottom: '2px', color: 'red' }}
								/>
							</div>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
