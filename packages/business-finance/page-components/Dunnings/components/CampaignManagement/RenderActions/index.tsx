import { Toggle } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface Props {
	setActionModal?:Function,
	rowData?:{ isDunningCycleActive?:boolean, id?:string },

}

function RenderActions({ setActionModal, rowData }:Props) {
	const { isDunningCycleActive = false } = rowData || {};
	return (
		<div style={{ display: 'flex' }}>
			<Toggle name="isDunningCycleActive" size="md" showOnOff disabled={false} checked={isDunningCycleActive} />
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
