import { Accordion } from '@cogoport/components';

import Services from '../Services';

import styles from './styles.module.css';

function OverviewManageServices() {
	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle} isOpen>
			<Services />
		</Accordion>
	);
}
export default OverviewManageServices;
