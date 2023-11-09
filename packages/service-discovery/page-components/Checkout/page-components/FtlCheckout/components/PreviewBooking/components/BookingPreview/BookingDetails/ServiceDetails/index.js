import { IcCFftl } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ServiceDetails() {
	return (
		<div className={styles.container}>
			<IcCFftl
				height={32}
				width={32}
			/>

			<div className={styles.name}>FTL Freight</div>
		</div>
	);
}

export default ServiceDetails;
