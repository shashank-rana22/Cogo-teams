import { ShipmentDetailContext } from '@cogoport/context';
import { IcCError } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import getNavigationFromUrl from '@cogoport/request/helpers/getNavigationFromUrl';
import { useContext } from 'react';

import styles from './styles.module.css';

const INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER = 0;
const MINIMUM_COUNT_FOR_PLURAL = 2;

const navigation = getNavigationFromUrl() || '';

function RolloverDetail({ rolloverDetail = {} }) {
	return (
		<>
			<span>
				{`${rolloverDetail.containers_count_data} Container ${
					rolloverDetail.containers_count_data >= MINIMUM_COUNT_FOR_PLURAL ? 's' : ''
				}`}
			</span>

			<Link
				href="/booking/fcl/[shipment_id]"
				as={`/booking/fcl/${rolloverDetail.id}${navigation ? `?navigation=${navigation}` : ''}`}
				replace
				className={styles.link}
			>
				<b>
					#
					{rolloverDetail.serial_id}
				</b>
			</Link>
		</>
	);
}

export default function RolloveDetails() {
	const {
		rollover_shipments_details = [],
		parent_shipment_id = '',
		isGettingShipment = false,
	} = useContext(ShipmentDetailContext) || {};

	const [firstRollover, secondRollover] = (
		rollover_shipments_details || []
	).map((details) => ({
		...details,
		containers_count_data: details?.containers_count_data.reduce(
			(prev, curr) => prev + curr,
			INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER,
		),
	}));

	if (!firstRollover && !parent_shipment_id) {
		return null;
	}

	return (
		<div className={styles.rollover_details}>
			{firstRollover ? (
				<p className={styles.rollover_tag}>
					<IcCError width={20} height={20} />

					<span className={styles.label}>Rollover :</span>

					<RolloverDetail rolloverDetail={firstRollover} />

					{secondRollover ? (
						<>
							<div className={styles.vertical_line} />

							<RolloverDetail rolloverDetail={secondRollover} />
						</>
					) : null}
				</p>
			) : null}

			{parent_shipment_id && !isGettingShipment ? (
				<Link
					as={`/shipments/${parent_shipment_id}${navigation ? `?navigation=${navigation}` : ''}`}
					href="/shipments/[id]"
					className={styles.link}
				>
					Parent Shipment
				</Link>
			) : null}
		</div>
	);
}
