import { Button, Pagination } from '@cogoport/components';
import { IcMUndo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { getFieldController } from '../../../../commons/Form/getFieldController';
import LeadTable from '../../commons/LeadTable';
import enrichment_request_filters from '../../configurations/get-enrichment-request-filters';
import getSearchControls from '../../configurations/search-control';
import useGetEnrichmentRequests from '../../hooks/useGetEnrichmentRequests';

import EnrichmentRequestEdit from './EnrichmentRequestEdit';
import EnrichmentRequestInfo from './EnrichmentRequestInfo';
import EnrichmentRequestUsers from './EnrichmentRequestUsers';
import getEnrichmentRequestsColumns from './getEnrichmentRequestsColumns';
import styles from './styles.module.css';

function EnrichmentRequests() {
	const [request, setRequest] = useState({
		id   : null,
		type : null,
	});

	const onClose = () => {
		setRequest((p) => ({
			...p,
			id   : null,
			type : null,
		}));
	};
	const columns = getEnrichmentRequestsColumns({
		request,
		setRequest,
		onClose,
	});

	const {
		loading,
		response,
		refetch,
		control,
		paginationData,
		reset,
		params,
		setParams,
		debounceQuery,
	} = useGetEnrichmentRequests();
	const searchControls = getSearchControls({ debounceQuery, name: 'name', placeholder: 'Request name...' });

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
			</div>
			<div className={styles.logContainer}>

				<LeadTable columns={columns} data={response} loading={loading} />

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

				{request.type ? (
					<>
						<EnrichmentRequestInfo request={request} onClose={onClose} />
						<EnrichmentRequestEdit refetch={refetch} request={request} onClose={onClose} />
						<EnrichmentRequestUsers request={request} onClose={onClose} />
					</>
				) : null}
			</div>
		</div>
	);
}

export default EnrichmentRequests;
