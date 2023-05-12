import { Toggle } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

function HeaderFilters() {
	const { scopeFilters = {}, handleVersionChange = () => {} } = useContext(KamDeskContext);

	return (
		<div className={styles.container}>
			<div className={styles.version}>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
			</div>

			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</div>

	);
}

export default HeaderFilters;
