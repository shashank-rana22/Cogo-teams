import { Pill } from '@cogoport/components';
import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
	IcMPortArrow,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AddRate from './AddRate';
import styles from './styles.module.css';

function Service({
	selectedCard, service, activeService, setActiveService,
}) {
	const [submittedEnquiry, setSubmittedEnquiry] = useState([]);
	const status = submittedEnquiry.includes(service?.service) ? 'Submitted' : 'Pending';
	const handleClick = () => {
		if (activeService === service) {
			setActiveService(null);
		} else {
			setActiveService(service);
		}
	};
	const tradetype = service?.data?.trade_type === 'import' ? 'Destiantion' : 'Origin';
	return (
		<div className={styles.container}>
			<div
				className={styles.service}
				role="presentation"
				onClick={() => {
					handleClick();
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{activeService === service ? (
						<IcMArrowRotateDown />
					) : (
						<IcMArrowRotateRight />
					)}
					{selectedCard?.detail.service_type === service?.service
						? 'Freight Rate'
						: `${tradetype} ${startCase(service?.service)}`}
				</div>
				<div>
					{(service?.service === 'trailer_freight' || service?.service === 'haulage_freight') && (
						<div className={styles.location}>
							<div className={styles.port}>{service?.data?.origin_location?.name}</div>
							<IcMPortArrow style={{ paddingTop: '2px' }} />
							<div className={styles.port}>{service?.data?.destination_location?.name}</div>
						</div>
					)}
				</div>
				<div>
					<Pill color={status === 'Submitted' ? '#849E4C' : '#F37166'}>{status}</Pill>
				</div>

			</div>
			{activeService === service && (
				<AddRate
					service={service}
					setSubmittedEnquiry={setSubmittedEnquiry}
					setActiveService={setActiveService}
				/>
			)}
		</div>
	);
}
export default Service;
