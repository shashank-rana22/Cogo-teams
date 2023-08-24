import { IcMArrowRotateDown, IcMArrowRotateUp, IcMPortArrow } from '@cogoport/icons-react';
import { useState } from 'react';

import SubCard from '../SubCard';

import styles from './styles.module.css';

function Card({ card = {} }) {
	const [showDetails, sethowDetails] = useState(false);

	const handleChange = () => {
		sethowDetails(!showDetails);
	};

	const { origin = {}, destination = {}, forecasted_demand, high_demand_port_pairs, rated_acquired = 0 } = card;

	return (
		<div>
			<div className={styles.row}>
				<dv className={styles.orgin_port}>
					{origin?.name}
				</dv>
				<div className={styles.arrow_logo}>
					<IcMPortArrow />
				</div>

				<div className={styles.destination_port}>
					{destination?.name}
				</div>

				<div className={styles.high_demand_port_pairs}>
					{high_demand_port_pairs}
				</div>

				<div className={styles.rated_acquired}>
					{rated_acquired}
				</div>

				<div className={styles.forecasted_demand}>
					{forecasted_demand}
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
