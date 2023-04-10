import { Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useListReassignControls from '../../utils/list-reassign-manager-controls';

import styles from './styles.module.css';
import useReassignManager from './useReassignManager';

function ReassignManager({ userId, setOpenReassign, refetchTreeParams = () => {} }) {
	const [managerId, setManagerId] = useState('');

	const { control, watch, reset } = useForm();
	const manager = watch('manager_id');

	const { onReassign } = useReassignManager({
		userId,
		managerId,
		setManagerId,
		setOpenReassign,
		reset,
		refetchTreeParams,
	});

	const cogoUsersControl = useListReassignControls(userId);

	useEffect(() => setManagerId(manager), [manager]);

	return (
		<div className={styles.reassign_modal}>
			<div className={styles.name_input}>
				<SelectController {...cogoUsersControl} control={control} />
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={() => {
						reset();
						setManagerId('');
						setOpenReassign(false);
					}}
					style={{ marginRight: '8px' }}
				>
					Cancel

				</Button>
				<Button
					disabled={!managerId}
					onClick={() => onReassign(
						{ managerId },
					)}
				>
					Reassign

				</Button>
			</div>
		</div>
	);
}

export default ReassignManager;
