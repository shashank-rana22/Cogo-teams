import { Placeholder, Select } from '@cogoport/components';
import { IcMTick, IcMUndo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListOrganizationDocuments from '../../../hooks/useListOrganizationDocuments';

import styles from './styles.module.css';

function BankSelect({
	itemData = {},
	setBankEdit = () => {},
	showRollback = () => {},
	setEditedValue = () => {},
}) {
	const [bankObject, setBankObject] = useState({});
	const { tradePartyMappingId = '', serviceProviderId = '' } = itemData || {};

	const { bankDetails = [], bankDetailsLoading = false } = useListOrganizationDocuments({
		tradePartyMappingId,
		serviceProviderId,
	});

	if (bankDetailsLoading) {
		return (
			<div>
				<Placeholder width="100px" height="60px" />
			</div>
		);
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
							setEditedValue({ itemData, value: bankObject, key: 'bankDetail', checked: true });
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
