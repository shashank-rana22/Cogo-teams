import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { approvedAWBFields } from '../../configurations/approved-awb';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';
import commonFunctions from '../../utils/commonFunctions';
import GenerateManifestDoc from '../GenerateManifestDoc';
import HAWBList from '../HawbList';

import styles from './styles.module.css';

function ApprovedAWB({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setItem = () => {},
	setViewDoc = () => {},
	setEdit = () => {},
	listAPI = () => {},
}) {
	const { t } = useTranslation(['printingDesk']);
	const [triggerManifest, setTriggerManifest] = useState('');
	const [handoverModal, setHandoverModal] = useState('');
	const fields = approvedAWBFields({ t });

	const { loading: updateLoading, updateShipment } = useUpdateShipmentDocument({ listAPI });

	const functions = {
		handleHandover: (singleItem) => {
			const { documentId, shipmentId, serviceId, documentUrl } = singleItem || {};
			const payload = {
				id              : documentId,
				shipmentId,
				documentType    : 'draft_airway_bill',
				handedOverForTd : true,
				serviceId,
				documentUrl,
			};
			const handleModal = (docId) => {
				setHandoverModal(docId);
			};
			return (
				<>
					<Button
						themeType="secondary"
						onClick={() => handleModal(documentId)}
						disabled={updateLoading}
					>
						{t('printingDesk:approve_awb_handover_button')}
					</Button>
					{(handoverModal === documentId) && (
						<Modal
							show={handoverModal === documentId}
							onClose={() => handleModal('')}
						>
							<Modal.Header title="Confirm Handover?" />
							<Modal.Body className={styles.modal_body}>
								{t('printingDesk:approve_awb_body_text')}
							</Modal.Body>
							<Modal.Footer>
								<Button
									themeType="secondary"
									disabled={updateLoading}
									onClick={() => handleModal('')}
								>
									{t('printingDesk:approve_awb_cancel_button')}

								</Button>
								<Button
									className={styles.confirm_button}
									disabled={updateLoading}
									onClick={() => updateShipment({ payload })}
								>
									{t('printingDesk:approve_awb_confirm_button')}
								</Button>
							</Modal.Footer>
						</Modal>
					)}
				</>
			);
		},
	};

	const allFunctions = { ...commonFunctions({ setViewDoc, setItem, setTriggerManifest, setEdit }), ...functions };

	return (
		<>
			<List
				fields={fields}
				data={data}
				page={page}
				setPage={setPage}
				loading={loading}
				functions={allFunctions}
				Child={HAWBList}
				setViewDoc={setViewDoc}
				setItem={setItem}
				setEdit={setEdit}
			/>
			{!isEmpty(triggerManifest) && (
				<Modal
					show={!isEmpty(triggerManifest)}
					onClose={() => { setTriggerManifest(''); }}
					size="lg"
				>
					<Modal.Body style={{ minHeight: '90vh' }}>
						<GenerateManifestDoc
							setTriggerManifest={setTriggerManifest}
							shipmentId={triggerManifest}
						/>
					</Modal.Body>

				</Modal>
			)}
		</>
	);
}

export default ApprovedAWB;
