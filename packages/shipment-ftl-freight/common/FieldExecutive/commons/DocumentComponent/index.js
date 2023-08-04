import { Button, Checkbox, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { getFileName } from '../../utils/helperFunctions';

import MovePopOver from './MovePopOver';
import ReUploadPopOver from './ReUploadPopOver';
import styles from './styles.module.css';

function DocumentComponent(props) {
	const [selectedFiles, setSelectedFiles] = useState(new Set());
	const {
		item = {},
		formattedData = {},
		setInitFormattedData = () => {},
		fieldExecTabConfig = {},
	} = props || {};

	const handleCheck = (id) => {
		if (!selectedFiles.has(id)) {
			setSelectedFiles((prev) => new Set(prev.add(id)));
		} else {
			setSelectedFiles((prev) => {
				const temp = new Set(prev);
				temp.delete(id);
				return temp;
			});
		}
	};

	const handleFullCheck = () => {
		const temp = new Set(selectedFiles);
		if (temp.size === formattedData[item?.key]?.length) {
			temp.clear();
		} else {
			formattedData[item?.key]?.forEach((documentItem) => {
				temp.add(documentItem.id);
			});
		}
		setSelectedFiles(temp);
	};

	return (
		<div>
			<div className={styles.single_header}>{item.label}</div>
			<div className={styles.sub_single_header}>
				<div className={styles.checkbox_div}>
					<Checkbox
						defaultChecked={false}
						checked={
							selectedFiles.size === formattedData[item.key]?.length
							&& !isEmpty(selectedFiles)
						}
						onChange={() => handleFullCheck()}
					/>
					{' '}
					<span className={styles.select_all}>Select All</span>
				</div>
				<div className={styles.button_header}>
					<ReUploadPopOver
						docItem={item}
						setInitFormattedData={setInitFormattedData}
					/>
					{fieldExecTabConfig?.move_document_visible ? (
						<MovePopOver
							selectedFiles={selectedFiles}
							docItem={item}
							setInitFormattedData={setInitFormattedData}
							setSelectedFiles={setSelectedFiles}
						/>
					) : null}
				</div>
			</div>
			<div className={styles.sub_body}>
				{formattedData[item?.key]?.map((documentItem) => (
					<div className={styles.sub_body_single} key={documentItem?.id}>
						<div className={styles.checkbox_div}>
							<Checkbox
								defaultChecked={false}
								checked={selectedFiles.has(documentItem?.id)}
								onChange={() => handleCheck(documentItem?.id)}
							/>
							{' '}
							<span className={cl`${styles.select_all} ${styles.file_name}`}>
								{getFileName(documentItem?.url)}
							</span>
						</div>
						<Button
							size="sm"
							themeType="link"
							onClick={() => {
								if (documentItem?.url) {
									window.open(documentItem?.url);
								}
							}}
						>
							view
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default DocumentComponent;
