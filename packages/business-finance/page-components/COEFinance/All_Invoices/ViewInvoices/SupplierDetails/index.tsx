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
import { startCase } from '@cogoport/utils';
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

interface AdditionDetailInt {
	kycStatus?: string;
}
interface DocumentData {
	list: Array<object>;
}

interface DataProps {
	sellerDetail?: SellerDetail;
	serviceProviderCategory?: string;
	serviceProviderAdditionalDetail?: AdditionDetailInt;
	serviceProviderDocuments: DocumentData;
}

interface PaymentsData {
	payables?: string;
	receivables?: string;
	ledgerCurrency?: string;
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
	const { historyData, getSupplierHistory, loading } = useSupplierHistory({
		data,
	});
	const [showModal, setShowModal] = useState(false);
	const [showDocsModal, setShowDocsModal] = useState(false);

	const {
		sellerDetail,
		serviceProviderCategory = '',
		serviceProviderAdditionalDetail,
		serviceProviderDocuments,
	} = data;
	const { kycStatus = '' } = serviceProviderAdditionalDetail || {};
	const { payables, receivables, ledgerCurrency } = paymentsData || {};

	const handleChange = () => {
		getSupplierHistory();
		setShowModal(!showModal);
	};

	const functions = {
		DocumentTypeFunc : (item: any) => <p>{startCase(item?.document_type)}</p>,
		viewFunc         : (item: any) => (
			<Button
				themeType="secondary"
				size="md"
				onClick={() => window.open(item?.image_url, '_blank')}
			>
				View
			</Button>
		),
		downloadFunc: (item: any) => (
			<div className={styles.download} onClick={() => saveAs(item?.image_url)}>
				<IcMDownload height={20} width={20} />
			</div>
		),
	};

	return (
		<div className={styles.container}>
			<h3>Supplier Details</h3>

			<div className={styles.smallHr} />

			<div className={styles.card}>
				<div className={styles.orgNameAndVerified}>
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
								<div className={styles.organizationName}>
									{sellerDetail?.organizationName}
								</div>
							</Tooltip>
						) : (
							<div>
								<Placeholder height="20px" width="148px" />
							</div>
						)}
					</div>
					<div className={styles.tagsContainer}>
						{serviceProviderCategory && (
							<Pill color="blue" size="sm">
								{serviceProviderCategory}
							</Pill>
						)}
						{kycStatus === 'verified' && (
							<div className={styles.kycVerified}>
								<IcCFtick />
								<div>kyc verified</div>
							</div>
						)}
					</div>
				</div>

				<div className={styles.verticalSmallHr} />

				<div className={styles.accountDetails}>
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
						<div className={styles.textDecoration}>
							{!accPaymentLoading ? (
								<div className={styles.values}>
									{ledgerCurrency}
									{' '}
&nbsp;
									{' '}
									{showOverflowingNumber(payables || '-', 7)}
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
						<div className={styles.textDecoration}>
							{!accPaymentLoading ? (
								<div className={styles.values}>
									{ledgerCurrency}
									{' '}
&nbsp;
									{' '}
									{showOverflowingNumber(receivables || '-', 7)}
								</div>
							) : (
								<div>
									<Placeholder height="20px" width="100px" />
								</div>
							)}
						</div>
					</div>
				</div>

				<div className={styles.verticalSmallHr} />

				<div className={styles.supplierDetails}>
					<div
						className={styles.supplierHistory}
						onClick={(e) => {
            	handleChange();
						}}
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
								{historyData ? (
									<List
										config={config}
										itemData={{ list: historyData }}
										loading={loading}
									/>
								) : (
									<div className={styles.supplyCard}>NO HISTORY</div>
								)}
							</Modal.Body>
						</Modal>
					)}

					<div className={styles.docsContainer}>
						<div className={styles.docsIcon}>
							<IcADocumentTemplates />
						</div>
						<div
							className={styles.supplierHistory}
							onClick={() => {
              	setShowDocsModal(true);
							}}
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
									{kycStatus === 'verified'
                  && serviceProviderDocuments?.list ? (
	<List
		config={DOCUMENTS}
		itemData={{ list: serviceProviderDocuments?.list }}
		loading={loading}
		functions={functions}
	/>
                  	) : (
	<div className={styles.supplyCard}>NO Documents</div>
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
