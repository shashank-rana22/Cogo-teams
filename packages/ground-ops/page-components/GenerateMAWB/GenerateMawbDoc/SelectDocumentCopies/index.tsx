import { Button, CheckboxGroup, Checkbox } from '@cogoport/components';
import React, { useEffect } from 'react';

import useGetMultipleCopiesList from '../../Helpers/hooks/useGetMultipleCopiesList';

import multipleCopies from './multipleCopies';
import styles from './styles.module.css';

function SelectDocumentCopies({
	copiesValue, copiesOnChange, setSaveDocument, handleView, setGenerate,
	setViewDoc, download24, setEdit, setItem, setDocCopies, setEditCopies, taskItem,
}) {
	const { data } = useGetMultipleCopiesList(taskItem?.id);

	const OPTIONS = multipleCopies({ data, setEditCopies, setGenerate, setViewDoc, setEdit, setItem });

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

	useEffect(() => {
		setDocCopies(null);
		(copiesValue || []).forEach((copy) => {
			(data || []).forEach((item) => {
				if (copy === item?.copyType) {
					setDocCopies((prev) => (
						prev ? [...prev, { [copy]: item?.documentUrl }] : [{ [copy]: item?.documentUrl }]
					));
				}
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [copiesValue]);

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
