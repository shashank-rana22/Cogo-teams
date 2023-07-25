import { Button, Select } from '@cogoport/components';
import {
	InputController,
	useForm,
} from '@cogoport/forms';
import React from 'react';

import services from '../../../../../../../configurations/service-options';
import useCreateShipmentCapacities from '../../../../../../../hooks/useCreateShipmentCapacities';

import styles from './styles.module.css';

function ShipmentCapacities({ agentExperienceSlabs = [], configId = '', setActiveItem = () => {} }) {
	const { loading, createShipmentCapacities } = useCreateShipmentCapacities({ setActiveItem });

	const { control, formState: { errors }, handleSubmit, setValue, getValues, watch, reset } = useForm();

	return (
		<div className={styles.container}>

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
									{slab_upper_limit ? `-${slab_upper_limit} ` : ''}
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

					<div className={styles.capacity_container}>

						{[...Array(agentExperienceSlabs.length).keys()].map((key) => (

							<div
								key={key}
								className={styles.capacity_input}
							>
								<InputController
									name={`${service.value}${key}`}
									control={control}
									rules={{
										required: 'Required',
									}}
								/>

								{errors?.[`${service.value}${key}`]?.message
							&& (
								<p className={styles.err_msg}>
									{errors?.[`${service.value}${key}`]?.message}
								</p>
							)}

							</div>

						))}

					</div>

					<div className={styles.trigger}>
						<Select
							name={`${service.value}trigger`}
						/>
					</div>

				</div>
			))}

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.reset_btn}
					loading={loading}
					onClick={() => reset()}
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="primary"
					loading={loading}
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
