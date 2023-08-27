import { Popover, Button, Modal, Textarea } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useFinanceReject from '../../hooks/useFinanceReject';
import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';
import useGetRefresh from '../../hooks/useGetRefresh';
import usePostToSage from '../../hooks/usePostToSage';
import useUploadeInvoice from '../../hooks/useUploadInvoice';

import FinalPostModal from './FinalPostModal';
import InvoiceModal from './InvoiceModal';
import styles from './styles.module.css';

type Itemdata = {
	id?: string;
	invoiceStatus?: string;
	entityCode?: string;
	daysLeftForAutoIrnGeneration?: string;
	isFinalPosted?:boolean;
	invoiceType?:string;
};
interface IRNGeneration {
	itemData?: Itemdata;
	refetch?: Function;
}

interface RootState {
	profile?: {
		partner?: {
			id?: string;
		};
		permissions_navigations?: object;
	};
}

const INVOICE_STATUS = ['FINANCE_ACCEPTED', 'IRN_FAILED'];
const POSTED_STATUS = ['POSTED'];
const IRN_FAILED_STATUS = ['IRN_FAILED'];
const SHOW_POST_TO_SAGE = ['FINANCE_ACCEPTED'];

const PERMISSION_BUTTON = {
	upload_invoice: {
		title          : 'Upload Invoice',
		API_NAME       : 'post_sales_invoice_einvoice',
		NAVIGATION_KEY : 'business_finance-account_receivables',
	},
};

function IRNGenerate({ itemData = {}, refetch = () => {} }: IRNGeneration) {
	const { profile = {} }: RootState = useSelector((state) => state);
	const [openReject, setOpenReject] = useState(false);
	const [uploadInvoice, setUploadInvoice] = useState(false);
	const [textValue, setTextValue] = useState('');
	const [finalPostToSageModal, setFinalPostToSageModal] = useState(false);
	const [visible, setVisible] = useState(false);
	const { invoiceStatus = '', entityCode = '', isFinalPosted = false, invoiceType = '' } = itemData || {};
	const { id = '' } = itemData;

	const { partner = {}, permissions_navigations: PERMISSION_NAVIGATION = {} } = profile;

	const { NAVIGATION_KEY, API_NAME } = PERMISSION_BUTTON.upload_invoice || {};

	const NAVIGATION = PERMISSION_NAVIGATION
		?.[NAVIGATION_KEY]?.[API_NAME]?.[GLOBAL_CONSTANTS.zeroth_index]?.view_type !== 'none';

	const { id: partnerId = '' } = partner;

	const { financeReject, loading: loadingReject } = useFinanceReject({
		id,
		textValue,
		refetch,
	});
	const { postToSage, loading:showPostLoading } = usePostToSage({ id });
	const {
		generateIrn, loading, finalPostFromSage, finalPostLoading, getSageInvoiceData, sageInvoiceData,
		sageInvoiceLoading,
	} = useGetIrnGeneration({
		id,
		refetch,
		entityCode,
	});
	const { refresh, loadingOnRefresh } = useGetRefresh({
		id,
		refetch,
	});

	const { uploadEInvoice, loading: invoiceLoading } = useUploadeInvoice({
		id,
		setUploadInvoice,
		partnerId,
	});

	const financeRejected = () => {
		setOpenReject(!openReject);
	};
	const onChange = (e) => {
		setTextValue(e);
	};
	const { labels } = ENTITY_FEATURE_MAPPING[entityCode] || {};
	const { irn_label:irnLabel } = labels || {};

	const UPLOAD_INVOICE_PERMISSION = ENTITY_FEATURE_MAPPING[entityCode]
		?.feature_supported.includes('upload_invoice');
	const REFRESH_ALLOWED = ENTITY_FEATURE_MAPPING[entityCode]
		?.feature_supported.includes('refresh');

	const handleFinalpost = () => {
		setFinalPostToSageModal(true);
		getSageInvoiceData();
		setVisible(!visible);
	};
	const showPost = ['REIMBURSEMENT', 'REIMBURSEMENT_CREDIT_NOTE'].includes(invoiceType);

	const buttonMapping = [
		{
			status   : POSTED_STATUS,
			disabled : finalPostLoading,
			label    : isFinalPosted ? 'Information' : 'Final Post',
			criteria : true,
			action   : handleFinalpost,
		},
		{
			status   : IRN_FAILED_STATUS,
			disabled : loadingOnRefresh,
			label    : 'Refresh',
			criteria : REFRESH_ALLOWED,
			action   : refresh,
		},
	];

	function Content() {
		return (
			<div>
				<div
					className={styles.generate_container}
				>
					{(INVOICE_STATUS.includes(invoiceStatus) && !showPost && UPLOAD_INVOICE_PERMISSION && NAVIGATION)
					&& (
						<div className={styles.button_container}>
							<Button
								size="sm"
								disabled={invoiceLoading}
								onClick={() => setUploadInvoice(true)}
							>
								<div className={styles.lable_width}>
									Upload
									{' '}
									{irnLabel}
								</div>
							</Button>
						</div>
					)}
					{uploadInvoice && (
						<InvoiceModal
							uploadInvoice={uploadInvoice}
							setUploadInvoice={setUploadInvoice}
							uploadEInvoice={uploadEInvoice}
							loading={invoiceLoading}
						/>
					)}
					{(INVOICE_STATUS.includes(invoiceStatus) && !showPost)
				&& !IRN_FAILED_STATUS.includes(invoiceStatus) && (
					<div className={styles.button_container}>
						<Button
							size="sm"
							disabled={loading}
							onClick={() => generateIrn()}
						>
							<span className={styles.lable_width}>
								{IRN_FAILED_STATUS.includes(invoiceStatus) ? 'Regenerate' : 'Generate'}
								{' '}
								{irnLabel}
							</span>
						</Button>
					</div>
					)}
					{
						buttonMapping.map((item) => {
							const { status, disabled, label, criteria, action } = item;
							return (status.includes(invoiceStatus) && criteria
								? (
									<div className={styles.button_container}>
										<Button
											size="sm"
											disabled={disabled}
											onClick={action}
										>
											<span className={styles.lable_width}>
												{label}
											</span>
										</Button>
									</div>
								) : null

							);
						})
					}

					{(SHOW_POST_TO_SAGE.includes(invoiceStatus) && showPost) && (
						<Button
							disabled={showPostLoading}
							size="sm"
							onClick={postToSage}
						>
							Post to Sage
						</Button>
					)}
					<FinalPostModal
						finalPostToSageModal={finalPostToSageModal}
						setFinalPostToSageModal={setFinalPostToSageModal}
						finalPostFromSage={finalPostFromSage}
						sageInvoiceData={sageInvoiceData}
						sageInvoiceLoading={sageInvoiceLoading}
						finalPostLoading={finalPostLoading}
						isFinalPosted={isFinalPosted}
					/>
				</div>
				{(INVOICE_STATUS.includes(invoiceStatus) && !showPost) && (
					<div className={styles.button_container}>
						<Button
							size="sm"
							disabled={loading}
							onClick={financeRejected}
						>
							<div className={styles.lable_width}>Finance Reject</div>
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
									onClick={financeReject}
								>
									Reject
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				)}
			</div>
		);
	}
	const rest = {
		onClickOutside: () => setVisible(false),
	};
	return (
		<Popover
			placement="left"
			render={<Content />}
			visible={visible}
			{...rest}
		>
			<IcMOverflowDot
				style={{ cursor: 'pointer' }}
				width="16px"
				height="16px"
				onClick={() => setVisible(!visible)}
			/>
		</Popover>

	);
}
export default IRNGenerate;
