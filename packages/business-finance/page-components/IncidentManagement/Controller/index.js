import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../commons/Filters/index.tsx';
import CreateLevelModal from '../common/CreateForm';
import useGetLevels from '../common/hooks/useGetLevels';

import controls from './Config/filters-level';
import CustomTable from './CustomTable';
import styles from './styles.module.css';

function Controller() {
	const { incidentData, setFilters, incidentLoading, getIncidentLevels, filters } = useGetLevels();
	return (
		<div>
			<div className={styles.filter}>
				<Filter filters={filters} setFilters={setFilters} controls={controls} />
				<div className={styles.search}>
					<Input
						prefix={<IcMSearchlight />}
						value={filters?.search || ''}
						onChange={(val) => setFilters({ ...filters, search: val })}
						size="md"
						placeholder="Search"
					/>
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.create}>
					<CreateLevelModal refetch={getIncidentLevels} />
				</div>
				<CustomTable
					incidentData={incidentData}
					incidentLoading={incidentLoading}
					getIncidentLevels={getIncidentLevels}
					setFilters={setFilters}
					filters={filters}
				/>
			</div>
		</div>
	);
}

export default Controller;
