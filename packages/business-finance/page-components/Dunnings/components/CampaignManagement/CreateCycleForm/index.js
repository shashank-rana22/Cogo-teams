import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';

import styles from './styles.module.css';

function CreateCycleForm({ showCreateForm, setShowCreateForm, formData, setFormData }) {
	const DEFAULT_STEP = 1;
	const [step, setStep] = useState(DEFAULT_STEP);

	const onClose = () => {
		setShowCreateForm(false);
	};

	const renderTitle = () => (
		<div className={styles.title}>
			Create New Cycle -
			{' '}
			<span className={styles.step}>
				Step
				{' '}
				{step}
				/3
			</span>
		</div>
	);

	const controls = [
		{
			label       : 'Cogo Entity',
			name        : 'entityType',
			type        : 'select',
			placeholder : 'Search by Cogo Entity',
			rules       : { required: 'Required' },
			span        : 12,
			style       : { width: '600px' },
		},
		{
			label       : 'hey',
			name        : 'entityType',
			type        : 'select',
			placeholder : 'Search by Cogo Entity',
			rules       : { required: 'Required' },
			span        : 3,
		},
		{
			label       : 'hello',
			name        : 'entityType',
			type        : 'select',
			placeholder : 'Search by Cogo Entity',
			rules       : { required: 'Required' },
			span        : 3,
		},
	];

	return (
		<div>
			<Modal size="xl" show={showCreateForm} onClose={onClose} placement="center">
				<Modal.Header title={renderTitle()} />
				<Modal.Body>
					modal body
					<Filter
						controls={controls}
						filters={formData}
						setFilters={setFormData}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button>Save and Next</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateCycleForm;
