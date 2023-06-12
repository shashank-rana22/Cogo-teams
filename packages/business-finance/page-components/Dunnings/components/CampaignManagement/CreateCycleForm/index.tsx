import { Button, Modal } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

// import Layout from '../../../../commons/Layout';

import styles from './styles.module.css';

function CreateCycleForm({ showCreateForm, setShowCreateForm }) {
	const [step, setStep] = useState(1);
	// const formProps = useForm();
	// const {
	// 	watch,
	// 	control,
	// 	setValue,
	// 	handleSubmit,
	// 	formState: { errors: errorVal },
	// } = formProps;

	const onClose = () => {
		showCreateForm(false);
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

	// const controls = [
	// 	{
	// 		label       : 'Cogo Entityjj',
	// 		name        : 'entityType',
	// 		type        : 'select',
	// 		placeholder : 'Search by Cogo Entity',
	// 		// renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
	// 		rules       : { required: 'Required' },
	// 		span        : 12,
	// 		style       : { width: '600px' },
	// 	},
	// 	{
	// 		label       : 'Cogo Entityjj',
	// 		name        : 'entityType',
	// 		type        : 'select',
	// 		placeholder : 'Search by Cogo Entity',
	// 		// renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
	// 		rules       : { required: 'Required' },
	// 		span        : 3,
	// 		// style       : { width: '200px' },
	// 	},
	// 	{
	// 		label       : 'Cogo Entityjj',
	// 		name        : 'entityType',
	// 		type        : 'select',
	// 		placeholder : 'Search by Cogo Entity',
	// 		// renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
	// 		rules       : { required: 'Required' },
	// 		span        : 3,
	// 		// style       : { width: '200px' },
	// 	},
	// 	// {
	// 	// 	// renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`
	// 	// 	span: 6,
	// 	// 	// style       : { width: '200px' },
	// 	// },
	// ];

	return (
		<div>
			<Modal size="xl" show={showCreateForm} onClose={onClose} placement="center">
				<Modal.Header title={renderTitle()} />
				<Modal.Body>
					modal body
					{/* <Layout
						control={control}
						fields={controls}
						errors={[]}
					/> */}
				</Modal.Body>
				<Modal.Footer>
					<Button>Save and Next</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateCycleForm;
