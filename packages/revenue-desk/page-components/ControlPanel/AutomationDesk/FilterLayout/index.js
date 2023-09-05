import { Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import ParametersForm from './paramtersForm';
import styles from './styles.module.css';

const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight' },
];

function FilterLayout({ filter = {}, setFilter = () => {}, apiTrigger = () => {} }) {
	const [openForm, setOpenForm] = useState(false);

	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};

	return (
		<div className={styles.filter}>
			<div className={styles.fieldContainer}>
				<div>
					<Select
						placeholder="Service Type"
						options={serviceOptions}
						value={filter?.service_type}
						onChange={(val) => onChange(val, 'service_type')}
						size="sm"
						style={{ width: '150px' }}
					/>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					themeType="accent"
					size="sm"
					onClick={() => setOpenForm(!openForm)}
					style={{ width: '140px' }}
				>
					Create New Parameters
				</Button>
			</div>
			{openForm && <ParametersForm openForm={openForm} setOpenForm={setOpenForm} apiTrigger={apiTrigger} />}
		</div>
	);
}

export default FilterLayout;
