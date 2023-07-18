import { Modal, Button, Toast, Placeholder } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetListSupplier from '../../../hooks/useGetListSupplier';
import ViewSupplierModal from '../ViewSupplierModal';

import styles from './styles.module.css';

const DEFAULT_CN = 0;

function SavePayRunModal({
	savePayrunModal,
	setSavePayrunModal,
	setViewSelectedInvoice,
}) {
	const [viewSupplier, showViewSupplier] = useState();
	const { push } = useRouter();
	const handleCloseModal = () => {
		setSavePayrunModal(false);
	};

	const {
		loading,
		suppliers,
		trigger,
		setApiData,
		setFilters,
	} = useGetListSupplier();

	const handleClick = () => {
		setViewSelectedInvoice(false);
		push(
			'/business-finance/account-payables/[active_tab]',
			'/business-finance/account-payables/payruns',
		);
		setSavePayrunModal(false);
		Toast.success('Please wait while Payrun Saves...');
	};

	return (
		<div>
			<Modal show={savePayrunModal} onClose={handleCloseModal} size="lg">
				<div className={styles.container}>
					<div className={styles.icon}>
						<IcCError width={28} height={28} />
					</div>
					<div className={styles.icon}>

						<span
							className={styles.count}
						>
							{loading ? <Placeholder width="50px" /> : (suppliers?.creditNotes || DEFAULT_CN)}
						</span>
						Credit notes available against the suppliers you have selected!
					</div>
				</div>
				<Modal.Footer>
					<Button
						className={styles.button}
						themeType="secondary"
						onClick={() => showViewSupplier(true)}
					>
						View Suppliers
					</Button>
					<Button onClick={handleClick}>
						Next
					</Button>
				</Modal.Footer>
			</Modal>
			{viewSupplier ? (
				<ViewSupplierModal
					suppliers={suppliers}
					viewSupplier={viewSupplier}
					showViewSupplier={showViewSupplier}
					setApiData={setApiData}
					refetch={trigger}
					setFilters={setFilters}
				/>
			) : null}
		</div>
	);
}

export default SavePayRunModal;
