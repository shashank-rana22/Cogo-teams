import { Toggle } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import useUpdateStatus from '../hooks/useUpdateStatus';

import styles from './styles.module.css';

interface Props {
	setActionModal?: Function;
	rowData?: { isDunningCycleActive?: boolean; id?: string };
	getDunningList?: Function;
}

function RenderActions({ setActionModal, rowData, getDunningList }:Props) {
	const { isDunningCycleActive = false	 } = rowData || {};
	const { changeStatus, loading } = useUpdateStatus({ getDunningList });

	return (
		<div style={{ display: 'flex' }}>
			<Toggle
				name="isDunningCycleActive"
				size="md"
				showOnOff
				disabled={loading}
				onChange={() => changeStatus({ id: rowData?.id, status: !isDunningCycleActive })}
				checked={isDunningCycleActive}
			/>

			<button
				className={styles.btn}
				aria-label="edit"
				onClick={() => setActionModal({
					visible : true,
					action  : 'edit',
					rowData,
				})}
			>
				<IcMEdit
					height={15}
					width={15}
				/>

			</button>
			<button
				className={styles.btn}
				aria-label="delete"
				onClick={() => setActionModal({
					visible : true,
					action  : 'delete',
					rowData,
				})}
			>
				<IcMDelete
					height={15}
					width={15}
				/>

			</button>
		</div>
	);
}

export default RenderActions;
