import { Button } from '@cogoport/components';
import { RadioGroupController, useForm, useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import DEFAULT_SLABS from '../../../../../configurations/defaultExperienceSlabs';
import useCreateAgentExperienceSlabs from '../../../../../hooks/useCreateAgentExperienceSlabs';
import { validateSlabs } from '../../../../../utils/validateSlabs';

import ShipmentCapacities from './components/ShipmentCapacities';
import SlabFields from './components/SlabFields';
import styles from './styles.module.css';

const OFFSET = 1;
const MAX_SLAB_INDEX = 3;
const MAX_SLAB_LENGTH = 4;

const getSlabs = ({ isEditMode = false, data = {} }) => {
	if (isEditMode || !isEmpty(data.agent_experience_slabs)) {
		return data.agent_experience_slabs?.map((item, index) => {
			const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

			return {
				slab_unit,
				slab_lower_limit: index === 3 ? `${slab_lower_limit}+` : slab_lower_limit || '0',
				slab_upper_limit,
			};
		});
	}
	return DEFAULT_SLABS;
};

function SetConfiguration({ setActiveItem = () => {}, data = {}, routeLoading = false, fetchList = () => {} }) {
	const router = useRouter();

	const { mode = '', id:configId, stage } = router.query;

	const isEditMode = mode === 'edit';

	const [showForm, setShowForm] = useState(isEditMode || stage);

	const agentExpSlabs = data?.agent_experience_slabs || [];

	const { loading, createAgentExperienceSlabs } = useCreateAgentExperienceSlabs({
		isEditMode,
		fetchList,
		agentExpSlabs,
	});

	const { control, formState: { errors }, handleSubmit, watch, setValue, trigger } = useForm({
		defaultValues: {
			experience: isEditMode ? 'custom' : 'default',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'agent_experience_slabs',
	});

	const agentExperienceSlabs = watch('agent_experience_slabs');

	const defaultSlabUnit = agentExperienceSlabs?.[GLOBAL_CONSTANTS.zeroth_index]?.slab_unit;

	const experience = watch('experience');

	const handleAdd = async () => {
		const { slab_upper_limit } = agentExperienceSlabs[agentExperienceSlabs.length - OFFSET];

		let slabUpperLimit = Number(slab_upper_limit);

		if (fields.length === MAX_SLAB_INDEX) {
			slabUpperLimit = `${slabUpperLimit}+`;
		}

		if (validateSlabs({ experienceSlabs: agentExperienceSlabs })) {
			append({ slab_unit: defaultSlabUnit, slab_lower_limit: slabUpperLimit });
		}
	};

	const onSubmit = async (values) => {
		if (!showForm) {
			createAgentExperienceSlabs({
				values,
				configId,
				setShowForm,
			});
		} else setShowForm(false);
	};

	useEffect(() => {
		if (showForm) {
			window.scrollTo({ top: document.getElementById('shipment-capacities').offsetTop, behavior: 'smooth' });
		}
	}, [showForm]);

	useEffect(() => {
		setValue('agent_experience_slabs', getSlabs({ experience, isEditMode, data }));
	}, [data, experience, isEditMode, setValue]);

	useEffect(() => {
		if (stage) fetchList();
	}, [fetchList, stage]);

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
							loading={loading || routeLoading}
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
				/>
			)}

		</>

	);
}

export default SetConfiguration;
