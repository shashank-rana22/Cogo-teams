import { CheckboxController, InputNumberController } from '@cogoport/forms';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Promised({ item = {}, control, unregister, bulkEditMode = false }) {
	const [editPromised, setEditPromised] = useState(false);

	const onClickCancel = (controlName) => {
		setEditPromised(false);
		unregister(controlName);
	};
	const { allocated_containers, is_hard_limit } = item;
	return !(editPromised && bulkEditMode) ? (
		<div className={styles.main_container}>
			<div>
				{allocated_containers}
				{' '}
				TEU

				{bulkEditMode
					? (
						<IcMEdit
							style={{ cursor: 'pointer', marginLeft: '4px' }}
							onClick={() => setEditPromised(true)}
						/>
					) : null}
			</div>

			<div style={{ textAlign: 'start' }}>
				{is_hard_limit ? (
					<>
						<sup>*</sup>
						Hard limit
					</>
				) : null}
			</div>
		</div>
	) : (
		<div className={styles.edit_container}>

			<div style={{ color: '#fc6a03', fontSize: '12px', textAlign: 'start' }}>
				Current :
				{' '}
				{ allocated_containers}
				{' '}
				TEU
			</div>

			<InputNumberController
				size="xs"
				control={control}
				arrow={false}
				name={`${item.service_provider?.id}.promised_containers`}
				value={allocated_containers}
				suffix={(
					<div className={styles.cancel_container}>
						<IcMCross onClick={() => onClickCancel(`${item?.service_provider?.id}.promised_containers`)} />
					</div>
				)}
			/>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<CheckboxController
					name={`${item?.service_provider?.id}.is_hard_limit`}
					control={control}
					value={item?.is_hard_limit}
				/>

				<span> is Hard Limit</span>
			</div>
		</div>
	);
}
export default Promised;
