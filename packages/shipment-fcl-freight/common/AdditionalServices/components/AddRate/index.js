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
	const [showSecondStep, setShowSecondStep] = useState(false);

	const {
		onAddRate, register, handleSubmit, loading, errors, control, unitOptions,
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

	if (showSecondStep) {
		return (
			// <SecondStep
			// 	item={item}
			// 	status={status}
			// 	isSeller={isSeller}
			// 	setShowSecondStep={setShowSecondStep}
			// 	// updateResponse={updateResponse}
			// />
			<div>
				SecondStep
			</div>
		);
	}

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
		<div>
			<div className={styles.heading}>
				{startCase(item?.name)}
				dd
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
				register={register}
				item={item}
				unitOptions={unitOptions}
			/>

			<ActionsToShow
				setAddRate={setAddRate}
				onAddRate={onAddRate}
				handleSubmit={handleSubmit}
				status={status}
				setShowSecondStep={setShowSecondStep}
				updateResponse={updateResponse}
				loading={loading || updateResponse.loading}
				onCancel={() => onCancel()}
				setAddSellPrice={setAddSellPrice}
			/>
		</div>
	);
}

export default AddRate;
