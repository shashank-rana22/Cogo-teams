import { Toggle } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

import styles from './styles.module.css';

function HeaderFilters() {
	const { scopeFilters = {}} = useContext(KamDeskContext);

	return (
		<div className={styles.container}>
	

			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</div>

	);
}

export default HeaderFilters;
