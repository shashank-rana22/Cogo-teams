import { useForm } from '@cogoport/forms';
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
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const afterAddRate = () => {
		setAddRate(false);
		setShowChargeCodes(false);
		setAddSellPrice(false);
		onCancel();
		refetch();
	};

	const {
		loading, apiTrigger,
	} = useCreateShipmentAdditionalService({
		refetch        : afterAddRate,
		successMessage : 'Successfully Added Additional Service',
	});

	const onAddRate = (data) => {
		const addedService = (item.services || []).find((service) => {
			if (filters?.service_type?.includes('?')) {
				return service.id === filters?.service_type?.split('?')?.[1];
			}
			return service.service_type === item?.service_type;
		});

		const { name, code, shipment_id, service_type, pending_task_id } = item;
		const { quantity, buy_price, currency, unit, service_provider_id, alias, price } = data;

		const payload = {
			name,
			code,
			shipment_id,
			service_type,
			service_id            : addedService?.id,
			is_rate_available     : true,
			quantity              : Number(quantity) || undefined,
			buy_price             : Number(buy_price) || undefined,
			currency,
			unit,
			price                 : Number(price) || undefined,
			service_provider_id   : service_provider_id || undefined,
			pending_task_id       : pending_task_id || undefined,
			add_to_sell_quotation : true,
			alias                 : alias || undefined,
		};

		apiTrigger(payload);
	};

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
