import { Button, Checkbox, CheckboxGroup } from '@cogoport/components';
import React, { useEffect } from 'react';

import useGetMultipleCopiesList from '../../../hooks/useGetMultipleCopiesList';

import multipleCopies from './multipleCopies';
import styles from './styles.module.css';

const TOTAL_AWB_COPIES = 12;

const DOCUMENT_COPIES = ['original_3',
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
	'copy_12',
];

function SelectDocumentCopies({
	copiesValue = [],
	copiesOnChange = () => {},
	setSaveDocument = () => {},
	handleView = () => {},
	setViewDoc = () => {},
	download24 = false,
	setEdit = () => {},
	setItem = () => {},
	setDocCopies = () => {},
	setEditCopies = () => {},
	taskItem = {},
}) {
	const { data } = useGetMultipleCopiesList(taskItem);

	const options = multipleCopies({ data, setEditCopies, setViewDoc, setEdit, setItem });

	const onChangeTableHeaderCheckbox = (event) => {
		copiesOnChange(event.currentTarget.checked ? DOCUMENT_COPIES : []);
	};

	useEffect(() => {
		setDocCopies(null);
		(copiesValue || []).forEach((copy) => {
			(data || []).forEach((item) => {
				if (copy === item?.copyType) {
					setDocCopies((prev) => (
						prev ? [...prev, { [copy]: item?.documentUrl, copyStatus: item?.copyStatus }]
							: [{ [copy]: item?.documentUrl, copyStatus: item?.copyStatus }]
					));
				}
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [copiesValue]);

	const getSelectAllCheckbox = () => {
		const isAllRowsChecked = (copiesValue || []).length === TOTAL_AWB_COPIES;

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
