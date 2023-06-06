import { Popover, Button, Modal, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import useFinanceReject from '../../hooks/useFinanceReject';
import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';
import useGetRefresh from '../../hooks/useGetRefresh';
import usePostToSage from '../../hooks/usePostToSage';

import FinalPostModal from './FinalPostModal';
import styles from './styles.module.css';

type Itemdata = {
	id?: string
	invoiceStatus?: string
	entityCode?: number
	daysLeftForAutoIrnGeneration?: string
	isFinalPosted?:boolean
	invoiceType?:string
};
interface IRNGeneration {
	itemData?: Itemdata
	refetch?: Function
}
const INVOICE_STATUS = ['FINANCE_ACCEPTED', 'IRN_FAILED'];
const POSTED_STATUS = ['POSTED'];
const IRN_FAILED_STATUS = ['IRN_FAILED'];
const SHOW_POST_TO_SAGE = ['FINANCE_ACCEPTED'];
const { cogoport_entities : CogoportEntity } = GLOBAL_CONSTANTS || {};
function IRNGenerate({ itemData = {}, refetch }: IRNGeneration) {
	const [openReject, setOpenReject] = useState(false);
	const [textValue, setTextValue] = useState('');
	const [finalPostToSageModal, setFinalPostToSageModal] = useState(false);
	const [visible, setVisible] = useState(false);
	const { invoiceStatus = '', entityCode = '', isFinalPosted = false, invoiceType = '' } = itemData || {};
	const { id = '' } = itemData;
	const { financeReject, loading: loadingReject } = useFinanceReject({
		id,
		textValue,
		refetch,
	});
	const { postToSage, loading:showPostLoading } = usePostToSage(id);
	const {
		generateIrn, loading, finalPostFromSage, finalPostLoading, getSageInvoiceData, sageInvoiceData,
		sageInvoiceLoading,
	} = useGetIrnGeneration({
		id,
		refetch,
	});
	const { refresh, loadingOnRefresh } = useGetRefresh({
		id,
		refetch,
	});
	const financeRejected = () => {
		setOpenReject(!openReject);
	};
	const onChange = (e) => {
		setTextValue(e);
	};
	const { labels } = CogoportEntity[entityCode] || {};
	const { irn_label: IrnLabel } = labels || {};
	const handleFinalpost = () => {
		setFinalPostToSageModal(true);
		getSageInvoiceData();
		setVisible(!visible);
	};
	const showPost = ['REIMBURSEMENT', 'REIMBURSEMENT_CREDIT_NOTE'].includes(invoiceType);
	const content = () => (
		<div>
			<div
				className={styles.generate_container}
			>
				{(INVOICE_STATUS.includes(invoiceStatus) && !showPost) && (
					<Button
						size="sm"
						disabled={loading}
						onClick={() => generateIrn()}
					>
						{loading ? 'Generating' : 'Generate'}
						{' '}
						{IrnLabel}
					</Button>
				)}
				{POSTED_STATUS.includes(invoiceStatus) && (
					<div className={styles.button_container}>
						<Button
							size="sm"
							disabled={finalPostLoading}
							onClick={() => handleFinalpost()}
						>
							<div className={styles.button_style}>
								{isFinalPosted ? 'Information' : 'Final Post'}
							</div>
						</Button>
					</div>
				)}
				{IRN_FAILED_STATUS.includes(invoiceStatus) && (
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
		</div>
	);
	const rest = {
		onClickOutside: () => setVisible(false),
	};
	return (
		<Popover
			placement="left"
			render={content()}
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
