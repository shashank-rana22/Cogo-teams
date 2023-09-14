import { Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMPortArrow } from '@cogoport/icons-react';
import { useState } from 'react';

import SubCard from '../SubCard';

import styles from './styles.module.css';

function Card({ card = {} }) {
	const [showDetails, sethowDetails] = useState(false);

	const handleChange = () => {
		sethowDetails((prev) => !prev);
	};

	const { origin = {}, destination = {}, forecasted_demand, high_demand_port_pairs, rated_acquired = 0 } = card;

	return (
		<div>
			<div className={styles.row}>

				<div className={styles.orgin_port}>
					<Tooltip
						content={origin?.name || '-'}
						placement="top"
					>
						<div className={styles.origin_port_name}>{origin?.name || '-'}</div>
					</Tooltip>
				</div>

				<div className={styles.arrow_logo}>
					<IcMPortArrow />
				</div>

				<div className={styles.destination_port}>
					<Tooltip
						content={destination?.name || '-'}
						placement="top"
					>
						<div className={styles.destination_port_name}>{destination?.name || '-'}</div>
					</Tooltip>
				</div>

				<div className={styles.high_demand_port_pairs}>
					{high_demand_port_pairs || '0'}
				</div>

				<div className={styles.rated_acquired || '0'}>
					{rated_acquired}
				</div>

				<div className={styles.forecasted_demand}>
					{forecasted_demand || '-'}
					{' '}
					TEUs
				</div>

				<div
					className={styles.action_logo}
					role="presentation"
					onClick={handleChange}
				>
					{showDetails ? <IcMArrowRotateUp /> : <IcMArrowRotateDown /> }
				</div>
			</div>
			{showDetails && (
				<SubCard
					showDetails={showDetails}
					origin_cluster_id={origin?.id}
					destination_cluster_id={destination?.id}
				/>
			)}
		</div>

	);
}

export default Card;
