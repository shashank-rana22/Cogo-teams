// import Layout from '@cogoport/bookings/commons/Layout';
import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import RenderAddRateForm from './RenderAddRateForm';

// import ActionsToShow from './ActionToShow';
// import BillToCustomer from './BillToCustomer';
// import SecondStep from './SecondStep';

import styles from './styles.module.css';
import useAddRate from './useAddRate';

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
	setShow,
	refetch,
	showLabel = true,
	shipment_data,
	onCancel = () => {},
	filters,
}) {
	const [billToCustomer, setBillToCustomer] = useState(undefined);
	const [showSecondStep, setSecondStep] = useState(false);

	const {
		onAddRate, register, handleSubmit, loading, errors, control,
	} = useAddRate({
		item,
		isSeller,
		status,
		setShow,
		refetch,
		setAddRate,
		billToCustomer,
		onCancel,
		filters,
	});

	if (showSecondStep) {
		return (
			// <SecondStep
			// 	item={item}
			// 	status={status}
			// 	isSeller={isSeller}
			// 	setSecondStep={setSecondStep}
			// 	// updateDatas={updateDatas}
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
			// <BillToCustomer
			// 	// updateDatas={updateDatas}
			// 	onCancel={() => setAddRate(null)}
			// 	onBillToCustomer={() => setBillToCustomer(true)}
			// />
			<div>
				BillToCustomer
			</div>
		);
	}

	return (
		<div>
			<div className={styles.container}>
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
				/>
			</div>

			{/* <ActionsToShow
				setAddRate={setAddRate}
				addRate={addRate}
				handleSubmit={handleSubmit}
				status={status}
				setSecondStep={setSecondStep}
				updateDatas={updateDatas}
				loading={loading || updateDatas.loading}
				onCancel={() => onCancel()}
			/> */}
		</div>
	);
}

export default AddRate;
