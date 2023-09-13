import { Button, Pill } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import Footer from '../Footer';

import styles from './styles.module.css';

function CardComponent({ service = {}, margin_type = '', setMarginBreakupData = () => {} }) {
	const [showDetails, setShowDetails] = useState(false);
	if (isEmpty(service?.service)) return null;

	const setDetails = () => {
		setShowDetails(!showDetails);
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.title}>
					{showDetails ? <IcMArrowRotateDown style={{ marginRight: 20 }} onClick={setDetails} />
						: <IcMArrowRotateRight style={{ marginRight: 20 }} onClick={setDetails} />}
					<div>{startCase(service?.service)}</div>
				</div>
				<Button themeType="secondary" onClick={setDetails}>VIEW DETAILS</Button>
			</div>
			<div className={styles.button_container}>
				<Pill color="green">{`${service?.active_count} ACTIVE`}</Pill>
				<Pill>{`${service?.inactive_count} INACTIVE`}</Pill>
			</div>
			{showDetails && (
				<Footer
					service={service?.service}
					margin_type={margin_type}
					setMarginBreakupData={setMarginBreakupData}
				/>
			)}
		</div>

	);
}
export default CardComponent;
