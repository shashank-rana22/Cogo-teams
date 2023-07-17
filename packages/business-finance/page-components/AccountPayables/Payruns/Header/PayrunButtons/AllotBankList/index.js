import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import List from '../../../../../commons/List/index.tsx';
import useInitiatePaymentAllotBank from '../../../hooks/useInitiatePaymentAllotBank';

import { ALLOT_BANK_CONFIG } from './allotBankConfig';
import RenderFunction from './renderFunction/index';

function AllotBankList({
	selectedPayrun = null, showAllotBank = false, setShowAllotBank = () => {}, checkedRow = null, refetch = () => {},
	setCheckedRow = () => {}, allotEntityBank = {}, allotEntityLoading = false, overseasData = '',
}) {
	const { entityCode } = selectedPayrun || checkedRow || {};
	const { selectBank, loading } = useInitiatePaymentAllotBank({
		checkedRow,
		setCheckedRow,
		setShowAllotBank,
		refetch,
		overseasData,
	});
	const [selectedBankId, setSelectedBankId] = useState(null);
	const { functions } = RenderFunction(
		{
			selectedPayrun,
			selectedBankId,
			setSelectedBankId,
			checkedRow,
			setCheckedRow,
		},
	);
	const initiatePaymentClick = async () => {
		await selectBank(selectedBankId, selectedPayrun, checkedRow);
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
						disabled={loading}
						style={{ marginRight: '12px' }}
						onClick={() => setShowAllotBank(false)}
					>
						Cancel
					</Button>
					<Button disabled={!selectedBankId || loading} onClick={initiatePaymentClick}>
						Initiate Payment
					</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AllotBankList;
