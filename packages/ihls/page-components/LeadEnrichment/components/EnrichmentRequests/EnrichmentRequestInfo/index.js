import { Pagination, Button, Modal } from '@cogoport/components';

import { getFieldController } from '../../../../../commons/Form/getFieldController';
import LeadTable from '../../../commons/LeadTable';
import getSearchControls from '../../../configurations/search-control';
import useDownloadRequestOrgData from '../../../hooks/useDownloadRequestOrgData';
import useGetEnrichmentRequestLeads from '../../../hooks/useGetEnrichmentRequestLeads';

import getEnrichmentRequestOrganizations from './getEnrichmentRequestOrganizationsColumns';
import styles from './styles.module.css';

function EnrichmentRequestInfo({ request = {}, onClose = () => {} }) {
	const {
		loading,
		response,
		control,
		debounceQuery,
		paginationData,
		setParams,
	} = useGetEnrichmentRequestLeads({ enrichment_request_id: request.id });

	const { loading: downloading, downloadFile } = useDownloadRequestOrgData();

	const columns = getEnrichmentRequestOrganizations();
	const searchControls = getSearchControls({ debounceQuery });

	const onPageChange = (pageNumber) => {
		setParams((p) => ({ ...p, page: pageNumber }));
	};

	return (
		<Modal
			style={{ width: '70%' }}
			show={request.type === 'view'}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title={(
				<span>
					View Accounts
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
					</div>
					<div className={styles.tableContainer}>
						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={paginationData.page}
								totalItems={paginationData.count}
								pageSize={10}
								onPageChange={onPageChange}
							/>
						</div>
						<LeadTable columns={columns} data={response} loading={loading} />
					</div>
				</>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_div}>
					<Button onClick={() => downloadFile(request.id)} loading={downloading}>Download</Button>
					<Button themeType="secondary" onClick={onClose}>Close</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EnrichmentRequestInfo;
