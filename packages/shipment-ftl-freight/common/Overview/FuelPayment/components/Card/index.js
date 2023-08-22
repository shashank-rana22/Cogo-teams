import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { cardControls } from '../../configs/cardControls';
import useCreateFuelPayment from '../../hooks/useCreateFuelPayment';
import useFillformValues from '../../hooks/useFillFormValues';
import { detailColumns } from '../../utils/detailColumns';
import CardModal from '../CardModal';

import styles from './styles.module.css';

function Card({
	service = {},
	getFuelPayment = () => {},
	dataGetFuelPayment = {},
	collectionPartiesData = {},
	shipment_data = {},
}) {
	const [showModal, setShowModal] = useState(false);

	const {
		control,
		formState:{ errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm();

	const formValues = watch();

	const {
		createFuelPayment,
		loading: loadingFuelPayment,
	} = useCreateFuelPayment({ shipment_data, callback: getFuelPayment });

	const { fuelPaymentItem, disableButton, submitForm } = useFillformValues({
		collectionPartiesData,
		service,
		dataGetFuelPayment,
		setValue,
		formValues,
		setShowModal,
	});

	const details = detailColumns({ fuelPaymentItem, service });

	return (
		<div className={styles.card_container}>
			{!isEmpty(fuelPaymentItem) ? (
				<div className={styles.detail_container}>
					{details.map((item) => (
						<div key={item?.key} className={styles.detail_column}>
							<div className={styles.detail_label}>{item?.label}</div>
							<div>{item?.value || '-'}</div>
						</div>
					))}
				</div>
			) : (
				<div>
					<Layout
						control={control}
						fields={cardControls}
						errors={errors}
					/>
					<div className={styles.button_wrapper}>
						<div>
							<sup className={styles.asterisk_mark}>*</sup>
							Please add Fuel Split in Confirmation on Booking with service
							provider task to get Fuel Amount
						</div>
						<Button
							themeType="primary"
							size="md"
							onClick={handleSubmit(submitForm)}
							disabled={disableButton && false}
						>
							Trigger Payment

						</Button>
					</div>
				</div>
			) }

			{showModal ? (
				<CardModal
					createFuelPayment={createFuelPayment}
					fuelPaymentItem={fuelPaymentItem}
					formValues={formValues}
					showModal={showModal}
					setShowModal={setShowModal}
					service={service}
					handleSubmit={handleSubmit}
					loadingFuelPayment={loadingFuelPayment}
				/>
			) : null}
		</div>
	);
}

export default Card;
