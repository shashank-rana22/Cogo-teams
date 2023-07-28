import { Button, Pill } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const UPLOAD_DOCUMENT_STATUS_MAPPING = {
	success    : 'green',
	inactive   : 'orange',
	processing : 'yellow',
	processed  : 'blue',
	failed     : 'red',
};

const useEnrichmentSheets = () => {
	const { profile } = useSelector((state) => state || {});

	const {
		partner: { id: partner_id },
		user: { id: user_id },
	} = profile;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			user_id,
			partner_id,
			q: searchQuery || undefined,
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/feedback_response_sheets',
			method  : 'get',
			authkey : 'get_allocation_feedback_response_sheets',
			params,
		},
		{ manual: false },
	);

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				user_id,
				partner_id,
				q: searchQuery || undefined,
			},
		}));
	}, [partner_id, searchQuery, user_id]);

	const columns = [
		{
			id       : 'file_id',
			Header   : 'SERIAL ID',
			accessor : ({ serial_id }) => (
				<section>
					<Pill>
						#
						{serial_id || '-'}
					</Pill>
				</section>
			),
		},
		{
			id       : 'file_name',
			Header   : 'FILE NAME',
			accessor : ({ file_name }) => (
				<section>{startCase(file_name) || '-'}</section>
			),
		},
		{
			id       : 'upload_date',
			Header   : 'UPLOAD DATE',
			accessor : ({ created_at }) => (
				<section>
					{created_at ? formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}
				</section>
			),
		},
		{
			id       : 'sheet_url',
			Header   : 'SHEET URL',
			accessor : ({ sheet_url }) => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						disabled={sheet_url === null}
						onClick={() => window.open(sheet_url, '_blank')}
					>
						Download
					</Button>
				</section>
			),
		},
		{
			id       : 'error_sheet_url',
			Header   : 'ERROR SHEET URL',
			accessor : ({ error_sheet_url }) => (
				<section>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						disabled={!error_sheet_url}
						onClick={() => window.open(error_sheet_url, '_blank')}
					>
						Download
					</Button>
				</section>
			),
		},

		{
			id       : 'status',
			Header   : 'STATUS',
			accessor : ({ status }) => (
				<seaction>
					<Pill size="md" color={UPLOAD_DOCUMENT_STATUS_MAPPING[status]}>
						{startCase(status) || '-'}
					</Pill>
				</seaction>
			),
		},
	];

	return {
		refetch,
		columns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		showUpload,
		setShowUpload,
	};
};

export default useEnrichmentSheets;
