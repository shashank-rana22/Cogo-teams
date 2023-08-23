import { CheckboxController, InputNumberController } from '@cogoport/forms';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Promised({ item = {}, control, unregister }) {
	const [editPromised, setEditPromised] = useState(false);

	const onClickCancel = (controlName) => {
		setEditPromised(false);
		unregister(controlName);
	};
	const { allocated_containers, is_hard_limit } = item;
	return !editPromised ? (
		<>
			<div
				style={{
					display        : 'flex',
					justifyContent : 'space-between',
					padding        : '0 10px',
				}}
			>
				{allocated_containers}
				{' '}
				TEU
				<IcMEdit onClick={() => setEditPromised(true)} />
			</div>
			<div>
				{is_hard_limit ? (
					<>
						<sup>*</sup>
						Hard limit
					</>
				) : null}
			</div>
		</>
	) : (
		<div className={styles.edit_container}>
			<InputNumberController
				size="xs"
				control={control}
				name={`${item.service_provider?.id}.promised_containers`}
				value={allocated_containers}
			/>
			<div className={styles.cancel_container}>
				<IcMCross
					onClick={() => onClickCancel(`${item?.service_provider?.id}.promised_containers`)}
				/>
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<CheckboxController
					name={`${item?.service_provider?.id}.is_hard_limit`}
					control={control}
					value={item?.is_hard_limit}
				/>
				{' '}
				<span> is Hard Limit</span>
			</div>
		</div>
	);
}
export default Promised;
