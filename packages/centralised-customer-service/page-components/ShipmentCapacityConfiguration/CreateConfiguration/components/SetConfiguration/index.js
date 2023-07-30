import { Button } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle, IcMDelete, IcMAlert } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import useAgentExpSlabs from '../../../../../hooks/useAgentExpSlabs';

import BasicFields from './components/BasicFields';
import ShipmentCapacities from './components/ShipmentCapacities';
import SlabFields from './components/SlabFields';
import styles from './styles.module.css';

const OFFSET = 1;
const MAX_SLAB_LENGTH = 4;

function SetConfiguration({
	setActiveItem = () => {}, data = {},
	routeLoading = false, fetchList = () => {}, loading = false,
}) {
	const router = useRouter();

	const { id } = router.query;

	const [showForm, setShowForm] = useState(id);

	const {
		handleSubmit = () => {},
		errors = {},
		onSubmit = () => {},
		handleAdd = () => {},
		remove = () => {},
		createSlabsLoading = false,
		control = {},
		fields = [],
		experience = 'default',
		agentExperienceSlabs = [],
		defaultSlabUnit = 'month',
	} = useAgentExpSlabs({ data, fetchList, showForm, setShowForm, id });

	useEffect(() => {
		if (showForm) {
			const shipmentCapacitiesElement = document.getElementById('shipment-capacities');
			if (shipmentCapacitiesElement) {
				window.scrollTo({ top: shipmentCapacitiesElement.offsetTop, behavior: 'smooth' });
			}
		}
	}, [showForm]);

	return (
		<>
			<div className={styles.container}>
				<h4>SET CONFIGURATION</h4>
				<p>Create New Active Shipment Capacity per Agent (basis experience level)</p>
				<p>One may proceed to setting Shipment Capacity only after Setting Agent Experience Slabs</p>

				<div className={styles.experience_container}>

					<div className={styles.experience_details}>

						<BasicFields control={control} errors={errors} showForm={showForm} />

						<h3>Set Agent Experience</h3>

						{id ? (
							<div className={styles.warning_msg}>
								<IcMAlert className={styles.icon} />
								<div>Updating experience slabs will result in resetting shipment capacities.</div>
							</div>
						) : null}

						<RadioGroupController
							className={styles.exp_input}
							control={control}
							size="sm"
							name="experience"
							rules={{ required: 'This is required' }}
							options={[
								{
									name     : 'default',
									value    : 'default',
									label    : 'Default Experience Slabs',
									disabled : showForm,
								},
								{
									name     : 'custom',
									value    : 'custom',
									label    : 'Custom Experience Slabs (4 Slabs Maximum)',
									disabled : showForm,
								},
							]}
						/>

						{fields.map((field, index) => (

							<div className={styles.inner_container} key={field.id}>
								<div className={styles.element_container}>
									<SlabFields
										field={field}
										index={index}
										errors={errors}
										control={control}
										experience={experience}
										showForm={showForm}
										slabsLength={agentExperienceSlabs.length}
									/>

								</div>

								{!showForm && index === fields.length - OFFSET && index > GLOBAL_CONSTANTS.zeroth_index
									&& experience !== 'default' && (
										<div
											role="presentation"
											className={styles.delete_icon}
											onClick={() => remove(index)}
										>
											<IcMDelete height={20} width={20} />
										</div>
								)}

							</div>

						))}

						{!showForm && (fields.length >= MAX_SLAB_LENGTH ? <div>Cannot Add More Slabs</div> : (
							<div
								role="presentation"
								className={styles.add_item_container}
								onClick={handleAdd}
							>
								<IcMPlusInCircle height={16} width={16} className={styles.add_icon} />
								<div>Add Another Slab</div>
							</div>
						))}

						{showForm ? (
							<Button
								size="md"
								themeType="primary"
								className={styles.btn}
								loading={createSlabsLoading || routeLoading}
								onClick={() => setShowForm(false)}
							>
								Edit
							</Button>
						) : (
							<Button
								size="md"
								themeType="primary"
								className={styles.btn}
								loading={createSlabsLoading || routeLoading}
								onClick={handleSubmit(onSubmit)}
							>
								Save
							</Button>
						)}

					</div>
				</div>

			</div>

			{showForm && (
				<ShipmentCapacities
					agentExperienceSlabs={agentExperienceSlabs}
					setActiveItem={setActiveItem}
					data={data}
					routeLoading={routeLoading}
					loading={loading}
					defaultSlabUnit={defaultSlabUnit}
				/>
			)}

		</>

	);
}

export default SetConfiguration;
