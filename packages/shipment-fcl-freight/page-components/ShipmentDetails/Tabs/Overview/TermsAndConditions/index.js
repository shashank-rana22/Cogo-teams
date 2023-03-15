import { Accordion } from '@cogoport/components';

import styles from './styles.module.css';
import TncItem from './TncItem';

function TermsAndConditions({ shipment_data = {} }) {
	const renderTitle = (
		<div className={styles.title}>
			Terms And Conditions
		</div>
	);
	return (
		<Accordion title={renderTitle} style={{ width: '100%' }}>
			<TncItem list={shipment_data?.terms_and_conditions} />
		</Accordion>
	);
}

export default TermsAndConditions;
