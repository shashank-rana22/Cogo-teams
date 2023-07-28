import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function ManageServices() {
	return (
		<Accordion title={<div className={styles.title}>Manage Services</div>} isOpen>
			<Services />

			<AdditionalServiceList />
		</Accordion>
	);
}
export default ManageServices;
