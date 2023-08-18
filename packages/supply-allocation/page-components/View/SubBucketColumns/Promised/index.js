import { CheckboxController, InputNumberController } from '@cogoport/forms';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Promised({ item = {}, control, unregister }) {
	const [editPromised, setEditPromised] = useState(false);
	const onClickCancel = (controlName) => { setEditPromised(false); unregister(controlName); };

	return !editPromised
		? (
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
				{item.allocated_containers}
				<IcMEdit onClick={() => setEditPromised(true)} />
			</div>
		) : (
			<div className={styles.edit_container}>
				<InputNumberController
					size="xs"
					control={control}
					name={`${item.service_provider?.id}_new_promised_quantity`}
					value={item.allocated_containers}
				/>
				<div className={styles.cancel_container}>
					<IcMCross onClick={() => onClickCancel(`${item?.service_provider?.id}_new_promised_quantity`)} />
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CheckboxController name={`${item?.service_provider?.id}_is_hard_limit`} control={control} />
					{' '}
					<span> is Hard Limit</span>

				</div>

			</div>
		);
}
export default Promised;
