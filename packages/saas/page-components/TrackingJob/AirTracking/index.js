import { Table, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import Layout from '../../../common/Layout';
import { columns } from '../configurations/air-tracking-columns';
import Form from '../FormAir/index';

import styles from './styles.module.css';

function AirTracking({
	loading = false,
	list,
	filters,
	setFilters,
}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });
	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item?.data });
	};
	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};
	const column = columns({
		handleShowModal,
	});

	return (
		<div>
			{/* <Layout control={control} controls={controls} /> */}
			<Table className={styles.styled_table} data={list || []} columns={column} loading={loading} />
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<div>
					<div>
						<Form
							// refetch={refetch}
							showUpdate={showUpdate}
							setShowUpdate={setShowUpdate}
						/>
					</div>
					<div>
						{/* <PriceDetail id={showUpdate?.data?.saas_air_subscription_id} /> */}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default AirTracking;
