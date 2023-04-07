import { Button, Modal, CheckboxGroup, Checkbox } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const options = [
	{ name: 'original1', value: 'original1', label: 'Original 1 (For issuing Carrier)' },
	{ name: 'original2', value: 'original2', label: 'Original 2 (For Consignee)' },
	{ name: 'original3', value: 'original3', label: 'Original 3 (For Shipper)' },
	{ name: 'copy4', value: 'copy4', label: 'Copy 4 (Delivery Receipt)' },
	{ name: 'copy5', value: 'copy5', label: 'Copy 5 (For Airport of Destination)' },
	{ name: 'copy6', value: 'copy6', label: 'Copy 6 (For Third Carrier)' },
	{ name: 'copy7', value: 'copy7', label: 'Copy 7 (For Second Carrier)' },
	{ name: 'copy8', value: 'copy8', label: 'Copy 8 (For First Carrier)' },
	{ name: 'copy9', value: 'copy9', label: 'Copy 9 (For Agent)' },
	{ name: 'copy10', value: 'copy10', label: 'Copy 10 (Extra Copies for Carrier)' },
	{ name: 'copy11', value: 'copy11', label: 'Copy 11 (Extra Copies for Carrier)' },
	{ name: 'copy12', value: 'copy12', label: 'Copy 12 ( For Customs)' },

];

function DownloadModal({ show, setShow }) {
	const [value, onChange] = useState<undefined | string[]>([]);

	const onChangeTableHeaderCheckbox = (event) => {
		onChange(event.currentTarget.checked ? [
			'original1',
			'original2',
			'original3',
			'copy4',
			'copy5',
			'copy6',
			'copy7',
			'copy8',
			'copy9',
			'copy10',
			'copy11',
			'copy12'] : []);
	};

	const getSelectAllCheckbox = () => {
		const isAllRowsChecked = (value || []).length === 12;

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
		<Modal
			size="md"
			show={show}
			onClose={() => setShow(false)}
			scroll={false}
			className={styles.modal_container}
		>
			<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Draft AWB Copies</h4>)} />
			<Modal.Body>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{getSelectAllCheckbox()}
					<CheckboxGroup
						style={{ flexDirection: 'column', width: '100%' }}
						options={options}
						onChange={onChange}
						value={value}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px', border: '1px solid #333' }}
					size="md"
					onClick={() => setShow(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button size="md" themeType="accent">Download</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DownloadModal;
