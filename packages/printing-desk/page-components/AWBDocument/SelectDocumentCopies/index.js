import { Button, CheckboxGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import { options } from '../../../constants/awb-copies-options';
import useGetMultipleCopiesList from '../../../hooks/useGetMultipleCopiesList';
import { GetSelectAllCheckbox } from '../../../utils/getSelectAllCheckbox';

import styles from './styles.module.css';

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
	const OPTIONS = options({ t });
	const { data } = useGetMultipleCopiesList(taskItem);

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

	return (
		<div className={styles.select_copies_container}>
			<div className={styles.column_flex}>
				{GetSelectAllCheckbox({ copiesOnChange, copiesValue })}
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
