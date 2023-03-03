import {
	Button,
	Pill,
	Placeholder,
	Tooltip,
	Modal,
} from '@cogoport/components';
import {
	IcADocumentTemplates,
	IcCFtick,
	IcMDownload,
	IcMInfo,
} from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

import List from '../../../../commons/List/index';
import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import DOCUMENTS from '../../../configurations/DOCUMENTS';
import config from '../../../configurations/SUPPLIER_HISTORY';
import useSupplierHistory from '../../../hook/useSupplierHistory';

import styles from './styles.module.css';

interface SellerDetail {
	organizationName?: string;
}

interface DocumentData {
	list: Array<object>;
}

interface DataProps {
	sellerDetail?: SellerDetail;
	serviceProviderCategory?: string;
	serviceProviderDocuments: DocumentData;
}

interface PaymentsData {
	payables?: string;
	receivables?: string;
	payablesCurrency?: string;
	receivablesCurrency?: string;
}
interface SupplierDetailsProps {
	data: DataProps;
	paymentsData?: PaymentsData;
	accPaymentLoading?: boolean;
}
function SupplierDetails({
	data,
	paymentsData,
	accPaymentLoading,
}: SupplierDetailsProps) {
	const { historyData, getSupplierHistory, loading } = useSupplierHistory();
	const [showModal, setShowModal] = useState(false);
	const [showDocsModal, setShowDocsModal] = useState(false);

	const {
		sellerDetail,
		serviceProviderCategory = '',
		serviceProviderDocuments,
	} = data || {};
	const { payables, receivables, payablesCurrency, receivablesCurrency } = paymentsData || {};

	const handleChange = () => {
		getSupplierHistory();
		setShowModal(!showModal);
	};

	const functions = {
		DocumentTypeFunc: (item: any) => {
			const { document_type: DocumentType } = item;
			return <p>{startCase(DocumentType)}</p>;
		},
		viewFunc: (item: any) => (
			<Button
				themeType="secondary"
				size="md"
				onClick={() => window.open(item?.image_url, '_blank')}
			>
				View
			</Button>
		),
		downloadFunc: (item: any) => (
			<div
				className={styles.download}
				onClick={() => saveAs(item?.image_url)}
				role="presentation"
			>
				<IcMDownload height={20} width={20} />
			</div>
		),
	};

	return (
		<div className={styles.container}>
			<h3>Supplier Details</h3>

			<div className={styles.small_hr} />

			<div className={styles.card}>
				<div className={styles.org_name_and_verified}>
					<div className={styles.flex}>
						Name -
						{!accPaymentLoading ? (
							<Tooltip
								content={(
									<div style={{ fontSize: '10px' }}>
										{sellerDetail?.organizationName}
									</div>
								)}
							>
								<div className={styles.organization_name}>
									{sellerDetail?.organizationName}
								</div>
							</Tooltip>
						) : (
							<div>
								<Placeholder height="20px" width="148px" />
							</div>
						)}
					</div>
					<div className={styles.tags_container}>
						{serviceProviderCategory && (
							<Pill color="blue" size="sm">
								{serviceProviderCategory}
							</Pill>
						)}
						{!isEmpty(serviceProviderDocuments?.list) && (
							<div className={styles.kyc_verified}>
								<IcCFtick />
								<div>kyc verified</div>
							</div>
						)}
					</div>
				</div>

				<div className={styles.vertical_small_hr} />

				<div className={styles.account_details}>
					<div className={styles.accounts}>
						<Tooltip
							content={(
								<div style={{ fontSize: '10px' }}>
									This amount is the overall outstanding Cogoport has against
									the vendor.
								</div>
							)}
						>
							<div className={styles.tooltip}>
								<IcMInfo width={15} height={15} />
							</div>
						</Tooltip>
            &nbsp; Amount Payables : &nbsp;
						{' '}
						<div className={styles.text_decoration}>
							{!accPaymentLoading ? (
								<div className={styles.values}>
									{payablesCurrency || '-'}
									{' '}
&nbsp;
									{' '}
									{showOverflowingNumber(payables || 0, 7)}
								</div>
							) : (
								<div>
									<Placeholder height="20px" width="100px" />
								</div>
							)}
						</div>
					</div>
					<div className={styles.accounts}>
						<Tooltip
							content={(
								<div style={{ fontSize: '10.3px' }}>
									This amount is the overall outstanding the vendor has against
									Cogoport. (Freight Forwarders etc.)
								</div>
							)}
						>
							<div className={styles.tooltip}>
								<IcMInfo width={15} height={15} />
							</div>
						</Tooltip>
            &nbsp; Amount Receivables : &nbsp;
						{' '}
						<div className={styles.text_decoration}>
							{!accPaymentLoading ? (
								<div className={styles.values}>
									{receivablesCurrency || '-'}
									{' '}
&nbsp;
									{' '}
									{showOverflowingNumber(receivables || 0, 7)}
								</div>
							) : (
								<div>
									<Placeholder height="20px" width="100px" />
								</div>
							)}
						</div>
					</div>
				</div>

				<div className={styles.vertical_small_hr} />

				<div className={styles.supplier_details}>
					<div
						className={styles.supplier_history}
						onClick={() => {
							handleChange();
						}}
						role="presentation"
					>
						Supplier History
					</div>
					{showModal && (
						<Modal
							size="lg"
							show={showModal}
							onClose={() => {
								setShowModal(false);
							}}
						>
							<Modal.Header title="SUPPLIER HISTORY" />
							<Modal.Body>
								{!isEmpty(historyData) ? (
									<List
										config={config}
										itemData={{ list: historyData }}
										loading={loading}
									/>
								) : (
									<div className={styles.supply_card}>NO HISTORY</div>
								)}
							</Modal.Body>
						</Modal>
					)}

					<div className={styles.docs_container}>
						<div className={styles.docs_icon}>
							<IcADocumentTemplates />
						</div>
						<div
							className={styles.supplier_history}
							onClick={() => {
								setShowDocsModal(true);
							}}
							role="presentation"
						>
							Documents
						</div>

						{showDocsModal && (
							<Modal
								size="lg"
								show={showDocsModal}
								onClose={() => {
									setShowDocsModal(false);
								}}
							>
								<Modal.Header title="Documents" />
								<Modal.Body>
									{!isEmpty(serviceProviderDocuments?.list) ? (
										<List
											config={DOCUMENTS}
											itemData={{ list: serviceProviderDocuments?.list }}
											loading={loading}
											functions={functions}
										/>
									) : (
										<div className={styles.supply_card}>NO Documents</div>
									)}
								</Modal.Body>
							</Modal>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default SupplierDetails;
