import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { InputController, SelectController, useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization } from '@cogoport/forms/utils/getAsyncFields';
import { merge, isEmpty } from '@cogoport/utils';
import React, { useContext } from 'react';

import useUpdateShipmentService from '../../../../hooks/useUpdateShipmentService';

import styles from './styles.module.css';

const BL_CATEGORY_OPTIONS = [
	{ label: 'Mbl', value: 'mbl' },
	{ label: 'Hbl', value: 'hbl' },
];

const serviceProviderInitalControl = {
	name        : 'service_provider_id',
	label       : 'Service provider',
	type        : 'select',
	span        : 8,
	placeholder : 'Select Service Provider',
	rules       : { required: 'Service Provider is required' },
};

function SupplierReallocation({
	serviceData = [],
	setShow = () => {},
	show = false,
	isAdditional = false,
	refetchServices = () => {},
}) {
	const { shipment_data, refetch } = useContext(ShipmentDetailContext);

	const { handleSubmit, control, formState: { errors }, reset } = useForm();

	const afterUpdateRefetch = () => {
		reset();
		refetch();
		refetchServices();
		setShow(false);
	};
	const {
		apiTrigger, loading,
	} = useUpdateShipmentService({
		refetch        : afterUpdateRefetch,
		successMessage : 'Service updated successfully',
	});

	const onUpdate = (values) => {
		const payload = {
			ids                 : serviceData?.map((item) => item?.id),
			data                : { ...values },
			service_type        : serviceData?.[0]?.service_type,
			performed_by_org_id : serviceData?.[0]?.importer_exporter_id,
		};
		apiTrigger(payload);
	};

	const { documents } = shipment_data || {};

	const serviceProviderEmbededOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganization(), {
			params: {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					service      : serviceData?.[0]?.service_type?.split('_', 2)?.join('_'),
				},
			},
		}),
	);

	const newServiceProviderControl = { ...serviceProviderInitalControl, ...serviceProviderEmbededOptions };

	const serviceProviderController = (
		<div>
			<div className={styles.label}>
				Service Provider
			</div>
			<SelectController
				{...newServiceProviderControl}
				name="service_provider_id"
				control={control}
				errors={errors}
			/>
			{errors.service_provider_id && (
				<span className={styles.errors}>
					{errors.service_provider_id.message}
				</span>
			)}
		</div>
	);

	return (
		<Modal
			show={show}
			onClose={() => setShow(false)}
			className={styles.styled_modal_container}
		>
			<Modal.Body>
				<Modal.Header title={(
					<div className={styles.header}>
						{!isAdditional ? 'Edit Parameters' : 'Supplier Reallocation'}
					</div>
				)}
				/>

				{
					(isEmpty(documents) && !isAdditional)
						? (
							<div className={styles.form_wrapper}>
								{serviceProviderController}
								<div>
									<div className={styles.label}>
										BL Count
									</div>
									<InputController
										control={control}
										name="bls_count"
										type="number"
										value={serviceData?.[0]?.bls_count}
										span={8}
										placeholder="Enter BL Count"
										rules={{ required: 'BL Count required' }}
									/>
									{errors.bls_count && (
										<span className={styles.errors}>
											{errors.bls_count.message}
										</span>
									)}
								</div>

								<div>
									<div className={styles.label}>
										Bl Category
									</div>
									<SelectController
										control={control}
										name="bl_category"
										type="select"
										options={BL_CATEGORY_OPTIONS}
										value={serviceData?.[0]?.bl_category}
										span={8}
										placeholder="Enter Bl Category"
										rules={{ required: 'BL Category is required' }}
										className={styles.hello}
									/>
									{errors.bl_category && (
										<span className={styles.errors}>
											{errors.bl_category.message}
										</span>
									)}
								</div>
							</div>
						)
						: (
							<div className={styles.form_wrapper}>
								{serviceProviderController}
							</div>
						)
				}

				<div className={styles.button_container}>
					<Button
						className="reviewed"
						onClick={handleSubmit(onUpdate)}
						disabled={loading}
					>
						Update
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default SupplierReallocation;
