// import { Button, Accordion, Tooltip } from '@cogoport/components';
// import { RadioGroupController, AsyncSelectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
// import React from 'react';

// import getElementController from '../configurations/getElementController';
// import { useScoringPlan } from '../hooks/useScoringPlan';

// import { getControls } from './controls';
import styles from './styles.module.css';

function CreateScoringPlan() {
	const router = useRouter();

	// const {
	// 	control = () => {},
	// 	errors = {},
	// 	// handleSubmit = () => {},
	// } = useScoringPlan();

	return (

		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => router.push('/performance-and-incentives/plans')}
				/>

				<div role="presentation" className={styles.title}>Create Scoring Plan</div>

			</div>

			{/* <div className={styles.container}>

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

			</div> */}

		</>

	);
}

export default CreateScoringPlan;
