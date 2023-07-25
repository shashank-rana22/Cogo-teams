import { Button } from '@cogoport/components';
import { RadioGroupController, useForm, useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
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

const EXPERIENCE_MAPPING = {
	default : DEFAULT_SLABS,
	custom  : [{ slab_unit: 'month', slab_lower_limit: '0', slab_upper_limit: '' }],
};

function SetConfiguration({ setActiveItem = () => {} }) {
	const router = useRouter();

	const [showForm, setShowForm] = useState(false);

	const configId = router?.query?.id;

	const { loading, createAgentExperienceSlabs } = useCreateAgentExperienceSlabs();

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'agent_experience_slabs',
	});

	const agentExperienceSlabs = watch('agent_experience_slabs');

	const defaultSlabUnit = agentExperienceSlabs?.[GLOBAL_CONSTANTS.zeroth_index]?.slab_unit;

	const experience = watch('experience');

	const handleClick = async () => {
		const { slab_upper_limit } = agentExperienceSlabs[agentExperienceSlabs.length - OFFSET];

		let slabUpperLimit = Number(slab_upper_limit) + OFFSET;

		if (fields.length === MAX_SLAB_INDEX) {
			slabUpperLimit = `${slabUpperLimit}+`;
		}

		if (validateSlabs({ experienceSlabs: agentExperienceSlabs })) {
			append({ slab_unit: defaultSlabUnit, slab_lower_limit: slabUpperLimit });
		}
	};

	useEffect(() => {
		setValue('agent_experience_slabs', EXPERIENCE_MAPPING[experience]);
	}, [experience, setValue]);

	useEffect(() => {
		setValue('experience', 'default');
	}, [setValue]);

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
									name  : 'default',
									value : 'default',
									label : 'Default Experience Slabs',
								},
								{
									name  : 'custom',
									value : 'custom',
									label : 'Custom Experience Slabs (4 Slabs Maximum)',
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
									/>

								</div>

								{index > GLOBAL_CONSTANTS.zeroth_index && experience !== 'default' && (
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

						{fields.length >= MAX_SLAB_LENGTH ? <div>Cannot Add More Slabs</div> : (
							<div
								role="presentation"
								className={styles.add_item_container}
								onClick={handleClick}
							>
								<IcMPlusInCircle height={16} width={16} className={styles.add_icon} />
								<div>Add Another Slab</div>
							</div>
						)}

						<Button
							size="md"
							themeType="primary"
							className={styles.btn}
							loading={loading}
							onClick={handleSubmit((values) => createAgentExperienceSlabs({
								values,
								configId,
								setShowForm,
							}))}
						>
							Save

						</Button>
					</div>
				</div>

			</div>

			{showForm && (
				<ShipmentCapacities
					agentExperienceSlabs={agentExperienceSlabs}
					configId={configId}
					setActiveItem={setActiveItem}
				/>
			)}

		</>

	);
}

export default SetConfiguration;
