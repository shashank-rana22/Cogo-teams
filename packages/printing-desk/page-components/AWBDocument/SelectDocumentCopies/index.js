import { Button, Checkbox, CheckboxGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import { options } from '../../../constants/awb-copies-options';
import useGetMultipleCopiesList from '../../../hooks/useGetMultipleCopiesList';

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
	download24 = false,
	setDocCopies = () => {},
	taskItem = {},
	loading = false,
}) {
	const { t } = useTranslation(['printingDesk']);
	const OPTIONS = options(t);
	const { data } = useGetMultipleCopiesList(taskItem);

	const onChangeTableHeaderCheckbox = (event) => {
		copiesOnChange(event.currentTarget.checked ? DOCUMENT_COPIES : []);
	};

	useEffect(() => {
		(copiesValue || []).forEach((copy) => {
			(data || []).forEach((item) => {
				if (copy === item?.copyType) {
					setDocCopies((prev) => (
						[...prev, { [copy]: item?.documentUrl, copyStatus: item?.copyStatus }]
					));
				}
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [copiesValue]);

	function GetSelectAllCheckbox() {
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
	}

	return (
		<div className={styles.select_copies_container}>
			<div className={styles.column_flex}>
				{GetSelectAllCheckbox()}
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
					disabled={loading || isEmpty(copiesValue)}
				>
					{t('printingDesk:awb_document_download_document_container_download_other__button')}
				</Button>
			</div>
		</div>
	);
}

export default SelectDocumentCopies;
