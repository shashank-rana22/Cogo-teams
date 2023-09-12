import { Card, Button } from '@cogoport/components';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function CardComponent({ service = {}, setFilterParams = () => {}, filterparams = {} }) {
	const [showDetails, setShowDetails] = useState(false);
	if (isEmpty(service?.service)) return null;

	const setDetails = () => {
		setFilterParams({ ...filterparams, service: service?.service });
		setShowDetails(true);
	};
	return (
		<Card
			themetype="primary"
			style={{ margin: 10, padding: '10px' }}
		>

			<div className={styles.flex}>
				<div className={styles.title}>
					<IcMArrowRotateRight style={{ marginRight: 20 }} />
					<Card.Title title={startCase(service?.service)} />
				</div>
				<Card.Description>
					<Button themeType="secondary" onClick={setDetails}>VIEW DETAILS</Button>
				</Card.Description>
				{showDetails && <div>details</div>}
			</div>
		</Card>

	);
}
export default CardComponent;
