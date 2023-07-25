import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import List from '../../../../../commons/List/index.tsx';
import useInitiatePaymentAllotBank from '../../../hooks/useInitiatePaymentAllotBank';

import { ALLOT_BANK_CONFIG } from './allotBankConfig';
import RenderFunction from './renderFunction/index';
import styles from './styles.module.css';

function AllotBankList({
	selectedPayrun = null, showAllotBank = false, setShowAllotBank = () => {}, checkedRow = null, refetch = () => {},
	setCheckedRow = () => {}, allotEntityBank = {}, allotEntityLoading = false, overseasData = '',
	selectedIds = [], setSelectedIds = () => {},
}) {
	const { entityCode } = selectedPayrun || checkedRow || {};
	const [selectedBankId, setSelectedBankId] = useState(null);

	const { selectBank, loading } = useInitiatePaymentAllotBank({
		setCheckedRow,
		setShowAllotBank,
		refetch,
		overseasData,
		selectedIds,
		setSelectedIds,
	});

	const { functions } = RenderFunction(
		{
			selectedPayrun,
			selectedBankId,
			setSelectedBankId,
			checkedRow,
			setCheckedRow,
		},
	);
	const initiatePaymentClick = () => {
		selectBank(selectedBankId, selectedPayrun, checkedRow);
	};

	return (
		<div>
			<Modal size="xl" show={showAllotBank} onClose={() => setShowAllotBank(false)} placement="top">
				<Modal.Header title={`ALLOT BANK - ENTITY - ${entityCode}`} />
				<Modal.Body>
					<List
						config={ALLOT_BANK_CONFIG}
						itemData={allotEntityBank}
						loading={allotEntityLoading}
						functions={functions}
					/>
				</Modal.Body>
				<Modal.Footer>

					<Button
						type="reset"
						disabled={loading}
						className={styles.button}
						onClick={() => setShowAllotBank(false)}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={!selectedBankId || loading} onClick={initiatePaymentClick}>
						Initiate Payment
					</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AllotBankList;
