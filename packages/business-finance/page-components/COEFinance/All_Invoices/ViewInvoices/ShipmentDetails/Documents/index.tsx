import { Loader, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React from 'react';

import EmptyStateDocs from '../../../../../commons/EmptyStateDocs';
import List from '../../../../../commons/List/index';
import { formatDate } from '../../../../../commons/utils/formatDate';
import config from '../../../../configurations/SHIPMENT_DOCUMENTS_CONFIG';
import useShipmentDocument from '../../../../hook/useShipmentDocument';

import styles from './styles.module.css';

interface DocumentsInterface {
	shipmentId: string;
}

function Documents({ shipmentId = '' }: DocumentsInterface) {
	const { data: documentData, loading } = useShipmentDocument(shipmentId);

	const functions = {
		DocumentTypeFunc: (item) => {
			const { document_type: DocumentType } = item || {};
			return <p>{startCase(DocumentType)}</p>;
		},
		ServiceTypeFunc: (item) => {
			const { service_type: serviceType } = item || {};
			return <p>{startCase(serviceType)}</p>;
		},
		DocumentStatus: (item) => {
			const { state } = item || {};
			return <p>{startCase(state)}</p>;
		},
		UploadedTypeFunc: (item) => {
			const {
				uploaded_by_user: UploadedByUser,
				uploaded_by_org: uploadedByOrg,
			} = item || {};
			return <p>{UploadedByUser?.name || uploadedByOrg?.business_name}</p>;
		},
		UploadedOnFunc: (item) => {
			const { uploaded_at: uploadedAt } = item || {};
			return (
				<p>
					{uploadedAt
						? formatDate(uploadedAt, 'dd MMM yy | hh:mm a', {}, true)
						: null}
				</p>
			);
		},
		viewFunc: (item) => {
			const { document_url: DocumentUrl } = item || {};
			return (
				<>
					{' '}
					{DocumentUrl ? (
						<Button
							themeType="secondary"
							size="xs"
							onClick={() => window.open(DocumentUrl, '_blank')}
						>
							View
						</Button>
					) : null}
				</>
			);
		},
		downloadFunc: (item) => {
			const { document_url: DocumentUrl } = item || {};
			return DocumentUrl ? (
				<div
					className={styles.download}
					onClick={() => saveAs(DocumentUrl)}
					role="presentation"
				>
					<IcMDownload height={20} width={20} />
				</div>
			) : null;
		},
	};

	const getDocumentData = () => {
		if (loading) {
			return (
				<div className={styles.loader_main}>
					<Loader className={styles.loader} />
				</div>
			);
		}
		if (isEmpty(documentData)) {
			return <EmptyStateDocs />;
		}
		return (
			<List
				config={config}
				itemData={documentData}
				functions={functions}
				loading={loading}
			/>
		);
	};

	return (
		<div className={styles.list}>
			{getDocumentData()}
		</div>
	);
}
export default Documents;
