import { Loader, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import useGetListShipmentDocuments from '../../../../../hooks/useGetListShipmentDocuments';
import useGetSaasComplianceDocs from '../../../../../hooks/useGetSaasComplianceDocs';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import List from './List';
import RequestService from './RequestService';
import styles from './styles.module.css';
import excludeDocs from './utils/excludeDocsList';

const LENGTH_CHECK = 1;
const SUCCESS_HTTP_CODE = 200;

const TRADETYPE_MAPPING = {
	export : 'EXPORT',
	import : 'IMPORT',
};

function UploadComplianceDocs({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	tasksList = [],
}) {
	const { primary_service, servicesList } = useContext(ShipmentDetailContext);

	const { docs, loading } = useGetSaasComplianceDocs({ primary_service, task });

	const { uploadedDocs: allUploadedDocs, docLoading, getDocs } = useGetListShipmentDocuments({
		params: {
			shipment_id   : task?.shipment_id,
			document_type : 'compliance_document',
		},
		defaultParams: {
			page_limit: 50,
		},
	});

	const { apiTrigger, loading: taskUpdateLoading } = useUpdateShipmentPendingTask({
		refetch: () => {
			onCancel();
			taskListRefetch();
		},
	});

	const handleSubmit = async () => {
		const payload = {
			id: task?.id,
		};

		const res = await apiTrigger(payload);

		if (res.status === SUCCESS_HTTP_CODE && task.task === 'approve_compliance_documents') {
			const amendmentTask = tasksList?.filter((t) => t.task === 'amend_compliance_documents'
			&& t?.status === 'pending');

			if (!isEmpty(amendmentTask?.[GLOBAL_CONSTANTS.zeroth_index])) {
				await apiTrigger({ id: amendmentTask?.[GLOBAL_CONSTANTS.zeroth_index]?.id });
			}
		}
	};

	const serviceTradeType = servicesList?.filter((service) => service?.id === task?.service_id)
		?.[GLOBAL_CONSTANTS.zeroth_index]?.trade_type;

	const EXCULDE_DOCS_LIST = excludeDocs?.[serviceTradeType || '']?.map((item) => item.doc_code);

	const REQUIRED_DOCS = docs?.filter((doc) => !EXCULDE_DOCS_LIST?.includes(doc?.docCode)
	&& doc?.tradeType === TRADETYPE_MAPPING[serviceTradeType]);

	const uploadedDocs = allUploadedDocs?.list?.filter((item) => item.state === 'document_uploaded');

	let totalDocsList = [];
	if (task.task === 'upload_compliance_documents') {
		totalDocsList = REQUIRED_DOCS;
	} else if (['approve_compliance_documents', 'amend_compliance_documents'].includes(task.task)) {
		totalDocsList = allUploadedDocs?.list;
	}

	const uniq_doc_code = [...new Set(totalDocsList?.map((doc) => doc.docCode))];
	const uniq_doc_state = [...new Set(totalDocsList?.map((doc) => doc.state))];

	const disableSubmitForKam = uniq_doc_code?.length === uploadedDocs?.length;

	const disableSubmitForSO = uniq_doc_state?.length === LENGTH_CHECK
	&& uniq_doc_state?.[GLOBAL_CONSTANTS.zeroth_index] === 'document_accepted';

	const disableSubmit = !(task.task === 'upload_compliance_documents'
		? disableSubmitForKam : disableSubmitForSO);

	return loading || docLoading ? (
		<Loader />
	) : (
		<div>
			{totalDocsList?.map((item) => (
				<List
					key={item?.docCode}
					item={item}
					onCancel={onCancel}
					taskListRefetch={taskListRefetch}
					task={task}
					uploadedDocsRefetch={getDocs}
					allUploadedDocs={allUploadedDocs?.list}
				/>
			))}

			{task.task === 'approve_compliance_documents' ? (
				<RequestService
					task={task}
					uploadedDocsRefetch={getDocs}
				/>
			) : null}

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
