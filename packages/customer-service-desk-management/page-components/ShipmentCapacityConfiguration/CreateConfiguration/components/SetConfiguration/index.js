import { Button } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import useAgentExpSlabs from '../../../../../hooks/useAgentExpSlabs';

import ShipmentCapacities from './components/ShipmentCapacities';
import SlabFields from './components/SlabFields';
import styles from './styles.module.css';

const MAX_SLAB_LENGTH = 4;

function SetConfiguration({
	setActiveItem = () => {}, data = {},
	routeLoading = false, fetchList = () => {}, loading = false,
}) {
	const router = useRouter();

	const { mode = '', id:configId, stage } = router.query;

	const isEditMode = mode === 'edit';

	const [showForm, setShowForm] = useState(isEditMode || stage);

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
	} = useAgentExpSlabs({ data, fetchList, showForm, setShowForm, isEditMode, stage, configId });

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
					<h4>Set Agent Experience</h4>

					<div className={styles.experience_details}>

						<RadioGroupController
							className={styles.instruction_input}
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

								{!showForm && index > GLOBAL_CONSTANTS.zeroth_index && experience !== 'default' && (
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

						<Button
							size="md"
							themeType="primary"
							className={styles.btn}
							loading={createSlabsLoading || routeLoading}
							onClick={handleSubmit(onSubmit)}
						>
							{showForm ? 'Edit' : 'Save'}
						</Button>

					</div>
				</div>

			</div>

			{showForm && (
				<ShipmentCapacities
					agentExperienceSlabs={agentExperienceSlabs}
					configId={configId}
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
