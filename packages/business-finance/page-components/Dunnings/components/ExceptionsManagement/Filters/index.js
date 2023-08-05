import { Button, Input } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import { exceptionMasterFilters, exceptionCycleWiseFilters } from '../../../configurations/exceptions-filters';
import useAddUploadList from '../../../hooks/useAddUploadList';

import AddCustomerModal from './AddCustomerModal';
import ManageExceptionsModal from './ManageExceptionsModal';
import styles from './styles.module.css';

function Filters({
	exceptionFilter = {},
	setExceptionFilter = null,
	subTabsValue = '',
	searchValue = '',
	showCycleExceptions = true,
	setShowCycleExceptions = null,
	setSearchValue = null,
	cycleListId = '',
	getMasterList = null,
	entityId = '',
}) {
	const [show, setShow] = useState(false);
	const [uncheckedRows, setUncheckedRows] = useState([]);
	const [showEntityFilter, setShowEntityFilter] = useState(true);

	const { control, handleSubmit, watch, reset } = useForm();

	const onClose = () => {
		setShow(false);
		setShowCycleExceptions(false);
		reset();
		setUncheckedRows([]);
	};

	const { getUploadList, uploadListLoading } = useAddUploadList({
		onClose,
		subTabsValue,
		setShowCycleExceptions,
		cycleListId,
		uncheckedRows,
		getMasterList,
	});

	return (

		<div className={styles.filter_div}>
			<div className={styles.filter_style}>
				<Filter
					controls={subTabsValue === 'masterExceptionList'
						? exceptionMasterFilters : exceptionCycleWiseFilters}
					setFilters={setExceptionFilter}
					filters={exceptionFilter}
				/>
			</div>

			<div className={styles.search}>
				<Input
					name="q"
					size="sm"
					value={searchValue}
					onChange={(e) => setSearchValue(e)}
					placeholder={subTabsValue === 'masterExceptionList'
						? 'Search By Customer Name' : 'Search By Cycle Name'}
					suffix={(
						<div style={{ margin: '4px', display: 'flex' }}>
							<IcMSearchlight height={15} width={15} />
						</div>
					)}
				/>
				{subTabsValue === 'masterExceptionList'
					? (
						<Button
							size="md"
							themeType="primary"
							onClick={() => {
								setShow(true);
								setShowEntityFilter(true);
							}}
							style={{ width: '30%' }}
						>
							Add To list
						</Button>
					) : ''}
				{(show)
				&& (
					<AddCustomerModal
						show={show}
						setShow={setShow}
						watch={watch}
						control={control}
						handleSubmit={handleSubmit}
						getUploadList={getUploadList}
						uploadListLoading={uploadListLoading}
						reset={reset}
						showEntityFilter={showEntityFilter}
						entityId={entityId}
					/>
				)}

				{showCycleExceptions && (
					<ManageExceptionsModal
						setShow={setShow}
						showCycleExceptions={showCycleExceptions}
						setShowCycleExceptions={setShowCycleExceptions}
						handleSubmit={handleSubmit}
						getUploadList={getUploadList}
						uploadListLoading={uploadListLoading}
						cycleListId={cycleListId}
						uncheckedRows={uncheckedRows}
						setUncheckedRows={setUncheckedRows}
						setShowEntityFilter={setShowEntityFilter}
					/>
				)}
			</div>
		</div>

	);
}

export default Filters;
