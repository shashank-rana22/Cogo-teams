import {
	Popover,
	Loader,
	Button,
	Pill,
	Placeholder,
	Tooltip,
	Modal,
} from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import {
	IcADocumentTemplates,
	IcCFtick,
	IcMDownload,
	IcMInfo,
} from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

import EmptyStateDocs from '../../../../commons/EmptyStateDocs';
import List from '../../../../commons/List/index';
import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import DOCUMENTS from '../../../configurations/DOCUMENTS';
import useSupplierHistory from '../../../hook/useSupplierHistory';

import styles from './styles.module.css';

interface SellerDetail {
	organizationName?: string;
}

interface DocumentData {
	list: Array<object>;
}
interface BillAdditionalObject {
	shipmentType?: string;
}

interface DataProps {
	sellerDetail?: SellerDetail;
	serviceProviderCategory?: string;
	serviceProviderDocuments: DocumentData;
	billAdditionalObject? : BillAdditionalObject;

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
		billAdditionalObject,
	} = data || {};
	const { payables, receivables, payablesCurrency, receivablesCurrency } = paymentsData || {};

	const handleChange = () => {
		getSupplierHistory();
		setShowModal(!showModal);
	};
	const rest = { onClickOutside: () => { setShowModal(false); } };

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
		sidDetailsFunc: (item:any) => (
			<div className={styles.sid_details}>
				{' '}
				SID -
				{' '}
				{item}
			</div>
		),
	};

	const getSupplierData = () => {
		if (loading) {
			return (
				<div className={styles.loader_main}>
					<Loader className={styles.loader} />
				</div>
			);
		}
		if (isEmpty(historyData)) {
			return <div>First Time</div>;
		}

		return (
			<>
				<div className={styles.details}>LAST 10 SID Details</div>
				{historyData.map((item:any) => (
					<div key={item}>
						{' '}
						SID -
						{' '}
						{item}
					</div>
				))}

			</>
		);
	};

	return (
		<div className={styles.container}>
			{billAdditionalObject?.shipmentType === 'ftl_freight'
				? <h3>Collection Party Details</h3>
				: <h3>Supplier Details</h3> }

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
									{showOverflowingNumber(getFormattedPrice(payables, payablesCurrency) || 0, 10)}
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
									{showOverflowingNumber(getFormattedPrice(
										receivables,
										receivablesCurrency,
									) || 0, 10)}
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
					<Popover
						placement="bottom"
						caret
						visible={showModal}
						render={getSupplierData()}
						{...rest}
					>
						<div
							onClick={() => {
								handleChange();
							}}
							role="presentation"
							className={styles.supplier_history}
						>
							Supplier History
						</div>
					</Popover>

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
										<div className={styles.supply_card}><EmptyStateDocs /></div>
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
