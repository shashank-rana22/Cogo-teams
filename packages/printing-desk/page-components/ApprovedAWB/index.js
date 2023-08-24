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
	const [handoverModal, setHandoverModal] = useState(false);
	const { fields } = approvedAWBFields(t);

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
			return (
				<>
					<Button
						themeType="secondary"
						onClick={() => setHandoverModal(true)}
						disabled={updateLoading}
					>
						Handover
					</Button>
					{handoverModal && (
						<Modal
							show={handoverModal}
							onClose={() => { setHandoverModal(false); }}
						>
							<Modal.Header title="Confirm Handover?" />
							<Modal.Body className={styles.modal_body}>
								Are you sure you want to confirm the Handover?
								{t('printingDesk:approve_awb_body_text')}
							</Modal.Body>
							<Modal.Footer>
								<Button
									themeType="secondary"
									disabled={updateLoading}
									onClick={() => setHandoverModal(false)}
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
