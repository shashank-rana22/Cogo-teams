import { Modal, Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import manageExceptionColumn from '../../../../configurations/manage-exception-table';
import useManageExceptionList from '../../../../hooks/useManageExceptionList';

import StyledTable from './StyledTable';

function ManageExceptionsModal({
	showCycleExceptions,
	setShowCycleExceptions,
	setShow,
	handleSubmit,
	getUploadList,
	uploadListLoading,
}) {
	const onClose = () => {
		setShowCycleExceptions((pv) => !pv);
	};
	const {
		manageExceptionData,
		manageExceptionLoading,
		searchValue,
		setSearchValue,
	} = useManageExceptionList();
	const rest = { loading: manageExceptionLoading };

	const onSubmit = (data) => {
		getUploadList(data);
	};
	return (
		<Modal size="lg" show={showCycleExceptions} onClose={onClose} placement="bottom">
			<Modal.Header title="Manage Exceptions" />
			<Modal.Body>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShow(true)}
					>
						+ Add New Customer

					</Button>
					<div style={{ width: '40%' }}>
						<Input
							name="q"
							size="sm"
							value={searchValue}
							onChange={(e: any) => setSearchValue(e)}
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
					data={manageExceptionData?.list || []}
					columns={manageExceptionColumn()}
					{...rest}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ margin: '6px 20px' }}>
					2 Customers unselected and to be removed from this cycle upon submission
				</div>
				<Button
				// onClick={onClose}
					onClick={handleSubmit(onSubmit)}
				>
					Save & Update List

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ManageExceptionsModal;
