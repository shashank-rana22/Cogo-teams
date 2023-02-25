import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { format } from '@cogoport/utils/';
import { useState } from 'react';

import Actions from '../components/EnrichmentTable/Actions';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const [popoverId, setPopoverId] = useState(null);
	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: 'responded',
		},
	});

	const [enrichmentItem, setEnrichmentItem] = useState();

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: false });

	const router = useRouter();

	const handleUploadClick = (feedback_request_id) => {
		router.push('/enrichment/[id]', `/enrichment/${feedback_request_id}`);
	};
	const columns = [
		{
			Header   : <div>ID</div>,
			id       : 'id',
			accessor : ({ id = '' }) => (
				<section>
					{id}
				</section>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			id       : 'business_name',
			accessor : ({ organization = '' }) => (
				<section>
					{organization.business_name || '-'}
				</section>
			),
		},
		{
			Header   : <div>REQUEST DATE</div>,
			id       : 'created_at',
			accessor : ({ created_at }) => (
				<div>
					{created_at	 ? (
						<div>
							{format(created_at, 'dd MMM yyyy') || '-'}

						</div>
					) : '___'}

				</div>

			),
		},
		{
			Header   : <div>PAN</div>,
			id       : 'registration_number',
			accessor : ({ organization = {} }) => (
				<section>
					{organization.registration_number || '-'}
				</section>
			),
		},
		{
			Header   : <div>ADDRESS</div>,
			id       : 'address',
			accessor : ({ address = '', id = '' }, item = {}) => (

				address ? (
					<section style={{ display: 'flex' }}>
						<div className={styles.address}>
							{address}
						</div>

						<div
							className={styles.link_text}
							role="presentation"
							onClick={() => {
								setEnrichmentItem({
									item,
									type: 'address',
									id,

								});
							}}
						>
							View More

						</div>
					</section>
				) : '-'

			),
		},

		{
			key      : 'action',
			Header   : 'Action',
			accessor : (item) => {
				const { id } = item;

				return (
					<div className={styles.content_container}>
						<Popover
							visible={popoverId === id}
							placement="left"
							interactive
							render={(
								<Actions onClickCta={({ type }) => {
									if (type === 'manual') {
										handleUploadClick(id);
									} else {
										setEnrichmentItem({
											item,
											id,
											type,
										});
									}
									setPopoverId(null);
								}}
								/>
							)}
							onClickOutside={() => setPopoverId(null)}
						>
							<div
								className={styles.svg_container}
							>
								<IcMOverflowDot
									height={16}
									width={16}
									onClick={() => setPopoverId((pv) => (pv === id ? null : id))}
								/>
							</div>
						</Popover>
					</div>
				);
			},
		},
	];

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	return {
		columns,
		list,
		paginationData,
		refetch,
		loading,
		setParams,
		getNextPage,
		enrichmentItem,
		setEnrichmentItem,

	};
};

export default useListEnrichment;
