import { ShipmentDetailContext } from '@cogoport/context';
import { IcCError } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { useContext } from 'react';

import styles from './styles.module.css';

const INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER = 0;
const MINIMUM_COUNT_FOR_PLURAL = 2;

const defaultRolloverDetails = [
	{
		id                    : 'cc9f2fb8-84ec-46c0-a797-f6d3360d5004',
		serial_id             : 160536,
		containers_count_data : [1],
	},
	{
		id                    : 'cc9f2fb8-84ec-46c0-a797-f6d3360d5004',
		serial_id             : 160536,
		containers_count_data : [1],
	},
];

export default function RolloveDetails() {
	const rollover_shipments_details = defaultRolloverDetails;
	// const { rollover_shipments_details = [], isGettingShipment = false } = useContext(ShipmentDetailContext) || {};

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
		<div className={styles.rollover_details}>
			{firstRollover ? (
				<p className={styles.rollover_tag}>
					<IcCError width={20} height={20} />

					<span>Rollover:</span>

					<b>
						{`${firstRollover.containers_count_data} container ${
							firstRollover.containers_count_data >= MINIMUM_COUNT_FOR_PLURAL
						}`}
					</b>

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
				</p>
			) : null}
			{/* {parent_shipment_id && !isGettingShipment ? (
				<Link
					as={`/shipments/${parent_shipment_id}`}
					href="/shipments/[id]"
				>
					<div className="link margin-around">Parent Shipment</div>
				</Link>
			) : null} */}
		</div>
	);
}
