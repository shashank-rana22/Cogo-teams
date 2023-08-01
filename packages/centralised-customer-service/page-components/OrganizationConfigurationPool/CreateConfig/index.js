import { Button, Accordion, Modal, Tooltip } from '@cogoport/components';
import { RadioGroupController, AsyncSelectController } from '@cogoport/forms';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import getElementController from '../../../configurations/getElementController';
import orgSubTypeOptions from '../../../configurations/org-subtype-options-mapping';
import { useCreateConfig } from '../../../hooks/useCreateConfig';

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
	const { id } = router.query;

	const {
		control = () => {},
		errors = {},
		handleSubmit = () => {},
		showModal = false,
		setShowModal = () => {},
		loading = false,
		createCcsConfig = () => {},
		orgType = '',
		cogoEntityId = '',
		reportingManagerIds = '',
		isInputDisabled = () => {},
	} = useCreateConfig({ id });

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
					{getControls({ cogoEntityId, reportingManagerIds }).map((controlItem) => {
						const { type, label, name, showAstrick } = controlItem || {};

						const Element = getElementController(type);

						return (
							<div className={styles.control_item} key={name}>
								<div className={styles.label}>
									{label}
									{showAstrick && <sup className={styles.sup}>*</sup>}

									{name === 'segment' ? (
										<div style={{ width: 'fit-content' }}>
											<Tooltip
												className={styles.word_break}
												content="Org Sub-Type or Segment is taken from
													lead organisation table where source=platform"
												placement="top"
												maxWidth={400}
											>
												<IcMInfo height={16} className={styles.info_icon} color="red" />
											</Tooltip>
										</div>
									) : null}

								</div>

								<div>
									<Element
										control={control}
										{...controlItem}
										{...(name === 'segment' && { options: orgSubTypeOptions[orgType] || [] })}
										disabled={isInputDisabled(name)}
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

					{errors.config_type ? <div className={styles.error_msg}>This is required</div> : null}

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
