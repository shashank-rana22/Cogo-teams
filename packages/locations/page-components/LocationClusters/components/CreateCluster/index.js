import { useForm } from '@cogoport/forms';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

import Layout from '../../common/Layout';

import styles from './styles.module.css';

function CreateCluster({ controls = {}, handleCreateCluster = () => {} }, ref) {
	const DEFAULT_VALUES = {};

	controls?.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl?.value || '';
		}
	});

	const {
		control, setValue, fields = {}, watch, handleSubmit, formState:{ errors = {} } = {},
	} =	useForm({ defaultValues: DEFAULT_VALUES });

	const clust_type = watch('cluster_type');

	useEffect(() => {
		if (clust_type === 'port_to_icd') {
			setValue('location_type', 'seaport');
		}
	}, [clust_type, setValue]);

	const showElements = {
		radius       : clust_type === 'radius_wise',
		location_ids : clust_type === 'manual',
	};

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(handleCreateCluster)();
		},
	}));
	return (
		<div className={styles.container}>
			<div>
				<Layout
					controls={controls}
					control={control}
					errors={errors}
					showElements={showElements}
					fields={fields}
				/>
			</div>
		</div>
	);
}
export default forwardRef(CreateCluster);
