import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getIncoTermMapping from '../../../utils/getIncoTermMapping';

import AddRate from './AddRate';
import styles from './styles.module.css';

function Service({
	selectedCard, service, activeService, setActiveService,
}) {
	const handleClick = () => {
		if (activeService === service) {
			setActiveService(null);
		} else {
			setActiveService(service);
		}
	};
	const tradetype = getIncoTermMapping[selectedCard?.detail?.inco_term] === 'export' ? 'Origin' : 'Destination';
	return (
		<div className={styles.container}>
			<div
				role="presentation"
				onClick={() => {
					handleClick();
				}}
				className={styles.service}
			>
				{activeService === service ? (
					<IcMArrowRotateDown />
				) : (
					<IcMArrowRotateRight />
				)}
				{selectedCard?.detail.service_type === service?.service
					? 'Freight Rate'
					: `${tradetype} ${startCase(service?.service)}`}
			</div>
			{activeService === service && <AddRate service={service} />}
		</div>
	);
}
export default Service;
