import { Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetListShipmentDocuments from '../../../../../hooks/useGetListShipmentDocuments';
import useGetSaasComplianceDocs from '../../../../../hooks/useGetSaasComplianceDocs';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import List from './List';
import RequestService from './RequestService';
import styles from './styles.module.css';
import excludeDocs from './utils/excludeDocsList';

function UploadComplianceDocs({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
}) {
	const { primary_service } = useContext(ShipmentDetailContext);

	const { docs, loading } = useGetSaasComplianceDocs({ primary_service });

	const { uploadedDocs: allUploadedDocs, docLoading, getDocs } = useGetListShipmentDocuments({
		params: {
			shipment_id   : task?.shipment_id,
			document_type : 'compliance_document',
		},
	});

	const { apiTrigger, loading: taskUpdateLoading } = useUpdateShipmentPendingTask({
		refetch: () => {
			onCancel();
			taskListRefetch();
		},
	});

	const EXCULDE_DOCS_LIST = excludeDocs.export?.map((item) => item.doc_code);

	const REQUIRED_DOCS = docs?.filter((doc) => !EXCULDE_DOCS_LIST.includes(doc?.docCode)
	&& doc?.tradeType === 'EXPORT');

	const uploadedDocs = allUploadedDocs?.list?.filter((item) => item.state === 'document_uploaded');

	const approvedDocs = allUploadedDocs?.list?.filter((item) => item.state === 'document_accepted');

	const DISABLE_SUBMIT_TILL_ALL_UPLOADED = REQUIRED_DOCS?.length === uploadedDocs?.length;

	const DISABLE_SUBMIT_TILL_ALL_APPROVED = REQUIRED_DOCS?.length === approvedDocs?.length;

	const disableSubmit = !(task.task === 'approve_compliance_documents'
		? DISABLE_SUBMIT_TILL_ALL_APPROVED : DISABLE_SUBMIT_TILL_ALL_UPLOADED);

	const handleSubmit = async () => {
		const payload = {
			id: task?.id,
		};

		await apiTrigger(payload);
	};

	return loading || docLoading ? (
		<Loader />
	) : (
		<div>
			{REQUIRED_DOCS?.map((item) => (
				<List
					key={item?.docCode}
					item={item}
					onCancel={onCancel}
					taskListRefetch={taskListRefetch}
					task={task}
					uploadedDocs={uploadedDocs?.list}
					uploadedDocsRefetch={getDocs}
					allUploadedDocs={allUploadedDocs?.list}
				/>
			))}

			{task.task === 'approve_compliance_documents' ? <RequestService task={task} /> : null}

			<div className={styles.submit}>
				<Button
					themeType="secondary"
					style={{ color: '#fff', backgroundColor: '#000', padding: '6px 12px' }}
					disabled={disableSubmit || taskUpdateLoading}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadComplianceDocs;
