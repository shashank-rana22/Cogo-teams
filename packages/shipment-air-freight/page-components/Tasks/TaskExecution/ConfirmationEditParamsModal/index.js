/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import controls from './configs/controls';
import ConfirmModal from './ConfirmModal';
import useUpdateInternationalAirShipmentBookingParameter
	from './hooks/useUpdateInternationalAirShipmentBookingParameter';
import styles from './styles.module.css';
import calculateParameter from './utils/calculateParameter';

const VOLUMETRIC_WEIGHT = 166.67;
function ConfirmationEditParamsModal({
	shipment_data = {},
	services = [],
	setUpdateModal = () => {},
	setShowEditParamsModal = () => {},
	task,
}) {
	const [showModal, setShowModal] = useState(false);

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ controls });

	const { loading = false, updateBookingParameter } =	useUpdateInternationalAirShipmentBookingParameter({
		services,
		shipment_data,
		setShowEditParamsModal,
		task,
	});

	const formValues = watch('packages');
	const formTotalVolume = Number(watch('volume'));
	const formTotalWeight = Number(watch('weight'));

	const handleOnClick = async () => {
		await handleSubmit((values) => {
			updateBookingParameter(values);
		})();
		setUpdateModal(false);
		setShowModal(false);
	};

	useEffect(() => {
		setValue('packages', shipment_data?.packages);
		setValue('chargeable_weight', shipment_data?.chargeable_weight);
	}, []);

	useEffect(() => {
		const { weight, volume, packages_count } = calculateParameter(formValues);

		const formVolume = volume || shipment_data?.volume;

		const formWeight = weight || shipment_data?.weight;

		const formPackageCount = packages_count || shipment_data?.packages_count;

		setValue('volume', formVolume);
		setValue('weight', formWeight);
		setValue('packages_count', formPackageCount);
	}, [JSON.stringify(formValues)]);

	useEffect(() => {
		if (task === 'confirm_booking') {
			setValue('chargeable_weigh', Math.max(formTotalWeight, VOLUMETRIC_WEIGHT * formTotalVolume)
			|| shipment_data?.chargeable_weight);
		}
	}, [JSON.stringify(formTotalVolume), JSON.stringify(formTotalWeight)]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Update Details</div>
			<div className={styles.sub_heading}>Please confirm booking details</div>
			<div className={styles.layout_container}>
				<Layout fields={controls} errors={errors} control={control} />
			</div>
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(() => setShowModal(true))}
					disabled={loading}
				>
					Update
				</Button>
			</div>
			<Modal show={showModal} closable={false} size="md">
				<ConfirmModal
					task={task}
					setShowModal={setShowModal}
					handleOnClick={handleOnClick}
					loading={loading}
					setUpdateModal={setUpdateModal}
				/>
			</Modal>
		</div>
	);
}

export default ConfirmationEditParamsModal;
