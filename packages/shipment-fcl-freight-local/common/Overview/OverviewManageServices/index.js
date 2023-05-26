import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function OverviewManageServices() {
	const getTitle = (
		<div className={styles.title}>Manage Services</div>
	);

	return (
		<Accordion title={getTitle} isOpen>
			<Services />

			<AdditionalServiceList />
		</Accordion>
	);
}
export default OverviewManageServices;
