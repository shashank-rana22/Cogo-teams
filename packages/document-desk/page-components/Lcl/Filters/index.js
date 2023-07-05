import { Toggle, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import tabsConfig from '../../../configs/LCL/TAB_CONFIG.json';
import DocumentDeskContext from '../../../context/DocumentDeskContext';

import styles from './styles.module.css';

function Filters() {
	const {
		stepperTab, activeTab, filters = {}, setFilters = () => {},
		scopeFilters,
	} = useContext(DocumentDeskContext);

	const { isCriticalOn, q = '' } = filters || {};

	const isCriticalVisible = tabsConfig?.[stepperTab]?.find((i) => i.value === activeTab)?.isCriticalVisible;

	return (
		<div className={styles.container}>

			{isCriticalVisible ? (
				<div className={styles.toggle_container}>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={isCriticalOn}
						onChange={() => setFilters({ ...filters, isCriticalOn: !isCriticalOn, page: 1 })}
					/>
				</div>
			) : null}

			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					value={q}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>
			</div>

			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</div>
	);
}
export default Filters;
