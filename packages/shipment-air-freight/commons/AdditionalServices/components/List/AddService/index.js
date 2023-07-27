import EmptyState from '@cogoport/air-modules/common/EmptyState';
import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListServiceChargeCodes from '../../../../../hooks/useListServiceChargeCodes';
import AddRate from '../../AddRate';

import ChooseService from './ChooseService';
import styles from './styles.module.css';
import ViewPrice from './ViewPrice';

function AddService({
	shipmentId: shipment_id,
	services,
	isSeller,
	refetch = () => {},
	closeModal = () => {},
}) {
	const [showAddRate, setAddRate] = useState(null);
	const [showPrice, setShowPrice] = useState(null);
	const [filters, setFilters] = useState({
		name         : undefined,
		service_type : undefined,
	});

	const { list, loading } = useListServiceChargeCodes({ defaultFilters: { shipment_id } });

	let finalList = (list || []).map((item) => ({
		...item,
		shipment_id,
		services,
		isSeller,
		name: `${item?.code} ${startCase(item?.name)}`,
	}));

	if (filters.name) {
		finalList = finalList.filter((item) => item.name.toLowerCase().includes(filters.name.toLowerCase()));
	}

	if (filters.service_type) {
		finalList = finalList.filter((item) => {
			if (filters.service_type?.includes('?')) {
				return item.service_type === filters.service_type?.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
			}
			return item.service_type === filters.service_type;
		});
	}

	if (!list?.length && !loading) {
		<EmptyState />;
	}

	return (
		<Modal
			size="xl"
			show
			onClose={closeModal}
			className={styles.modal_container}
			closeOnOuterClick={false}
		>
			<Modal.Header title="ADD NEW SERVICE" />

			<Modal.Body>
				<div className={styles.container}>
					{!showAddRate && !showPrice ? (
						<ChooseService
							setAddRate={setAddRate}
							isSeller={isSeller}
							list={finalList}
							loading={loading}
							setFilters={(values) => setFilters({ ...filters, ...values })}
							filters={filters}
							setShowPrice={setShowPrice}
							serviceCountTotal={finalList?.length}
							services={services}
							refetch={refetch}
							closeModal={closeModal}
						/>
					) : null}

					{showAddRate ? (
						<AddRate
							isSeller={isSeller}
							item={showAddRate}
							setAddRate={setAddRate}
							closeModal={closeModal}
							refetch={refetch}
							filters={filters}
							source="overview"
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
