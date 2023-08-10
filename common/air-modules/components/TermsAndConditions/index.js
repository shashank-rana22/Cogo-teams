import { Accordion } from '@cogoport/components';

import styles from './styles.module.css';
import TncItem from './TncItem';

function TermsAndConditions({ shipmentData = {} }) {
	const isCogoAssured = shipmentData?.is_cogo_assured;
	const renderTitle = (
		<div className={styles.title}>
			Terms And Conditions
		</div>
	);

	if (isCogoAssured) {
		return (
			<div className={styles.container}>
				<div className={styles.heading}>
					{renderTitle}
				</div>
				<TncItem list={shipmentData?.terms_and_conditions} />
			</div>
		);
	}
	return (
		<Accordion title={renderTitle} style={{ width: '100%' }}>
			<TncItem list={shipmentData?.terms_and_conditions} />
		</Accordion>
	);
}

export default TermsAndConditions;
