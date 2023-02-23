import { Button } from '@cogoport/components';
import { useState } from 'react';

// import { format } from '@cogoport/utils/';
import styles from '../styles.module.css';

const useListEnrichment = () => {
	const [addressModal, setAddressModal] = useState({
		showModal   : false,
		addressData : '',
	});

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
			accessor : () => (
				<section>
					<Button themeType="secondary" size="sm">Upload</Button>

				</section>
			),
		},
	];

	return {
		columns,
		addressModal,
		setAddressModal,
		// data,
		// loading,
	};
};

export default useListEnrichment;
