import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useCreateShipmentAdditionalService from '../../../../hooks/useCreateShipmentAdditionalService';
import useUpdateShipmentAdditionalService from '../../../../hooks/useUpdateShipmentAdditionalService';

import ActionsToShow from './ActionToShow';
import BillToCustomer from './BillToCustomer';
import getPayload from './getPayload';
import getWhoIsAddingRate from './getWhoIsAddingRate';
import RenderAddRateForm from './RenderAddRateForm';
import SecondStep from './SecondStep';
import STAKE_HOLDER_SPECIFIC_PROPS from './stakeHolderCongifs';
import styles from './styles.module.css';

const SHOW_REMARKS_STATUS = [
	'amendment_requested_by_importer_exporter',
	'requested_for_service_provider',
	'cancelled_by_supplier',
	'cancelled',
	'disputed',
];

function AddRate({
	item = {},
	setAddRate = () => {},
	status = {},
	setAddSellPrice = () => {},
	refetch = () => {},
	onCancel = () => {},
	filters = {},
	setShowChargeCodes = () => {},
	source = '',
	isSeller = false,
	task = {},
	refetchServices = () => {},
}) {
	const [billToCustomer, setBillToCustomer] = useState(false);
	const [showSecondStep, setSecondStep] = useState(false);

	const refetchForUpdateSubService = () => {
		refetch();
		onCancel();
		refetchServices();
	};

	const updateResponse = useUpdateShipmentAdditionalService({
		item,
		task,
		refetch: refetchForUpdateSubService,
	});

	const whoIsAddingRate = getWhoIsAddingRate({
		isSeller,
		item,
		status,
	});

	const preProps = STAKE_HOLDER_SPECIFIC_PROPS[whoIsAddingRate];

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({ defaultValues: item });

	const afterAddRate = () => {
		setAddRate(false);
		setShowChargeCodes(false);
		setAddSellPrice(false);
		onCancel();
		refetch();
	};

	const {
		loading, apiTrigger: apiTriggerCreate,
	} = useCreateShipmentAdditionalService({
		refetch        : afterAddRate,
		successMessage : 'Successfully Added Additional Service',
	});

	const { handleAddSellPrice: apiTriggerUpdate } = useUpdateShipmentAdditionalService({ refetch: afterAddRate });

	const onAddRate = (data) => {
		const payload = getPayload(data, item, preProps, filters, billToCustomer);

		if (preProps.api === '/create_shipment_additional_service') {
			apiTriggerCreate(payload);
		} else {
			apiTriggerUpdate(payload);
		}
	};

	if (showSecondStep) {
		return (
			<SecondStep
				item={item}
				setSecondStep={setSecondStep}
				updateResponse={updateResponse}
				onCancel={onCancel}
			/>
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
		<div className={styles.container}>
			<div className={styles.heading}>
				{`${startCase(item?.name)} (${startCase(item?.service_type || item.service_type)})`}
			</div>

			{SHOW_REMARKS_STATUS.includes(status?.status) ? (
				<p className={styles.mt_8}>
					<strong> Comment:</strong>
					&nbsp;
					{item?.remarks[GLOBAL_CONSTANTS.zeroth_index]}
				</p>
			) : null}

			<RenderAddRateForm
				control={control}
				errors={errors}
				serviceData={item}
				source={source}
			/>

			<ActionsToShow
				setAddRate={setAddRate}
				onAddRate={onAddRate}
				handleSubmit={handleSubmit}
				status={status}
				updateResponse={updateResponse}
				loading={loading || updateResponse.loading}
				onCancel={onCancel}
				setAddSellPrice={setAddSellPrice}
				setSecondStep={setSecondStep}
			/>
		</div>
	);
}

export default AddRate;
