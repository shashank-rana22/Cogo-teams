import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React from 'react';

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
		DocumentTypeFunc : (item: any) => <p>{startCase(item?.document_type)}</p>,
		ServiceTypeFunc  : (item: any) => <p>{startCase(item?.service_type)}</p>,
		DocumentStatus   : (item: any) => <p>{startCase(item?.state)}</p>,
		UploadedTypeFunc : (item: any) => (
			<p>
				{item?.uploaded_by_user?.name || item?.uploaded_by_org?.business_name}
			</p>
		),
		UploadedOnFunc: (item: any) => (
			<p>
				{item?.uploaded_at
        	? formatDate(item?.uploaded_at, 'dd MMM yy | hh:mm a', {}, true)
        	: null}
			</p>
		),
		viewFunc: (item: any) => (
			<>
				{' '}
				{item?.document_url ? (
					<Button
						themeType="secondary"
						size="xs"
						onClick={() => window.open(item?.document_url, '_blank')}
					>
						View
					</Button>
				) : null}
			</>
		),
		downloadFunc: (item: any) => (
			<>
				{item?.document_url ? (
					<div
						className={styles.download}
						onClick={() => saveAs(item?.document_url)}
					>
						<IcMDownload height={20} width={20} />
					</div>
				) : null}
			</>
		),
	};

	return (
		<div className={styles.List}>
			<List
				config={config}
				itemData={documentData}
				functions={functions}
				loading={loading}
			/>
		</div>
	);
}
export default Documents;
