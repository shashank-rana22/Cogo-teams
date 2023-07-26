import { Button, Accordion } from '@cogoport/components';
import { useForm, RadioGroupController } from '@cogoport/forms';
import React, { useEffect } from 'react';

import getElementController from '../../../../../configurations/getElementController';
import orgSubTypeOptions from '../../../../../configurations/org-subtype-options-mapping';

import getControls from './controls';
import styles from './styles.module.css';

const ACCORD_CONTENT = [{
	title   : 'Small Medium Enterprise',
	content : 'Agent = Booking Agent',
},
{
	title   : 'Channel Partner',
	content : 'PM = Portfolio Manager, CP User = Sales Agent, KAM = Booking Agent = Entity Manager',
},
{
	title   : 'Enterprise',
	content : 'Sales Agent = Sales Agent, KAM = C-KAM = Booking Agent',
}];

function SelectUsers({
	createCsdConfig = () => {},
	loading = false,
	data = {},
}) {
	const { control, formState:{ errors }, handleSubmit, watch, setValue = () => {} } = useForm();
	const { cogo_entity_id, config_type, organization_type, segment, organization_ids } = data;

	const orgType = watch('organization_type');
	const cogoEntityId = watch('cogo_entity_id');
	const reportingManagerIds = watch('reporting_managers');

	useEffect(() => {
		setValue('segment', undefined);
	}, [orgType, setValue]);

	useEffect(() => {
		setValue('cogo_entity_id', cogo_entity_id);
		setValue('config_type', config_type);
		setValue('organization_ids', organization_ids);
		setValue('organization_type', organization_type);
		setValue('segment', segment);
	}, [cogo_entity_id, config_type, organization_ids, organization_type, segment, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				{getControls({ cogoEntityId, reportingManagerIds })?.map((controlItem) => {
					const { type, label, name, showAstrick } = controlItem || {};

					const Element = getElementController(type);

					return (
						<div className={styles.control_item} key={name}>
							<div className={styles.label}>
								{label}
								{showAstrick && <sup className={styles.sup}>*</sup>}
							</div>

							<div>
								<Element
									control={control}
									{...controlItem}
									{...(name === 'segment' && { options: orgSubTypeOptions[orgType] })}
								/>
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}

			</div>

			<div className={styles.config_container}>
				<div className={styles.label}>
					Select Configuration Priority
					<sup className={styles.sup}>*</sup>
				</div>

				<RadioGroupController
					className={styles.instruction_input}
					control={control}
					size="sm"
					name="config_type"
					rules={{ required: 'This is required' }}
					options={[
						{
							name  : 'primary',
							value : 'primary',
							label : 'Override Current System Logic',
						},
						{
							name  : 'fallback',
							value : 'fallback',
							label : 'Fall Back Logic',
						},
					]}
				/>

				{errors.config_type && <div className={styles.error_msg}>This is required</div>}

			</div>

			<Accordion type="text" title="View Current System Logic" className={styles.accordion}>
				{ACCORD_CONTENT.map((item) => (
					<div className={styles.accord_item} key={item.title}>
						<div className={styles.title}>{item.title}</div>
						<div>{item.content}</div>
					</div>
				))}
			</Accordion>

			<Button
				size="md"
				themeType="primary"
				className={styles.btn}
				loading={loading}
				onClick={handleSubmit((values) => createCsdConfig({ values }))}
			>
				Save & Proceed
			</Button>
		</div>

	);
}

export default SelectUsers;
