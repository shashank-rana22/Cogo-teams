import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateShipmentAdditionalService from '../../../../hooks/useCreateShipmentAdditionalService';

import ActionsToShow from './ActionToShow';
import BillToCustomer from './BillToCustomer';
import RenderAddRateForm from './RenderAddRateForm';
import styles from './styles.module.css';

const showRemarksStatus = [
	'amendment_requested_by_importer_exporter',
	'requested_for_service_provider',
	'cancelled_by_supplier',
	'cancelled',
	'disputed',
];

function AddRate({
	item,
	isSeller = false,
	setAddRate,
	status,
	setAddSellPrice = () => {},
	refetch,
	onCancel = () => {},
	filters,
	updateResponse = () => {},
	setShowChargeCodes = () => {},
}) {
	const [billToCustomer, setBillToCustomer] = useState(false);

	const {
		onAddRate, handleSubmit, loading, errors, control, unitOptions,
	} = useCreateShipmentAdditionalService({
		item,
		isSeller,
		status,
		refetch,
		setAddRate,
		setShowChargeCodes,
		billToCustomer,
		setAddSellPrice,
		onCancel,
		filters,
	});

	if (
		status?.status === 'charges_incurred'
		&& !billToCustomer
		&& item.add_to_sell_quotation === null
	) {
		return (
			<BillToCustomer
				updateResponse={updateResponse}
				onCancel={() => setAddSellPrice(false)}
				onBillToCustomer={() => setBillToCustomer(true)}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{startCase(item?.name)}
				(
				{startCase(item?.service_type || item.service_type)}
				)
			</div>
			{showRemarksStatus.includes(status?.status) ? (
				<p>
					Comments:
					{item.remarks[0]}
				</p>
			) : null}
			<RenderAddRateForm
				handleSubmit={handleSubmit}
				onSubmit={onAddRate}
				control={control}
				errors={errors}
				serviceData={item}
				unitOptions={unitOptions}
			/>

			<ActionsToShow
				setAddRate={setAddRate}
				onAddRate={onAddRate}
				handleSubmit={handleSubmit}
				status={status}
				updateResponse={updateResponse}
				loading={loading || updateResponse.loading}
				onCancel={() => onCancel()}
				setAddSellPrice={setAddSellPrice}
			/>
		</div>
	);
}

export default AddRate;
