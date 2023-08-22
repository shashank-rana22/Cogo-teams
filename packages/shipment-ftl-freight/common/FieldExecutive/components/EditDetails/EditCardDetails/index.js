import { startCase } from '@cogoport/utils';
import React from 'react';

import Mediator from './Mediator';
import styles from './styles.module.css';

function EditCardDetails({
	cardLabels = [],
	heading = '',
	formattedData = {},
	setInitFormattedData = () => {},
	otherFormattedData = {},
	setOtherFormattedData = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading_card}>{startCase(heading)}</div>
			<div className={styles.card_body}>
				{cardLabels.map((item) => (
					<div className={styles.single_component} key={item.key}>
						<Mediator
							item={item}
							formattedData={formattedData}
							setInitFormattedData={setInitFormattedData}
							otherFormattedData={otherFormattedData}
							setOtherFormattedData={setOtherFormattedData}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default EditCardDetails;
