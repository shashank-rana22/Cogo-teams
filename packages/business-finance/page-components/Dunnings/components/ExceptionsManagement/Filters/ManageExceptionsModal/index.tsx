import { Modal, Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useManageExceptionList from '../../../../hooks/useManageExceptionList';
import ExcludeList from '../../../commonComponents/ExcludeList';

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
	const [uncheckedRows, setUncheckedRows] = useState([]);
	const [manageExceptionFilter, setManageExceptionFilter] = useState({});
	const {
		manageExceptionData,
		manageExceptionLoading,
		searchValue,
		setSearchValue,
	} = useManageExceptionList({ manageExceptionFilter });

	const onSubmit = (data) => {
		getUploadList(data);
	};
	return (
		<Modal size="lg" show={showCycleExceptions} onClose={onClose} placement="center">
			<Modal.Header title="Manage Exceptions" />
			<Modal.Body>

				<div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px' }}>
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
				// onClick={onClose}
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
