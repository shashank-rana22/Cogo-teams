import { Select, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../../../hooks/useCreateShipmentDocument';
import requestedDocsList from '../utils/requestDocsList.json';

import styles from './styles.module.css';

function RequestService({ task = {}, uploadedDocsRefetch = () => {} }) {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [newDoc, setNewDoc] = useState('');

	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		refetch: uploadedDocsRefetch,
	});

	const DOCS_LIST = [];
	requestedDocsList?.forEach((resultItem) => {
		const obj = {
			value: resultItem.doc_code, label: resultItem.doc_name,
		};

		DOCS_LIST.push(obj);
	});

	const onReviewSubmit = async () => {
		const filterDocList = requestedDocsList?.filter((obj) => obj?.doc_code === newDoc)
			?.[GLOBAL_CONSTANTS.zeroth_index];

		const DATA = {
			documents: [{
				file_name : filterDocList?.doc_name || undefined,
				data      : {
					doc_code        : newDoc,
					doc_description : filterDocList?.doc_desc || undefined,
				},
			}],
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
				<div className={styles.label}>
					Choose the document you want to request
				</div>

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
				onClick={isEmpty(newDoc) ? null : onReviewSubmit}
			>
				Submit
			</Button>
		</div>
	);
}

export default RequestService;
