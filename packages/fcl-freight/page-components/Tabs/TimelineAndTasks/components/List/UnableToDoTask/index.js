import React, { useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import Layout from '@cogo/bookings/commons/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';
import { controls } from './controls';
import styles from './styles.module.css';

const UnableToDoTask = ({
	setOpen = () => {},
	refetch = () => {},
	task = {},
}) => {
	const { loading, onCreate } = useUpdateShipmentPendingTask({
		setOpen,
		refetch,
		task,
	});
	const [errors, setErrors] = useState({});
	const { fields, handleSubmit } = useFormCogo(controls);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Unable to do Task</div>

			<Layout
				themeType="admin"
				fields={fields}
				controls={controls}
				errors={errors}
			/>

			<div className={styles.button_wrap}>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => setOpen(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate, setErrors)}>
					{loading ? 'Submiting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
};

export default UnableToDoTask;
