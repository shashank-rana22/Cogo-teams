import { Button, CheckboxGroup, Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const options = [
	{ name: 'original_3', value: 'original_3', label: 'Original 3 (For Shipper)' },
	{ name: 'original_2', value: 'original_2', label: 'Original 2 (For Consignee)' },
	{ name: 'original_1', value: 'original_1', label: 'Original 1 (For issuing Carrier)' },
	{ name: 'copy_9', value: 'copy_9', label: 'Copy 9 (For Agent)' },
	{ name: 'copy_4', value: 'copy_4', label: 'Copy 4 (Delivery Receipt)' },
	{ name: 'copy_5', value: 'copy_5', label: 'Copy 5 (For Airport of Destination)' },
	{ name: 'copy_6', value: 'copy_6', label: 'Copy 6 (For Third Carrier)' },
	{ name: 'copy_7', value: 'copy_7', label: 'Copy 7 (For Second Carrier)' },
	{ name: 'copy_8', value: 'copy_8', label: 'Copy 8 (For First Carrier)' },
	{ name: 'copy_10', value: 'copy_10', label: 'Copy 10 (Extra Copies for Carrier)' },
	{ name: 'copy_11', value: 'copy_11', label: 'Copy 11 (Extra Copies for Carrier)' },
	{ name: 'copy_12', value: 'copy_12', label: 'Copy 12 ( For Customs)' },

];

function SelectDocumentCopies({ copiesValue, copiesOnChange, setSaveDocument, handleView, download24 }) {
	const onChangeTableHeaderCheckbox = (event) => {
		copiesOnChange(event.currentTarget.checked ? [
			'original_3',
			'original_2',
			'original_1',
			'copy_9',
			'copy_4',
			'copy_5',
			'copy_6',
			'copy_7',
			'copy_8',
			'copy_10',
			'copy_11',
			'copy_12'] : []);
	};

	const getSelectAllCheckbox = () => {
		const isAllRowsChecked = (copiesValue || []).length === 12;

		return (
			<Checkbox
				label="Select All"
				value="select_all"
				className={styles.select_checkbox}
				checked={isAllRowsChecked}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	};

	return (
		<div className={styles.select_copies_container}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{getSelectAllCheckbox()}
				<CheckboxGroup
					options={options}
					onChange={copiesOnChange}
					value={copiesValue}
				/>
			</div>
			<div>
				<Button
					size="sm"
					themeType="accent"
					onClick={() => {
						setSaveDocument(true);
						handleView(download24);
					}}
					style={{ marginLeft: 'auto' }}
				>
					Download

				</Button>
			</div>
		</div>
	);
}

export default SelectDocumentCopies;
