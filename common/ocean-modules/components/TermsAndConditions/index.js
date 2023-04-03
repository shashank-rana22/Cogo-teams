import { Accordion } from '@cogoport/components';

import styles from './styles.module.css';
import TncItem from './TncItem';

function TermsAndConditions({ shipmentData = {} }) {
	const renderTitle = (
		<div className={styles.title}>
			Terms And Conditions
		</div>
	);
	return (
		<Accordion title={renderTitle} style={{ width: '100%' }}>
			<TncItem list={shipmentData?.terms_and_conditions} />
		</Accordion>
	);
}

export default TermsAndConditions;
