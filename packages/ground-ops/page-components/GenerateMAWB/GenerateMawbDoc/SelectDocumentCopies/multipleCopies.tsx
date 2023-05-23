import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const multipleCopies = ({ data, setEditCopies, setGenerate, setViewDoc, setEdit, setItem }) => {
	const handleClick = (key) => {
		(data || []).forEach((item) => {
			if (item?.copyType === key) {
				setItem(item);
				setEdit(true);
				setEditCopies(key);
				setGenerate(true);
				setViewDoc(false);
			}
		});
	};
	const checkboxLabel = (label, key) => (
		<div className={styles.label}>
			{label}
			<Button
				themeType="linkUi"
				onClick={() => handleClick(key)}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		</div>
	);
	const OPTIONS = [
		{ name: 'original_3', value: 'original_3', label: checkboxLabel('Original 3 (For Shipper)', 'original_3') },
		{ name: 'original_2', value: 'original_2', label: checkboxLabel('Original 2 (For Consignee)', 'original_2') },
		{
			name  : 'original_1',
			value : 'original_1',
			label : checkboxLabel('Original 1 (For issuing Carrier)', 'original_1'),
		},
		{ name: 'copy_9', value: 'copy_9', label: checkboxLabel('Copy 9 (For Agent)', 'copy_9') },
		{ name: 'copy_4', value: 'copy_4', label: checkboxLabel('Copy 4 (Delivery Receipt)', 'copy_4') },
		{ name: 'copy_5', value: 'copy_5', label: checkboxLabel('Copy 5 (For Airport of Destination)', 'copy_5') },
		{ name: 'copy_6', value: 'copy_6', label: checkboxLabel('Copy 6 (For Third Carrier)', 'copy_6') },
		{ name: 'copy_7', value: 'copy_7', label: checkboxLabel('Copy 7 (For Second Carrier)', 'copy_7') },
		{ name: 'copy_8', value: 'copy_8', label: checkboxLabel('Copy 8 (For First Carrier)', 'copy_8') },
		{ name: 'copy_10', value: 'copy_10', label: checkboxLabel('Copy 10 (Extra Copies for Carrier)', 'copy_10') },
		{ name: 'copy_11', value: 'copy_11', label: checkboxLabel('Copy 11 (Extra Copies for Carrier)', 'copy_11') },
		{ name: 'copy_12', value: 'copy_12', label: checkboxLabel('Copy 12 ( For Customs)', 'copy_12') },
	];
	return OPTIONS;
};

export default multipleCopies;
