import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function ManageServices({ activeTab = '', source = '' }) {
	return (
		<Accordion title={<div className={styles.title}>Manage Services</div>} isOpen>
			{ activeTab !== 'purchase' && <Services /> }

			<AdditionalServiceList source={source} />
		</Accordion>
	);
}
export default ManageServices;
