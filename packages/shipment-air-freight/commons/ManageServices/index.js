import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function ManageServices({ isOpen = false, source = '', isSeller = false }) {
	return (
		<Accordion title={<div className={styles.title}>Manage Services</div>} isOpen={isOpen}>
			{ source !== 'purchase' && <Services /> }

			<AdditionalServiceList source={source} isSeller={isSeller} />
		</Accordion>
	);
}
export default ManageServices;
