import { Button, CheckboxGroup, Checkbox } from '@cogoport/components';
import React, { useState } from 'react';

import useGetHawbCopiesList from '../../Helpers/hooks/useGetHawbCopiesList';

import multipleCopies from './multipleCopies';
import styles from './styles.module.css';

function SelectDocumentCopies({
	copiesValue,
	copiesOnChange, setSaveDocument, handleView, setGenerate, setViewDoc, download24,
}) {
	const { data, hawbCopiesList } = useGetHawbCopiesList();
	const [editCopies, setEditCopies] = useState(null);
	const OPTIONS = multipleCopies({ setEditCopies, setGenerate, setViewDoc });

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

	// console.log('data', options);

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
