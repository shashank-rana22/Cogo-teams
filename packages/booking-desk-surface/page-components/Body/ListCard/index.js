import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
} from '../../../commons/ShipmentCard';

import styles from './styles.module.css';

function Card({ data = {} }) {
	const router = useRouter();

	const handleCardClick = (e) => {
		if (e.target?.type === 'checkbox') { return; }
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${data?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<button
			className={styles.container}
			onClick={handleCardClick}
		>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
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
									style={{ marginBottom: '2px', color: '#f00' }}
								/>
							</div>
						</Tooltip>
					)}
				</div>
			</div>
		</button>
	);
}

export default Card;
