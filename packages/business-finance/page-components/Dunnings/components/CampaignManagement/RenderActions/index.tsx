import { Toggle } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface Props{
	setActionModal?:Function,
	id?:string,
}

function RenderActions({setActionModal,id}:Props) {
	return (
		<div style={{ display: 'flex' }}>
			<Toggle name="isActive" size="md" showOnOff disabled={false} checked />
			<button className={styles.btn} aria-label="edit"
			 onClick={()=>setActionModal({
				visible:true,
				action: 'edit',
				id:id,
			})}
			>
				<IcMEdit
					height={15}
					width={15}
				/>

			</button>
			<button className={styles.btn} aria-label="delete" 
			 onClick={()=>setActionModal({
				visible:true,
				action: 'delete',
				id:id,
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
