import { Button, Modal, Pagination } from '@cogoport/components';
import { IcMEyeopen, IcMUndo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { getFieldController } from '../../../../commons/Form/getFieldController';
import LeadTable from '../../commons/LeadTable';
import enrichment_request_filters from '../../configurations/get-enrichment-request-filters';
import getSearchControls from '../../configurations/search-control';
import useGetEnrichmentRequests from '../../hooks/useGetEnrichmentRequests';

import EnrichmentRequestInfo from './EnrichmentRequestInfo';
import getEnrichmentRequestsColumns from './getEnrichmentRequestsColumns';
import styles from './styles.module.css';

function EnrichmentRequests() {
	const [logId, setLogId] = useState(null);
	const columns = getEnrichmentRequestsColumns({ setLogId });

	const {
		loading,
		response,
		control,
		paginationData,
		reset,
		params,
		setParams,
		debounceQuery,
	} = useGetEnrichmentRequests();
	const searchControls = getSearchControls({ debounceQuery, name: 'name', placeholder: 'Request name...' });

	const onClose = () => {
		setLogId(null);
	};

	const onClickReset = () => {
		reset();
	};

	const onPageChange = (newPage) => {
		setParams({ ...params, page: newPage });
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>
				<div>
					{searchControls.map((item) => {
						const { name, type } = item;
						const Element = getFieldController(type);
						if (!Element) return null;
						return (
							<Element
								{...item}
								name={name}
								isClearable
								prefix={null}
								control={control}
								key={name}
								size="sm"
							/>
						);
					})}
				</div>
				<div className={styles.input_filters}>
					{enrichment_request_filters.map((item) => {
						const ele = { ...item };
						const { name, placeholder, type, width, options } = item;
						const Element = getFieldController(type);
						return (
						// <div key={name} className={styles.field_container}>
							<Element
								{...ele}
								prefix={null}
								placeholder={placeholder}
								options={options}
								isClearable
								style={{ width }}
								control={control}
								key={name}
								size="sm"
							/>
						// </div>
						);
					})}
					<Button
						themeType="secondary"
						onClick={onClickReset}
						disabled={loading}
						className={styles.icmUndo}
					>
						<IcMUndo style={{ width: '16px', height: 'auto' }} />
					</Button>
				</div>
				{/* <div style={{ display: 'flex' }}>
					<Popover
						interactive
						placement="bottom"
						visible={open}
						caret={false}
						onClickOutside={onClickOutside}
						render={open ? (
							<SubFilters
								loading={loading}
								control={control}
								handleSubmit={handleSubmit}
								handleClick={handleClick}
							/>
						) : null}
					>
						<div className={styles.filters}>
							<Button themeType="secondary" onClick={() => setOpen(!open)}>
								<IcMFilter className={styles.icmFilter} />
								Filters
							</Button>
							<Button
								themeType="secondary"
								onClick={onClickReset}
								disabled={loading}
								className={styles.icmUndo}
							>
								<IcMUndo style={{ width: '16px', height: 'auto' }} />
							</Button>
						</div>
					</Popover>
				</div> */}
			</div>
			<div className={styles.logContainer}>

				<LeadTable columns={columns} data={response} loading={false} />

				{!loading && !isEmpty(response)
				&& (
					<div className={styles.pagination}>
						<Pagination
							type="number"
							currentPage={paginationData?.page}
							totalItems={paginationData?.count}
							pageSize={paginationData?.page_limit}
							onPageChange={onPageChange}
						/>
					</div>
				)}

				<Modal style={{ width: '70%' }} show={!isEmpty(logId)} onClose={onClose} placement="center">
					<Modal.Header title={(
						<>
							<IcMEyeopen className={styles.eye_icon} />
							<span>
								View Accounts
							</span>
						</>
					)}
					/>
					<Modal.Body className={styles.modal_body}>
						<EnrichmentRequestInfo />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={onClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default EnrichmentRequests;
