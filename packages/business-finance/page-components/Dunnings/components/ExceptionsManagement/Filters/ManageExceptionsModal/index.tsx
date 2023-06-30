import { Modal, Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import ExcludeList from '../../../../commons/ExcludeList';
import useManageExceptionList from '../../../../hooks/useManageExceptionList';
import { ManageExceptionInterface } from '../../Interfaces';
import styles from '../styles.module.css';

import { config } from './config';

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
	} = useManageExceptionList({ manageExceptionFilter, cycleListId, setManageExceptionFilter });

	const onSubmit = (data) => {
		getUploadList(data);
	};
	const showAddCustomerModal = !isEmpty(uncheckedRows);

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

				<div className={styles.button}>
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
							onChange={(e: string) => setSearchValue(e)}
							placeholder="Search By Customer Name"
							suffix={(
								<div className={styles.search_icon}>
									<IcMSearchlight height={15} width={15} />
								</div>
							)}
						/>
					</div>
				</div>

				<ExcludeList
					data={manageExceptionData || {}}
					config={config}
					uncheckedRows={uncheckedRows}
					setUncheckedRows={setUncheckedRows}
					loading={manageExceptionLoading}
					setFilters={setManageExceptionFilter}
				/>
			</Modal.Body>
			<Modal.Footer>
				{ uncheckedRows.length > 0 ? (
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
