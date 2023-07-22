import { RadioGroupController, useForm } from '@cogoport/forms';
import React from 'react';

// import controls from './controls';
import styles from './styles.module.css';

function SetConfiguration() {
	const { control } = useForm();

	return (
		<div className={styles.container}>
			<h4>SET CONFIGURATION</h4>
			<p>Create New Active Shipment Capacity per Agent (basis experience level)</p>
			<p>One may proceed to setting Shipment Capacity only after Setting Agent Experience Slabs</p>
			<div className={styles.experience_details}>
				<h4>Set Agent Experience</h4>

				<RadioGroupController
					className={styles.instruction_input}
					control={control}
					size="sm"
					name="exp_options"
					rules={{ required: 'This is required' }}
					options={[
						{
							name  : 'default',
							value : 'default',
							label : 'Default Experience Slabs',
						},
						{
							name  : 'custom',
							value : 'custom',
							label : 'Custom Experience Slabs (4 Slabs Maximum)',
						},
					]}
				/>
			</div>

		</div>

	);
}

export default SetConfiguration;
