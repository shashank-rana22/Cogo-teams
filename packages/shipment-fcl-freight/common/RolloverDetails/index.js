import { IcMError } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import styles from './styles.module.css';

const INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER = 0;

export default function RolloveDetails({ shipment_data }) {
	const { rollover_shipments_details = [], parent_shipment_id = '', isGettingShipment } = shipment_data || {};

	const [firstRollover, secondRollover] = (
		rollover_shipments_details || []
	).map((details) => ({
		...details,
		containers_count_data: details?.containers_count_data.reduce(
			(prev, curr) => prev + curr,
			INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER,
		),
	}));

	if (!firstRollover) {
		return null;
	}

	return (
		<div>
			{firstRollover ? (
				<div className={styles.rollover_tag}>
					<IcMError width={20} height={20} fill="#CB6464" />

					<div>Rollover:</div>
					<b>
						{firstRollover.containers_count_data}
						{' '}
						containers
					</b>
					{' '}
					<Link
						href="/booking/fcl/[shipment_id]"
						as={`/booking/fcl/${firstRollover.id}`}
						replace
						className={styles.link}
					>
						#
						{firstRollover.serial_id}
					</Link>

					{secondRollover ? (
						<>
							<div className={styles.vertical_line} />

							<b>
								{secondRollover.containers_count_data}
								{' '}
								containers
							</b>
							{' '}
							<Link
								href="/booking/fcl/[shipment_id]"
								as={`/booking/fcl/${secondRollover.id}`}
								replace
								className={styles.link}
							>
								#
								{secondRollover.serial_id}
							</Link>
						</>
					) : null}
				</div>
			) : null}
			{parent_shipment_id && !isGettingShipment ? (
				<Link
					as={`/shipments/${parent_shipment_id}`}
					href="/shipments/[id]"
				>
					<div className="link margin-around">Parent Shipment</div>
				</Link>
			) : null}
		</div>
	);
}
