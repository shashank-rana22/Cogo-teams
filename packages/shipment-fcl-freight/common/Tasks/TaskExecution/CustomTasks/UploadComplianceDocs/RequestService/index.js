import { Select, Button, Toast } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../../../hooks/useCreateShipmentDocument';
import requestedDocsList from '../utils/requestDocsList.json';

import styles from './styles.module.css';

const FILTER_DOC_ARRAY_INIT_ELEMENT_KEY = 0;

function RequestService({ task = {} }) {
	const [newDoc, setNewDoc] = useState('');
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};
	const { apiTrigger, docLoading } = useCreateShipmentDocument({});

	const DOCS_LIST = [];
	requestedDocsList?.map((resultItem) => {
		const obj = {
			value: resultItem.doc_code, label: resultItem.doc_name,
		};

		DOCS_LIST.push(obj);
		return DOCS_LIST;
	});

	let FilterDocList;
	const onReviewSubmit = async () => {
		FilterDocList = requestedDocsList.filter((obj) => obj.doc_code === newDoc);

		const DATA = {
			documents: [{
				file_name: FilterDocList?.[FILTER_DOC_ARRAY_INIT_ELEMENT_KEY].doc_name || undefined,
			}],
			data: {
				doc_code        : newDoc,
				doc_description : FilterDocList?.[FILTER_DOC_ARRAY_INIT_ELEMENT_KEY].doc_desc,
			},
			shipment_id         : task?.shipment_id,
			document_type       : 'compliance_document',
			service_id          : task?.service_id,
			service_type        : task?.service_type,
			uploaded_by_org_id  : task?.organization_id,
			uploaded_by_user_id : userId,
			state               : 'document_requested',
		};

		await apiTrigger(DATA);
	};

	const handleSelect = (val) => {
		if (isEmpty(val)) {
			Toast.error('Select a new doc!');
			return;
		}
		setNewDoc(val);
	};

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

			<Button
				disable={docLoading}
				themeType="secondary"
				onClick={onReviewSubmit}
			>
				Submit

			</Button>
		</div>
	);
}

export default RequestService;
