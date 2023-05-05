import { Popover, Button, Modal, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useFinanceReject from '../../hooks/useFinanceReject';
import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';
import useGetRefresh from '../../hooks/useGetRefresh';
import useUploadeInvoice from '../../hooks/useUploadInvoice';

import InvoiceModal from './InvoiceModal';
import styles from './styles.module.css';

type Itemdata = {
	id?: string
	invoiceStatus?: string
	entityCode?: number
	daysLeftForAutoIrnGeneration?: string
};
interface IRNGeneration {
	itemData?: Itemdata
	refetch?: Function
}

const INVOICE_STATUS = ['FINANCE_ACCEPTED', 'IRN_FAILED'];
const financeRejectCheck = ['FINANCE_ACCEPTED', 'IRN_FAILED'];

const { cogoport_entities : CogoportEntity } = GLOBAL_CONSTANTS || {};

function IRNGenerate({ itemData = {}, refetch }: IRNGeneration) {
	const [uploadInvoice, setUploadInvoice] = useState(false);
	const [openReject, setOpenReject] = useState(false);
	const [textValue, setTextValue] = useState('');
	const { profile = {} } = useSelector((state) => state);
	const { invoiceStatus } = itemData || {};

	const { partner = {} } = profile;

	const { financeReject, loading: loadingReject } = useFinanceReject({
		id: itemData?.id,
		textValue,
		refetch,
	});

	const { generateIrn, loading, finalPostFromSage, finalPostLoading } = useGetIrnGeneration({
		id: itemData?.id,
		refetch,
	});

	const { refresh, loadingOnRefresh } = useGetRefresh({
		id: itemData?.id,
		refetch,
	});

	const { uploadEInvoice, loading: invoiceLoading } = useUploadeInvoice({
		id: itemData?.id,
		setUploadInvoice,
		partner,
	});

	const { daysLeftForAutoIrnGeneration = '' } = itemData || {};

	const financeRejected = () => {
		setOpenReject(!openReject);
	};

	const onChange = (e) => {
		setTextValue(e);
	};
	const { labels } = CogoportEntity[itemData?.entityCode] || {};

	const { irn_label: IrnLabel } = labels || {};

	const content = () => (
		<div>
			{partner?.id === GLOBAL_CONSTANTS.country_entity_ids.VN ? (
				<div>
					<div style={{ display: 'flex', flexDirection: 'column', margin: '8px', width: 'maxContent' }}>
						<Button
							size="sm"
							disabled={loading}
							onClick={() => setUploadInvoice(true)}
						>
							Upload E-invoice
						</Button>
					</div>
					{uploadInvoice ? (
						<InvoiceModal
							uploadInvoice={uploadInvoice}
							setUploadInvoice={setUploadInvoice}
							uploadEInvoice={uploadEInvoice}
							loading={invoiceLoading}
						/>
					) : null}
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', margin: '8px', width: 'maxContent' }}>
					{INVOICE_STATUS.includes(invoiceStatus) && (
						<Button
							size="sm"
							disabled={loading || (daysLeftForAutoIrnGeneration as unknown as number) <= 0}
							onClick={() => generateIrn()}
						>
							Generate
							{' '}
							{IrnLabel}
						</Button>
					)}
					{invoiceStatus === 'POSTED' && (
						<div className={styles.button_container}>
							<Button
								size="sm"
								disabled={finalPostLoading}
								onClick={() => finalPostFromSage()}
							>
								<div className={styles.button_style}>Final Post</div>
							</Button>
						</div>
					)}
					{financeRejectCheck.includes(itemData?.invoiceStatus) && (
						<div className={styles.button_container}>
							<Button
								size="sm"
								disabled={loading}
								onClick={() => financeRejected()}
							>
								<div className={styles.button_style}>Finance Reject</div>
							</Button>
						</div>
					)}
					{openReject && (
						<Modal
							show={openReject}
							onClose={() => {
								setOpenReject(false);
							}}
						>

							<Modal.Header title="Remarks*" />
							<Modal.Body>

								<Textarea
									size="md"
									value={textValue}
									onChange={onChange}
									style={{ height: '100px' }}
								/>

							</Modal.Body>
							<Modal.Footer>
								<div className={styles.button_val}>
									<div className={styles.style_cancel}>
										<Button
											className="secondary sm"
											onClick={() => {
												setOpenReject(false);
											}}
										>
											Cancel
										</Button>
									</div>
									<Button
										className="primary sm"
										disabled={!textValue || loadingReject}
										onClick={() => {
											financeReject();
										}}
									>
										Reject
									</Button>
								</div>
							</Modal.Footer>
						</Modal>
					)}

					{invoiceStatus === 'IRN_FAILED' && (
						<div className={styles.button_container}>
							<Button
								size="sm"
								disabled={loadingOnRefresh}
								onClick={refresh}
							>
								<div className={styles.button_style}>Refresh</div>
							</Button>
						</div>
					)}

				</div>
			)}
		</div>
	);

	return (
		<Popover
			placement="left"
			render={content()}
		>

			<IcMOverflowDot
				style={{ cursor: 'pointer' }}
				width="16px"
				height="16px"
			/>

		</Popover>
	);
}

export default IRNGenerate;
