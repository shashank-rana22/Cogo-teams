import { Button, Modal } from '@cogoport/components';
import React from 'react';

import List from '../../../../../commons/List/index.tsx';
import useGetAllotEntityBank from '../../../hooks/useGetAllotEntityBank';

import { ALLOT_BANK_CONFIG } from './allotBankConfig';

function AllotBankList({
	selectedPayrun, showAllotBank, setShowAllotBank,
}) {
	const { totalValue, entityCode } = selectedPayrun || {};
	const { allotEntityBank, allotEntityLoading } = useGetAllotEntityBank({
		selectedPayrun,
	});

	return (
		<div>
			<Modal size="xl" show={showAllotBank} onClose={() => setShowAllotBank(false)} placement="top">
				<Modal.Header title={`ALLOT BANK - ENTITY - ${entityCode}`} />
				<Modal.Body>
					{totalValue}
					<List config={ALLOT_BANK_CONFIG} itemData={allotEntityBank} loading={allotEntityLoading} />
				</Modal.Body>
				<Modal.Footer>

					<Button
						style={{ marginRight: '10px' }}
					>
						Cancel
					</Button>
					<Button>
						Initiate Payment
					</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AllotBankList;
