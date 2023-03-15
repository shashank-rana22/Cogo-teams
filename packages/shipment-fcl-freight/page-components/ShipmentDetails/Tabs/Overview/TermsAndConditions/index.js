import { cl } from '@cogoport/components';

import styles from './styles.module.css';
import TncItem from './TncItem';

function TermsAndConditions({ shipment_data = {} }) {
	const className = !shipment_data?.is_cogo_assured ? 'full' : '';

	return (
		<div className={cl`${className} ${styles.container} cogo-term-conditions`}>
			<div className={styles.header}>
				<div className={styles.heading}>Terms And Conditions</div>
			</div>

			<TncItem list={shipment_data?.terms_and_conditions} />
		</div>
	);
}

export default TermsAndConditions;
