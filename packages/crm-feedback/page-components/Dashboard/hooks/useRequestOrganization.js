import { Button, Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../styles.module.css';

const useRequestOrganization = () => {
	const router = useRouter();

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: true });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	const getListTable = () => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getListTable(), [params, filters]);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...filters,
			...previousState,
			...values,
		}));
	};

	const dummyData = [
		{
			id                 : 'something',
			serial_id          : '1',
			organization       : 'Some Org',
			organization_id    : 'hfhfhduiasuhuishnui',
			count_of_feedbacks : 23,
			last_feedback_date : '2023-03-13T08:09:59.087Z',
			cogo_entity        : 'Singapore',
			status             : 'Request Created',
		},
		{
			id                 : 'something1',
			serial_id          : '2',
			organization       : 'Some Organzation Name',
			organization_id    : 'hdkghfklre',
			count_of_feedbacks : 12,
			last_feedback_date : '2021-04-13T08:09:59.087Z',
			cogo_entity        : 'India',
			status             : '4/10 Response Received',
		},
	];

	const paginationData = {
		page        : 1,
		page_limit  : 10,
		total       : 1,
		total_count : 8,
	};

	// const { list = [], ...paginationData } = data || {};

	const list = dummyData;

	const columns = [
		{
			Header   : <div>S. No.</div>,
			key      : 'serial_id',
			id       : 'serial_id',
			accessor : ({ serial_id = '' }) => (
				<section>
					#
					{serial_id || '__'}
				</section>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			key      : 'organization',
			id       : 'organization',
			accessor : ({ organization = '' }) => (
				<section className={styles.table_cell}>
					{organization || '__'}
				</section>
			),
		},
		{
			Header   : <div>NO. OF FEEDBACKS RECEIVED</div>,
			key      : 'count_of_feedbacks',
			id       : 'count_of_feedbacks',
			accessor : ({ count_of_feedbacks = '' }) => (
				<section className={styles.table_cell}>
					{count_of_feedbacks || '__'}
				</section>
			),
		},
		{
			Header   : <div>LAST FEEDBACK</div>,
			key      : 'last_feedback_date',
			id       : 'last_feedback_date',
			accessor : ({ last_feedback_date = '' }) => (
				<section>
					{format(last_feedback_date, 'dd MMM yyyy') || '__'}
				</section>
			),
		},
		{
			Header   : <div>COGO ENTITY</div>,
			key      : 'cogo_entity',
			id       : 'cogo_entity',
			accessor : ({ cogo_entity = '' }) => (
				<section className={styles.table_cell}>
					{startCase(cogo_entity) || '__'}
				</section>
			),
		},
		{
			Header   : <div>STATUS</div>,
			key      : 'correction',
			id       : 'correction',
			accessor : ({
				status = '', organization_id = '', organization = '',
			}) => (
				<section className={styles.view}>
					<Pill
						size="md"
						color={status === 'Request Created' ? ('blue') : ('green')}
					>
						{status || 'Status not found'}
					</Pill>
					<Button
						size="sm"
						themeType="secondary"
						onClick={() => {
							router.push(`/feedbacks/${organization_id}?organization=${organization}&status=${status}`);
						}}
					>
						View Request
					</Button>

				</section>
			),
		},
	];

	console.log(data);

	return {
		columns,
		data: list,
		loading,
		setParams,
		paginationData,
		filters,
		onChangeFilters,
		// onResetFilters,
		onChangeParams,
	};
};

export default useRequestOrganization;
