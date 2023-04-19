import { Select, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../hooks/useCreateShipmentDocument';
import useListShipmentOrganizations from '../../../../hooks/useListShipmentOrganizations';
import DocumentForm from '../DocumentForm';

import getCreateDocumentParams from './getCreateDocumentParams';
import styles from './styles.module.css';

function PossibleDocument({
	showModal,
	setShowModal,
	data,
	shipment_data,
	activeStakeholder,
}) {
	const [selectedFile, setSelectedFile] = useState([]);
	const [orgId, setOrgId] = useState();

	const { control, watch } = useForm();
	const formValues = watch();

	const {
		// getList,
		apiData,
		loading,
		filters,
		setFilters,
	} = useListShipmentOrganizations({ shipment_data });

	const afterCreateRefetch = () => {
		setShowModal(false);
	};

	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		documents: [
			{
				document_url : selectedFile,
				file_name    : formValues?.document_type,
				// data: data || undefined,
			},
		],
		refetch: afterCreateRefetch,
	});

	const onSubmit = () => {
		const params = getCreateDocumentParams({
			shipmentData: shipment_data,
			formValues,
			activeStakeholder,
			filters,
			orgId,
		});

		apiTrigger(params);
	};

	const SourceOptions = Array.isArray(data)
		? (data || [])?.map((e) => ({ label: e?.business_name, value: e?.id }))
		: [];

	return (
		<div>
			<Modal
				show={showModal}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header title="Upload Document" />

				<Modal.Body className={styles.modal_container}>
					{['BookingDesk', 'DocumentDesk'].includes(activeStakeholder) ? (
						<Select
							size="sm"
							placeholder="Select Source"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.uploaded_by_org_id}
							options={SourceOptions || []}
							onChange={(e) => setFilters({ ...filters, uploaded_by_org_id: e })}
							isClearable
						/>
					) : null }

					<DocumentForm
						shipment_data={shipment_data}
						apiData={apiData}
						control={control}
						activeStakeholder={activeStakeholder}
						uploaded_by_org_id={filters?.uploaded_by_org_id}
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
						orgId={orgId}
						setOrgId={setOrgId}
					/>

				</Modal.Body>

				<Modal.Footer>
					<Button
						className={styles.footer}
						themeType="secondary"
						onClick={() => setShowModal(false)}
					>
						cancel
					</Button>
					<Button
						onClick={() => onSubmit()}
						disabled={loading || docLoading}
					>
						Upload
					</Button>

				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default PossibleDocument;
