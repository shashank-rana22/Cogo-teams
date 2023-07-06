import { Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import requestedDocsList from '../utils/requestDocsList.json';

import styles from './styles.module.css';

function RequestService() {
	const [newDoc, setNewDoc] = useState('');

	const handleSelect = (val) => {
		console.log(val, 'val');
	};

	const DOCS_LIST = [];
	requestedDocsList?.map((item) => {
		const obj = {
			value: item.doc_code, label: item.doc_name,
		};

		DOCS_LIST.push(obj);
		return DOCS_LIST;
	});

	return (
		<div className={styles.container}>
			<div className={styles.input}>
				<div className={styles.label}>Choose the document you want to request</div>

				<Select
					className={styles.search_input}
					value={newDoc}
					placeholder="Choose Document"
					prefix={<IcMSearchlight />}
					onChange={(e) => handleSelect(e)}
					options={DOCS_LIST}
					style={{ width: '100%' }}
				/>
			</div>

		</div>
	);
}

export default RequestService;
