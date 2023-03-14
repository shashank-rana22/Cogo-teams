import React, { useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import Layout from '@cogo/bookings/commons/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector } from '@cogo/store';
import useUpdateAssignedStakeholder from './useUpdateAssignedStakeholder';
import { getControls } from './getControls';
import styles from './styles.module.css';

const UpdateAssignedStakeholder = ({
	setOpen = () => {},
	open = false,
	refetch = () => {},
	task = {},
}) => {
	const isMobile = useSelector((state) => (state.general || {}).isMobile);
	const { loading, onCreate } = useUpdateAssignedStakeholder({
		setOpen,
		refetch,
		task,
	});

	const controls = getControls(task.assigned_stakeholder);

	const [errors, setErrors] = useState({});
	const { fields, handleSubmit } = useFormCogo(controls);

	const onErrors = (err) => {
		setErrors(err);
	};

	return open ? (
		<StyledModal
			className="primary lg"
			show={open}
			onOuterClick={() => setOpen(false)}
			onClose={() => setOpen(false)}
			width="600"
			styles={{ dialog: { width: isMobile ? 360 : 700 } }}
		>
			<div className={styles.container}>
				<div className={styles.heading}>Update Assigned Stakeholder</div>

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

					<Button disabled={loading} onClick={handleSubmit(onCreate, onErrors)}>
						{loading ? 'Submiting...' : 'Submit'}
					</Button>
				</div>
			</div>
		</StyledModal>
	) : null;
};

export default UpdateAssignedStakeholder;
