import { Popover, Button, Modal, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useFinanceReject from '../../hooks/useFinanceReject';
import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';
import useGetRefresh from '../../hooks/useGetRefresh';
import useUploadeInvoice from '../../hooks/useUploadInvoice';

import styles from './styles.module.css';

type Itemdata = {
	id?: string
};
interface IRNGeneration {
	itemData?: Itemdata
	refetch?: Function
}

const INVOICE_STATUS = ['FINANCE_ACCEPTED', 'IRN_FAILED'];
const financeRejectCheck = ['FINANCE_ACCEPTED', 'IRN_FAILED'];

const { cogoport_entities } = GLOBAL_CONSTANTS || {};

function IRNGenerate({ itemData = {}, refetch }: IRNGeneration) {
	// const { generateIrn, loading } = useGetIrnGeneration({
	// 	id: itemData.id,
	// 	refetch,
	// });

	// const content = () => (
	// 	<div
	// 		style={{
	// 			display       : 'flex',
	// 			flexDirection : 'column',
	// 			width         : 'maxContent',
	// 			margin        : '8px',
	// 		}}
	// 	>
	// 		<Button
	// 			className="secondary sm"
	// 			disabled={loading}
	// 			onClick={() => generateIrn()}
	// 		>
	// 			Generate IRN
	// 		</Button>
	// 	</div>
	// );

	const [uploadInvoice, setUploadInvoice] = useState(false);
	const [openReject, setOpenReject] = useState(false);
	const [show, setShow] = useState(false);
	const [textValue, setTextValue] = useState('');
	const { profile = {} } = useSelector((state) => state);
	const { invoiceStatus } = itemData || {};

	const { partner = {} } = profile;

	const { financeReject, loading: loadingReject } = useFinanceReject({
		id: itemData?.id,
		textValue,
		refetch,
	});

	const { generateIrn, loading, finalPostFromSage, finalPostLoading } =		useGetIrnGeneration({
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

	// const invoiceControls = uploadInvoiceControls();

	const { daysLeftForAutoIrnGeneration = '' } = itemData || {};

	const financeRejected = () => {
		setShow(false);
		setOpenReject(!openReject);
	};

	const onChange = (e) => {
		setTextValue(e.target.value);
	};
	const { labels } = cogoport_entities[itemData?.entityCode] || {};

	const { irn_label } = labels || {};

	const content = () => (
		<div>
			{partner?.id === GLOBAL_CONSTANTS.country_entity_ids.VN ? (
				<div>
					<div style={{ display: 'flex', flexDirection: 'column', margin: '8px', width: 'maxContent' }}>
						<Button
							className="secondary sm"
							disabled={loading}
							onClick={() => setUploadInvoice(true)}
						>
							Upload E-invoice
						</Button>
					</div>
					{/* {uploadInvoice ? (
						<InvoiceModal
							uploadInvoice={uploadInvoice}
							setUploadInvoice={setUploadInvoice}
							controls={invoiceControls}
							uploadEInvoice={uploadEInvoice}
							loading={invoiceLoading}
						/>
					) : null} */}
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', margin: '8px', width: 'maxContent' }}>
					{INVOICE_STATUS.includes(invoiceStatus) && (
						<Button
							className="secondary sm"
							disabled={loading || daysLeftForAutoIrnGeneration <= 0}
							onClick={() => generateIrn()}
						>
							Generate
							{' '}
							{irn_label}
						</Button>
					)}
					{financeRejectCheck.includes(itemData?.invoiceStatus) && (
						<div className={styles.button_container}>
							<Button
								className="secondary sm"
								disabled={loading}
								onClick={() => financeRejected()}
							>
								<div className={styles.button_style}>Finance Reject</div>
							</Button>
						</div>
					)}
					{openReject && (
						<Modal
							width={500}
							show={openReject}
							onClose={() => {
								setOpenReject(false);
							}}
						>
							<div>
								<div>Remarks*</div>
								<div>
									<Textarea
										themeType="large"
										value={textValue}
										onChange={onChange}
									/>
								</div>
								<div className={styles.button_val}>
									<Button
										className="secondary sm"
										onClick={() => {
											setOpenReject(false);
										}}
									>
										Cancel
									</Button>
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
							</div>
						</Modal>
					)}

					{invoiceStatus === 'IRN_FAILED' && (
						<div className={styles.button_container}>
							<Button
								className="secondary sm"
								disabled={loadingOnRefresh}
								onClick={refresh}
							>
								<div className={styles.button_style}>Refresh</div>
							</Button>
						</div>
					)}
					{invoiceStatus === 'POSTED' && (
						<div className={styles.button_container}>
							<Button
								className="secondary sm"
								disabled={finalPostLoading}
								onClick={() => finalPostFromSage()}
							>
								<div className={styles.button_style}>Final Post</div>
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

	return null;
}

export default IRNGenerate;
