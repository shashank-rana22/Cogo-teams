import { Button, CheckboxGroup, Checkbox } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import useGetHawbCopiesList from '../../Helpers/hooks/useGetHawbCopiesList';

import styles from './styles.module.css';

const checkboxLabel = (label, key) => (
	<div className={styles.label}>
		{label}
		<Button
			themeType="linkUi"
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

function SelectDocumentCopies({ copiesValue, copiesOnChange, setSaveDocument, handleView, download24 }) {
	const { data, hawbCopiesList } = useGetHawbCopiesList();

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

	console.log('data', data);

	useEffect(() => {
		hawbCopiesList();
	}, []);

	return (
		<div className={styles.select_copies_container}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{getSelectAllCheckbox()}
				<CheckboxGroup
					options={OPTIONS}
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
