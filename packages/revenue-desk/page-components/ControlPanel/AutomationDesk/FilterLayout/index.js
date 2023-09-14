import { Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import { automationDeskServiceOptions } from '../../../constants';

import ParametersForm from './paramtersForm';
import styles from './styles.module.css';

function FilterLayout({ filter = {}, setFilter = () => {}, refetch = () => {} }) {
	const [openForm, setOpenForm] = useState(false);

	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};

	return (
		<div className={styles.filter}>
			<Select
				placeholder="Service Type"
				options={automationDeskServiceOptions}
				value={filter?.service_type}
				onChange={(val) => onChange(val, 'service_type')}
				size="sm"
				style={{ width: '150px' }}
			/>
			<Button
				themeType="accent"
				size="md"
				onClick={() => setOpenForm(!openForm)}
			>
				Create New Parameters
			</Button>
			{openForm && <ParametersForm openForm={openForm} setOpenForm={setOpenForm} refetch={refetch} />}
		</div>
	);
}

export default FilterLayout;
