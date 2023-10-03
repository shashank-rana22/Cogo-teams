import { Pagination, Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import EmptyState from '../../../../../commons/EmptyState';
import SearchInput from '../../../../../commons/SearchInput';
import useGetObjectiveInfo from '../../../hooks/useGetObjectiveInfo';

import LoadingState from './components/LoadingState';
import ObjectiveTable from './components/ObjectiveTable';
import styles from './styles.module.css';

function ObjectiveInfo({ allocationLeadId = null, setAllocationLeadId = () => {} }) {
	const {
		loading,
		response,
		debounceQuery,
		paginationData,
		searchValue,
		setSearchValue,
		setParams,
	} = useGetObjectiveInfo({ allocationLeadId });

	const onClose = () => setAllocationLeadId(null);

	const onPageChange = (pageNumber) => {
		setParams((p) => ({ ...p, page: pageNumber }));
	};

	const isEmpty = !loading && response?.length === GLOBAL_CONSTANTS.zeroth_index;

	return (
		<Modal style={{ width: '70%' }} show={allocationLeadId} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div className={styles.modal_header}>
					<IcMEyeopen className={styles.eye_icon} />
					<span>
						View Objectives
					</span>
				</div>
			)}
			/>
			<Modal.Body className={styles.modal_body}>
				{isEmpty ? <EmptyState height={300} width={300} emptyText="" />
					: (
						<>
							<div className={styles.search}>
								<div className={styles.searchbar}>
									<SearchInput
										placeholder="Search Objective"
										size="sm"
										setGlobalSearch={setSearchValue}
										debounceQuery={debounceQuery}
										value={searchValue}
									/>
								</div>
								<Pagination
									type="table"
									currentPage={paginationData.page}
									totalItems={paginationData.count}
									pageSize={10}
									onPageChange={onPageChange}
								/>
							</div>
							<div className={styles.tableContainer}>
								{loading ? <LoadingState />
									: <ObjectiveTable objectiveList={response} />}
							</div>
						</>
					)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ObjectiveInfo;
