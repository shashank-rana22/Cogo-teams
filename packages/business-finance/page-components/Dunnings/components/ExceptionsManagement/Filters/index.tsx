import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
import { exceptionMasterFilters, exceptionCycleWiseFilters } from '../../../configurations/exceptions-filters';

import AddCustomerModal from './AddCustomerModal';
import ManageExceptionsModal from './ManageExceptionsModal';
import styles from './styles.module.css';

interface Props {
	setExceptionFilter?:React.Dispatch<React.SetStateAction<object>>;
	exceptionFilter?:object
	subTabsValue?: string
	searchValue?:string;
	setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
	showCycleExceptions?: boolean;
	setShowCycleExceptions?:React.Dispatch<React.SetStateAction<boolean>>;
}
function Filters({
	exceptionFilter, setExceptionFilter, subTabsValue, searchValue,
	showCycleExceptions,
	setShowCycleExceptions,
	setSearchValue,
}:Props) {
	const [show, setShow] = useState(false);

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
					onChange={(e: any) => setSearchValue(e)}
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
							onClick={() => { setShow(true); }}
							style={{ width: '30%' }}
						>
							Add To list
						</Button>
					) : ''}
				{show && <AddCustomerModal show={show} setShow={setShow} />}
				{showCycleExceptions && (
					<ManageExceptionsModal
						showCycleExceptions={showCycleExceptions}
						setShowCycleExceptions={setShowCycleExceptions}
					/>
				)}
			</div>
		</div>

	);
}

export default Filters;
