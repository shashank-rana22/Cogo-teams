import { InputNumberController } from '@cogoport/forms';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Promised({ item = {}, control, unregister }) {
	const [editPromised, setEditPromised] = useState(false);
	const onClickCancel = (controlName) => { setEditPromised(false); unregister(controlName); };

	return !editPromised
		? (
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
				{item.promised}
				<IcMEdit onClick={() => setEditPromised(true)} />
			</div>
		) : (
			<div className={styles.edit_container}>
				<InputNumberController
					size="xs"
					placeholder="Extra small"
					control={control}
					name={`${item.id}_new_promised_quantity`}
					value={item.promised}
				/>
				<div className={styles.cancel_container}>
					<IcMCross onClick={() => onClickCancel(`${item.id}_new_promised_quantity`)} />
				</div>

			</div>
		);
}
export default Promised;
