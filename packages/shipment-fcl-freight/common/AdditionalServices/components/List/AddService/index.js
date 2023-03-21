import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import EmptyState from '../../../../EmptyState';
import AddRate from '../../AddRate';

import ChooseService from './ChooseService';
import styles from './styles.module.css';
import useListServiceChargeCodes from './useListServiceChargeCodes';
import ViewPrice from './ViewPrice';

function AddService({
	shipment_id,
	services,
	isSeller,
	refetch = () => {},
	show = false,
	showChargeCodes = false,
	setShowChargeCodes = () => {},
}) {
	const [showAddRate, setAddRate] = useState(null);
	const [showPrice, setShowPrice] = useState(null);

	const { list, loading, setFilters, filters, serviceCountTotal } = useListServiceChargeCodes({
		shipment_id,
		services,
		show,
		isSeller,
	});

	if (!list?.length && !loading) {
		<EmptyState />;
	}

	return (
		<Modal
			size="xl"
			show={showChargeCodes}
			onClose={() => setShowChargeCodes(false)}
			placement="top"
			className={styles.modal_container}
		>
			<Modal.Header title="ADD NEW SERVICE" />
			<Modal.Body>
				<div className={styles.container}>
					{!showAddRate && !showPrice ? (
						<ChooseService
							setAddRate={setAddRate}
							isSeller={isSeller}
							list={list}
							loading={loading}
							setFilters={setFilters}
							filters={filters}
							setShowPrice={setShowPrice}
							serviceCountTotal={serviceCountTotal}
							services={services}
							refetch={refetch}
							setShowChargeCodes={setShowChargeCodes}
						/>
					) : null}
					{showAddRate ? (
						<AddRate
							isSeller={isSeller}
							item={showAddRate}
							setAddRate={setAddRate}
							setShow={setShow}
							refetch={refetch}
							filters={filters}
						/>
					) : null}
					{!showAddRate && showPrice ? (
						<ViewPrice
							showPrice={showPrice}
							setAddRate={setAddRate}
							setShowPrice={setShowPrice}

						/>
					) : null}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AddService;
