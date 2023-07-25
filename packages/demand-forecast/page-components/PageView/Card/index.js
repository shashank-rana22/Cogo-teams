import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowRight, IcMPortArrow, IcMStar } from '@cogoport/icons-react';
import { useState } from 'react';

import ICON_MAPPING from '../../../configurations/icon-mapping';
import SHORT_FORM_MAPPING from '../../../configurations/short-form-service';
import getTableConfig from '../../../configurations/table-config';
import SubCard from '../SubCard';

import styles from './styles.module.css';

function Card({ card }) {
	const tableConfig = getTableConfig();

	const [showDetails, sethowDetails] = useState(false);

	const handleChange = () => {
		sethowDetails(!showDetails);
	};

	const { service_type, orgin_port, destination_port, forecasted_demand } = card;

	console.log('tableConfig::', tableConfig);
	return (
		<div>
			<div className={cl`${styles.row} ${showDetails ? styles.details_background : ''}`}>
				<div
					className={styles.action_logo}
					role="presentation"
					onClick={handleChange}
				>
					{showDetails ? <IcMArrowDown /> : <IcMArrowRight /> }
				</div>

				<div className={styles.services}>
					<div className={styles.service_type}>
						<div className={styles.icon}>{ICON_MAPPING[service_type]}</div>
						<div>{SHORT_FORM_MAPPING[service_type]}</div>
					</div>
				</div>

				<dv className={styles.orgin_port}>
					{orgin_port}
				</dv>
				<div>
					<IcMPortArrow />
				</div>

				<div className={styles.destination_port}>
					{destination_port}
				</div>

				<div className={styles.forecasted_demand}>
					{forecasted_demand}
				</div>

				<div className={styles.start}>
					<IcMStar />
				</div>
			</div>
			{showDetails && <SubCard showDetails={showDetails} />}
		</div>

	);
}

export default Card;
