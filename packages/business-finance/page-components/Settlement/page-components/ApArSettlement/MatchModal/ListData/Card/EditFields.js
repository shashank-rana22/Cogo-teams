import { cl, Input } from '@cogoport/components';
import { IcMTick, IcMLineundo, IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EditFields({
	isError = false,
	inputvalue = 0,
	inputSet = () => {},
	originalTDS = 0,
	originalAllocation = 0,
	doneSet = () => {},
	handleFunc = () => {},
	newItem = {},
	setNewTDS = () => {},
	setPrevTDS = () => {},
	fieldType = '',
}) {
	const new_item = newItem || {};
	return (
		<div className={styles.flex}>
			<div className={cl`${styles.inputcontainer} ${isError ? styles.error : ''}`}>
				<Input
					type="number"
					value={inputvalue}
					onChange={(val) => inputSet(val)}
				/>
			</div>

			<IcMInformation
				className={styles.btn}
				height={14}
				width={14}
				themeType="primary"
			/>

			<IcMTick
				className={styles.btn}
				height={14}
				width={14}
				onClick={() => {
					doneSet(false);
					if (fieldType === 'tds') {
						new_item.tds = parseFloat(inputvalue);
					} else {
						new_item.allocationAmount = parseFloat(inputvalue);
					}
					handleFunc();
				}}
			/>

			<IcMLineundo
				height={14}
				width={14}
				className={styles.btn}
				onClick={() => {
					doneSet(false);
					if (fieldType === 'tds') {
						new_item.tds = originalTDS;
						setNewTDS(originalTDS);
						setPrevTDS(originalTDS);
					} else {
						new_item.allocationAmount = originalAllocation;
					}
					handleFunc();
				}}
			/>
		</div>
	);
}

export default EditFields;
