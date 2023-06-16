import { Modal, Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useManageExceptionList from '../../../../hooks/useManageExceptionList';
import ExcludeList from '../../../commonComponents/ExcludeList';
import { ManageExceptionInterface } from '../../Interfaces';

function ManageExceptionsModal({
	showCycleExceptions,
	setShowCycleExceptions,
	setShow,
	handleSubmit,
	getUploadList,
	uploadListLoading,
	cycleListId,
	uncheckedRows,
	setUncheckedRows,
}:ManageExceptionInterface) {
	const [manageExceptionFilter, setManageExceptionFilter] = useState({});
	const {
		manageExceptionData,
		manageExceptionLoading,
		searchValue,
		setSearchValue,
		getManageExceptionList,
	} = useManageExceptionList({ manageExceptionFilter, cycleListId });

	const onSubmit = (data) => {
		getUploadList(data);
	};
	const showAddCustomerModal = uncheckedRows.length > 0;

	useEffect(() => {
		getManageExceptionList();
	}, [getManageExceptionList, showCycleExceptions]);

	return (
		<Modal
			size="lg"
			show={showCycleExceptions}
			onClose={() => { setShowCycleExceptions(false); setUncheckedRows([]); }}
			placement="center"
		>
			<Modal.Header title="Manage Exceptions" />
			<Modal.Body>

				<div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px' }}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setShow(true)}
						disabled={showAddCustomerModal}
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

				<ExcludeList
					data={manageExceptionData || {}}
					uncheckedRows={uncheckedRows}
					setUncheckedRows={setUncheckedRows}
					loading={manageExceptionLoading}
					setFilters={setManageExceptionFilter}
				/>
			</Modal.Body>
			<Modal.Footer>
				{ uncheckedRows?.length > 0 ? (
					<div style={{ margin: '6px 20px' }}>
						{uncheckedRows?.length}
						{' '}
						Customers unselected and to be removed from this cycle upon submission
					</div>
				) : (
					<div style={{ margin: '6px 20px' }}>
						Exclude customers you do not want in this cycle by unselecting them.
					</div>
				)}
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={uploadListLoading}
				>
					Save & Update List

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ManageExceptionsModal;
