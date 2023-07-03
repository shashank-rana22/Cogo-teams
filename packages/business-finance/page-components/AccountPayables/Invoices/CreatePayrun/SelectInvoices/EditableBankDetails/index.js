import { Select } from '@cogoport/components';
import { IcMTick, IcMUndo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetBankDetails from '../../../hooks/usGetBankDetails';

import styles from './styles.module.css';

function BankSelect({
	itemData,
	setBankEdit,
	showRollback,
}) {
	const newItem = itemData;
	const [bankObject, setBankObject] = useState({});
	const { tradePartyMappingId = '', serviceProviderId = '' } = itemData || {};

	const { bankDetails, bankDetailsLoading } = useGetBankDetails({
		tradePartyMappingId,
		serviceProviderId,
	});

	if (bankDetailsLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className={styles.flex}>
			<div className={styles.select}>
				<Select
					theme="admin"
					className="primary md"
					placeholder="Select bank"
					options={bankDetails}
					value={bankObject?.value}
					onChange={(val, obj) => setBankObject(obj)}
				/>
			</div>
			<div className={styles.icons}>
				<IcMTick
					height={20}
					width={20}
					className={styles.pointer}
					onClick={() => {
						if (!isEmpty(bankObject)) {
							newItem.bankDetail = bankObject;
							showRollback(true);
						}
						setBankEdit(false);
					}}
				/>
				<IcMUndo
					height={15}
					className={styles.pointer}
					width={15}
					onClick={() => setBankEdit(false)}
				/>
			</div>
		</div>
	);
}

export default BankSelect;
