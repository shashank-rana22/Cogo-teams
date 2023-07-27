import { Button, Select } from '@cogoport/components';
import {
	InputController,
	useForm,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback } from 'react';

import services from '../../../../../../../configurations/service-options';
import useCreateShipmentCapacities from '../../../../../../../hooks/useCreateShipmentCapacities';

import styles from './styles.module.css';

function ShipmentCapacities(props) {
	const {
		agentExperienceSlabs = [], configId = '',
		setActiveItem = () => {}, data = {}, routeLoading = false,
	} = props;

	const { loading, createShipmentCapacities } = useCreateShipmentCapacities({ setActiveItem });

	const { control, formState: { errors }, handleSubmit, setValue, getValues } = useForm();

	const handleReset = useCallback(() => {
		const registeredFieldNames = Object.keys(getValues());

		registeredFieldNames.forEach((fieldName) => {
			setValue(fieldName, '');
		});
	}, [getValues, setValue]);

	useEffect(() => {
		if (isEmpty(data.shipment_capacities)) {
			handleReset();
			return;
		}

		const serviceWiseData = services?.map((service) => {
			const filteredData = data.shipment_capacities?.filter((item) => ((item.service_transit_type
				? `${item.service_type}-${item.service_transit_type}` : item.service_type) === service.value)) || [];

			return {
				service : service.value,
				data    : filteredData.sort((a, b) => a.slab_lower_limit - b.slab_lower_limit),
			};
		});

		serviceWiseData.forEach((item) => {
			const serviceValue = item.service;

			item.data.forEach((subItem, index) => {
				setValue(`${index}-${serviceValue}`, subItem.shipment_capacity);
			});
		});
	}, [data, handleReset, setValue]);

	return (
		<div key={loading} className={styles.container} id="shipment-capacities">

			<h4>
				Set Active Shipment Capacity per Agent
				{' '}
				<span>(all inputs need to be filled before proceeding)</span>
			</h4>

			<div className={styles.header_card}>
				<div className={styles.label}>Service</div>

				<div className={styles.exp_container}>
					<div className={styles.title}>Active Shipment Capacity per Agent/Month</div>

					<div className={styles.slab_details}>
						{agentExperienceSlabs.map((item) => {
							const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

							return (
								<div key={item.id} className={styles.item}>
									{slab_lower_limit}
									{(slab_upper_limit && slab_upper_limit != 99999) ? `-${slab_upper_limit} ` : ''}
									{' '}
									{slab_unit}
									s Exp.
								</div>
							);
						})}
					</div>
				</div>

				<div className={styles.trigger}>Release Trigger</div>

			</div>

			{services.map((service) => (
				<div className={styles.service_item} key={service.value}>

					<div className={styles.label}>{service.label}</div>

					<div className={styles.capacity_container} key={agentExperienceSlabs}>

						{[...Array(agentExperienceSlabs.length).keys()].map((key) => (

							<div
								key={`${service.value}${key}`}
								className={styles.capacity_input}
							>
								<InputController
									name={`${key}-${service.value}`}
									control={control}
									rules={{
										required: 'Required',
									}}
								/>

								{errors?.[`${key}-${service.value}`]?.message
							&& (
								<p className={styles.err_msg}>
									{errors?.[`${key}-${service.value}`]?.message}
								</p>
							)}

							</div>

						))}

					</div>

					<div className={styles.trigger}>
						<Select
							name={`${service.value}trigger`}
							options={[
								{
									label : 'Mark shipment as complete',
									value : 'trigger',
								},
							]}
							value="trigger"
							disabled
						/>
					</div>

				</div>
			))}

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.reset_btn}
					loading={loading || routeLoading}
					onClick={handleReset}
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="primary"
					loading={loading || routeLoading}
					onClick={handleSubmit((values) => createShipmentCapacities({
						values,
						agentExperienceSlabs,
						configId,
					}))}
				>
					Save And Proceed
				</Button>
			</div>

		</div>
	);
}

export default ShipmentCapacities;
