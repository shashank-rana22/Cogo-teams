import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import Filter from '../../../../commons/Filters';

import filterControls from './filterControls';
import styles from './styles.module.css';

interface Props {
	globalFilters?: { search?: string; page?: number | string };
	setGlobalFilters?: (p: object) => void;
	setShowCreateForm?: Function;
}

function FilterHeaders({ globalFilters, setGlobalFilters, setShowCreateForm }:Props) {
	return (
		<div className={styles.filter_body}>
			<div className={styles.filter_section}>
				<Filter controls={filterControls} filters={globalFilters} setFilters={setGlobalFilters} />
			</div>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Input
					value={globalFilters?.search}
					onChange={(value:string) => setGlobalFilters({
						...globalFilters,
						search: value || undefined,
					})}
					placeholder="Search By Cycle Name"
					size="md"
					style={{ width: '340px' }}
					suffix={(
						<IcMSearchlight
							height={20}
							width={20}
							style={{ margin: '0px 8px' }}
						/>
					)}
				/>

				<Button
					style={{ margin: '0px 8px' }}
					size="lg"
					onClick={() => setShowCreateForm(true)}
				>
					Create New Cycle
				</Button>

			</div>
		</div>
	);
}

export default FilterHeaders;
