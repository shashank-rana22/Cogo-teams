import { Button, Accordion, Modal } from '@cogoport/components';
import { useForm, RadioGroupController, AsyncSelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState, useMemo } from 'react';

import getElementController from '../../../configurations/getElementController';
import orgSubTypeOptions from '../../../configurations/org-subtype-options-mapping';
import useCreateCssConfig from '../../../hooks/useCreateCcsConfig';
import useGetCcsConfigurations from '../../../hooks/useGetCcsConfigurations';

import { getControls, preferredRoleControls } from './controls';
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

function CreateConfig() {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const { id } = router.query;

	const { list = [], fetchList = () => {} } = useGetCcsConfigurations();

	const data = useMemo(() => list[GLOBAL_CONSTANTS.zeroth_index] || {}, [list]);

	const { loading, createCcsConfig } = useCreateCssConfig({ setShowModal });

	const { control, formState:{ errors }, handleSubmit, watch, setValue = () => {} } = useForm();

	const [orgType, cogoEntityId, reportingManagerIds, orgSubType] = watch(['organization_type',
		'cogo_entity_id', 'agent_id', 'segment']);

	useEffect(() => {
		if (!isEmpty(data)) {
			const {
				agent_id, booking_source, cogo_entity_id,
				config_type, organization_ids, organization_type, segment, preferred_role_id,
			} = data || {};

			setValue('cogo_entity_id', cogo_entity_id);
			setValue('config_type', config_type);
			setValue('organization_ids', organization_ids);
			setValue('organization_type', organization_type);
			setValue('segment', segment);
			setValue('agent_id', agent_id);
			setValue('booking_source', booking_source);
			setValue('preferred_role_id', preferred_role_id);
		}
	}, [data, setValue]);

	useEffect(() => {
		if (id) fetchList();
	}, [id, fetchList]);

	useEffect(() => {
		if (orgSubType) {
			const isValuePresent = orgSubTypeOptions[orgType].some((obj) => obj.value === orgSubType);
			if (!isValuePresent) setValue('segment', undefined);
		}
	}, [orgSubType, orgType, setValue]);

	return (

		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => router.push('/centralised-customer-service?activeTab=org_config')}
				/>

				<div role="presentation" className={styles.title}>Existing Configurations</div>

			</div>

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

				<div className={styles.role}>
					<div className={styles.label}>
						Select Role for CCS Config Pool
					</div>

					<AsyncSelectController
						control={control}
						{...preferredRoleControls}
					/>

				</div>

				{id ? (
					<Button
						type="button"
						loading={loading}
						className={styles.btn}
						onClick={handleSubmit((values) => createCcsConfig({ values }))}
					>
						Save
					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						className={styles.btn}
						loading={loading}
						onClick={handleSubmit(() => setShowModal(true))}
					>
						Activate Config.
					</Button>
				)}

			</div>

			{showModal && (
				<Modal
					size="md"
					show={showModal}
					onClose={() => setShowModal(false)}
					placement="center"
					showCloseIcon={false}
				>
					<Modal.Header
						title="Are you sure you want to activate this configuration?"
						style={{ textAlign: 'center' }}
					/>

					<Modal.Body>
						<div className={styles.btn_container}>
							<Button
								type="button"
								loading={loading}
								themeType="secondary"
								className={styles.cancel_btn}
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>

							<Button
								type="button"
								loading={loading}
								onClick={handleSubmit((values) => createCcsConfig({ values }))}
							>
								Activate
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>

	);
}

export default CreateConfig;
