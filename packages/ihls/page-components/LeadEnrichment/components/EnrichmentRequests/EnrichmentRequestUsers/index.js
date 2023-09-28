import { Pagination, Button, Modal } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../../../../commons/Form/getFieldController';
import LeadTable from '../../../commons/LeadTable';
import getSearchControls from '../../../configurations/search-control';
import useGetEnrichmentRequestUsers from '../../../hooks/useGetEnrichmentRequestUsers';

import getEnrichmentRequestUsersColumns from './getEnrichmentRequestUsersColumns';
import styles from './styles.module.css';

function EnrichmentRequestUsers({ request = null, onClose = () => {} }) {
	const {
		loading,
		response,
		control,
		debounceQuery,
		setParams,
		paginationData,
	} = useGetEnrichmentRequestUsers({ enrichment_request_id: request.id });
	const searchControls = getSearchControls({ debounceQuery, placeholder: 'name', name: 'q' });

	const columns = getEnrichmentRequestUsersColumns();

	const onPageChange = (pageNumber) => {
		setParams((p) => ({ ...p, page: pageNumber }));
	};

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
							{searchControls.map((item) => {
								const { name, type, width } = item;
								const Element = getFieldController(type);

								if (!Element) return null;

								return (
									<Element
										{...item}
										name={name}
										isClearable
										prefix={null}
										style={{ width }}
										control={control}
										key={name}
										size="sm"
									/>
								);
							})}
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
						<LeadTable columns={columns} data={response} loading={loading} />
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
