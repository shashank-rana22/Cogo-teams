import { Accordion } from '@cogoport/components';

import styles from './styles.module.css';
import TncItem from './TncItem';

function RenderTitle() {
	return (
		<div className={styles.title}>
			Terms And Conditions
		</div>
	);
}

function TermsAndConditions({ shipmentData = {} }) {
	const isCogoAssured = shipmentData?.is_cogo_assured;
	if (isCogoAssured) {
		return (
			<div className={styles.container}>
				<div className={styles.heading}>
					<RenderTitle />
				</div>
				<TncItem list={shipmentData?.terms_and_conditions} />
			</div>
		);
	}
	return (
		<Accordion title={<RenderTitle />} isOpen type="text" className={styles.accordian}>
			<TncItem list={shipmentData?.terms_and_conditions} />
		</Accordion>
	);
}

export default TermsAndConditions;
