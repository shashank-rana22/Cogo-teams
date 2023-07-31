import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMPortArrow } from '@cogoport/icons-react';
import { useState } from 'react';

import SubCard from '../SubCard';

import styles from './styles.module.css';

function Card({ card }) {
	const [showDetails, sethowDetails] = useState(false);

	const handleChange = () => {
		sethowDetails(!showDetails);
	};

	const { orgin_port, destination_port, forecasted_demand } = card;

	return (
		<div>
			<div className={cl`${styles.row} ${showDetails ? styles.details_background : ''}`}>
				<dv className={styles.orgin_port}>
					{orgin_port}
				</dv>
				<div className={styles.arrow_logo}>
					<IcMPortArrow />
				</div>

				<div className={styles.destination_port}>
					{destination_port}
				</div>

				<div className={styles.high_demand_port_pairs}>
					NA
				</div>

				<div className={styles.rated_acquired}>
					30
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
			{showDetails && <SubCard showDetails={showDetails} />}
		</div>

	);
}

export default Card;
