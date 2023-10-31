import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useUpdateCostApprovalBill from '../../../hook/useUpdateCostApprovalBill';

import RaiseTicketModal from './RaiseTicketModal';
import RenderContent from './RenderContent';
import styles from './styles.module.css';

function RenderActionButton({ itemData = {}, refetch = () => {} }) {
	const router = useRouter();
	const { query } = router;
	const [showPopover, setShowPopover] = useState(false);
	const [showTicketModal, setShowTicketModal] = useState(false);

	const {
		apiTrigger,
	} = useUpdateCostApprovalBill({ itemData, setShowPopover, refetch });

	const onClickApprove = () => {
		setShowPopover(false);
		apiTrigger();
	};

	const onClickViewInvoice = () => {
		router.push(
			`/business-finance/audit-function/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}
				&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}&jobNumber=${itemData?.jobNumber}
				&status=${itemData?.status}&billType=${itemData?.billType}
				&isProforma=${itemData?.isProforma}&jobType=${itemData?.jobType}&view=${query?.view}`,
		);
	};

	return (
		<>
			<Popover
				placement="left"
				caret={false}
				interactive
				render={(
					<RenderContent
						setShowTicketModal={setShowTicketModal}
						setShowPopover={setShowPopover}
						onClickApprove={onClickApprove}
						onClickViewInvoice={onClickViewInvoice}
						query={query}
     />
				)}
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
			>
				<IcMOverflowDot
					className={styles.icon}
					onClick={() => setShowPopover((pre) => !pre)}

				/>
			</Popover>
			{showTicketModal ? (
				<RaiseTicketModal
					showTicketModal={showTicketModal}
					setShowTicketModal={setShowTicketModal}
					itemData={itemData}
					refetch={refetch}
				/>
			) : null}

		</>

	);
}

export default RenderActionButton;
