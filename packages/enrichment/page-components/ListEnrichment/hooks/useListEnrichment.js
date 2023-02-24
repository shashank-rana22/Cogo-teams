import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

// import { format } from '@cogoport/utils/';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const [addressModal, setAddressModal] = useState({
		showModal   : false,
		addressData : '',
	});

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: false });

	const router = useRouter();

	const handleViewMoreClick = (e, address) => {
		e.preventDefault();

		setAddressModal((prev) => (
			{
				...prev,
				showModal   : true,
				addressData : address,
			}
		));
	};

	const handleUploadClick = (organization_id) => {
		router.push('/enrichment/[organization_id]', `/enrichment/${organization_id}`);
	};
	const columns = [
		{
			Header   : <div>ID</div>,
			id       : 'a',
			accessor : ({ id = '' }) => (
				<section>
					{id}
				</section>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			id       : 'b',
			accessor : ({ organization_name = '' }) => (
				<section>
					{organization_name}
				</section>
			),
		},
		{
			Header   : <div>REQUEST DATE</div>,
			id       : 'c',
			accessor : ({ request_date }) => (
				<div>
					{/* {request_date	 ? (
						<div>
							{format(request_date, 'dd MMM yyyy') || '___'}

						</div>
					) : '___'} */}
					{request_date}
				</div>

			),
		},
		{
			Header   : <div>PAN</div>,
			id       : 'd',
			accessor : ({ registration_number = '' }) => (
				<section>
					{registration_number}
				</section>
			),
		},
		{
			Header   : <div>ADDRESS</div>,
			id       : 'e',
			accessor : ({ address = '' }) => (

				<section style={{ display: 'flex' }}>
					<div className={styles.address}>

						{address}

					</div>

					<div
						className={styles.link_text}
						role="presentation"
						onClick={(e) => {
							handleViewMoreClick(e, address);
						}}

					>

						View More

					</div>

				</section>

			),
		},
		{
			Header   : <div>SUBMIT ENRICHED DATE</div>,
			id       : 'f',
			accessor : ({ id }) => (
				<section>
					<Button themeType="secondary" size="sm" onClick={() => handleUploadClick(id)}>Upload</Button>

				</section>
			),
		},
	];

	const { list = [], ...paginationData } = data || {};

	return {
		columns,
		addressModal,
		setAddressModal,
		list,
		paginationData,
		refetch,
		loading,
		setParams,

	};
};

export default useListEnrichment;
