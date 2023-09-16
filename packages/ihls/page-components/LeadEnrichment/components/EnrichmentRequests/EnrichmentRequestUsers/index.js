import { Button, Modal } from '@cogoport/components';
import React from 'react';

import SearchInput from '../../../../../commons/SearchInput';
import LeadTable from '../../../commons/LeadTable';
import useGetEnrichmentRequestUsers from '../../../hooks/useGetEnrichmentRequestUsers';

// import useGetObjectiveInfo from '../../hooks/useGetObjectiveInfo';

// import Header from './components/Header';
// import ObjectiveTable from './components/ObjectiveTable';

import getEnrichmentRequestUsersColumns from './getEnrichmentRequestUsersColumns';
import styles from './styles.module.css';

function EnrichmentRequestUsers({ request = null, onClose = () => {} }) {
	const {
		// loading,
		response,
		// searchQuery,
		debounceQuery,
		searchValue,
		setSearchValue,
		// setParams,
	} = useGetEnrichmentRequestUsers({ enrichment_request_id: request.id });

	const columns = getEnrichmentRequestUsersColumns();

	return (
		<Modal
			show={request.type === 'users'}
			onClose={onClose}
			placement="center"
			size="md"
		>
			<Modal.Header title={(
				<span>
					Users
				</span>
			)}
			/>
			<Modal.Body className={styles.modal_body}>
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
					</div>
					<div className={styles.tableContainer}>
						<LeadTable columns={columns} data={response} />
					</div>
				</>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_div}>
					<Button themeType="secondary" onClick={onClose}>Close</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EnrichmentRequestUsers;
