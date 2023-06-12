import { Modal, Button, Input, Table } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import manageExceptionColumn from '../../../../configurations/manage-exception-table';

import StyledTable from './StyledTable';

function ManageExceptionsModal({
	showCycleExceptions,
	setShowCycleExceptions,
}) {
	const onClose = () => {
		setShowCycleExceptions((pv) => !pv);
	};

	const rest = 'loading';
	return (
		<Modal size="lg" show={showCycleExceptions} onClose={onClose} placement="bottom">
			<Modal.Header title="Manage Exceptions" />
			<Modal.Body>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button size="md" themeType="secondary">+ Add New Customer</Button>
					<div style={{ width: '40%' }}>
						<Input
							name="q"
							size="sm"
				// value={searchValue}
				// onChange={(e: any) => setSearchValue(e)}
							placeholder="Search By Cycle Name"
							suffix={(
								<div style={{ margin: '4px', display: 'flex' }}>
									<IcMSearchlight height={15} width={15} />
								</div>
							)}
						/>
					</div>
				</div>
				<StyledTable
					data={[]}
					columns={manageExceptionColumn()}
					{...rest}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ margin: '6px 20px' }}>
					2 Customers unselected and to be removed from this cycle upon submission
				</div>
				<Button onClick={onClose}>Save & Update List</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ManageExceptionsModal;
