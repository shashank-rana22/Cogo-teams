import { Button, Modal } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { FinalAwbFields } from '../../configurations/final_awb';
import useCreateShipmentDocument from '../../hooks/useCreateShipmentDocument';
import UploadModal from '../UploadModal';

import styles from './styles.module.css';

function FinalAwb({
	data, loading, page, setPage, edit, setEdit, listAPi,
}) {
	const { fields } = FinalAwbFields;
	const [showApprove, setShowApprove] = useState(null);
	const [showUpload, setShowUpload] = useState(null);

	const { loading:createLoading, createDocument } = useCreateShipmentDocument();

	const handleUpdate = async (values) => {
		const fileArr = values.document.split('/');

		const payload = {
			shipment_id        : values?.shipmentId,
			uploaded_by_org_id : values?.serviceProviderId,
			document_type      : 'draft_airway_bill',
			service_id         : values?.serviceId,
			service_type       : 'air_freight_service',
			task_field_id      : '',
			documents          : [
				{
					data: {
						document_number: showUpload?.awbNumber,
					},
					document_type : 'draft_airway_bill',
					document_url  : values.document || undefined,
					file_name     : fileArr[fileArr.length - 1],
				},
			],
		};
		await createDocument(payload, listAPi);
		setShowApprove(null);
	};

	const functions = {
		handleEdit: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { setShowUpload(singleItem); setEdit('edit'); }}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
	};
	return (
		<>
			<List
				fields={fields}
				data={data}
				loading={loading}
				page={page}
				setPage={setPage}
				functions={functions}
			/>
			{showApprove && (
				<Modal
					size="md"
					show={showApprove}
					onClose={() => setShowApprove(false)}
					scroll={false}
				>
					<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Approval Remark</h4>)} />
					<Modal.Body>
						<div className={styles.sure_approve}>
							Did you get confirmation from your KAM to provide approval?
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ marginRight: '10px', border: '1px solid #333' }}
							size="md"
							disabled={createLoading}
							onClick={() => setShowApprove(null)}
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="accent"
							disabled={createLoading}
							onClick={() => { handleUpdate(showApprove); }}
						>
							Approve

						</Button>
					</Modal.Footer>
				</Modal>
			)}
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				edit={edit}
				setEdit={setEdit}
				listAPi={listAPi}
			/>
		</>
	);
}

export default FinalAwb;
