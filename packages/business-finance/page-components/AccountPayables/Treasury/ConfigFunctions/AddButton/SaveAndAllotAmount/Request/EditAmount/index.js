import { InputController } from '@cogoport/forms';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMUndo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EditAmount({
	itemData = {},
	currency = '',
	setValue = () => {},
	control = {},
}) {
	const [editAmount, setEditAmount] = useState(true);
	const { requestedAmount } = itemData;

	return (
		<div>
			<div className={styles.value_text}>
				{editAmount ? (
					<div className={styles.div_style}>
						<div>
							{ formatAmount({
								amount  : requestedAmount,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
								},
							})}
						</div>
						<IcMEdit
							cursor="pointer"
							style={{ marginLeft: '4px' }}
							onClick={() => {
								setValue('requestedAmount', requestedAmount);
								setEditAmount((prev) => !prev);
							}}
						/>
					</div>
				) : (
					<div className={styles.div_style}>

						<InputController
							control={control}
							name="requestedAmount"
							type="number"
							placeholder="Please Enter Amount"
							rules={{ required: 'Amount is Required', min: 1 }}
						/>

						<IcMUndo
							height={20}
							width={20}
							cursor="pointer"
							style={{ marginLeft: '4px' }}
							onClick={() => {
								setValue('requestedAmount', requestedAmount);
								setEditAmount((prev) => !prev);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default EditAmount;
