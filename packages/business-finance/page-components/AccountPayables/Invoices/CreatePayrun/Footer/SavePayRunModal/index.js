import { Modal, Button, Placeholder } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useDeleteExcludePayrun from '../../../hooks/useDeleteExcludePayrun';
import useGetListSupplier from '../../../hooks/useGetListSupplier';
import ViewSupplierModal from '../ViewSupplierModal';

import styles from './styles.module.css';

const DEFAULT_CN = 0;

function SavePayRunModal({
	savePayrunModal = false,
	setSavePayrunModal = () => {},
	type = '',
}) {
	const [viewSupplier, showViewSupplier] = useState(null);

	const {
		loading = false,
		suppliers = {},
		setApiData = () => {},
		setFilters = () => {},
	} = useGetListSupplier();

	const {
		onExclude = () => {},
	} = useDeleteExcludePayrun({ setApiData, apiData: suppliers, type });

	return (
		<div>
			<Modal show={savePayrunModal} onClose={() => setSavePayrunModal(false)} size="lg">
				<Modal.Body>
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
				</Modal.Body>

				<Modal.Footer>
					<Button
						className={styles.button}
						themeType="secondary"
						onClick={() => showViewSupplier(true)}
					>
						View Suppliers
					</Button>
					<Button onClick={onExclude}>
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
					setFilters={setFilters}
					type={type}
					onExclude={onExclude}
					loading={loading}
				/>
			) : null}
		</div>
	);
}

export default SavePayRunModal;
