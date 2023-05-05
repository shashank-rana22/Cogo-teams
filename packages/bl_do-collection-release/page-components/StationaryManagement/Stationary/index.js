import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import useListOrganizationDocumentInventory from '../../../hooks/useListOrganizationDocumentInventory';

import Hbl from './Hbl';
import Mbl from './Mbl';
import styles from './styles.module.css';

function Stationary() {
	const { data, loading } = useListOrganizationDocumentInventory();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Stationary</h3>
				<Button size="sm" themeType="secondary">Add Stationary</Button>
			</div>

			<div className={styles.body}>
				<Hbl />
				<Mbl />
			</div>

			<div>
				<AsyncSelect />
			</div>
		</div>
	);
}

export default Stationary;
