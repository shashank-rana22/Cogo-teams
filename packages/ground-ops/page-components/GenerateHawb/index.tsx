/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import FieldArray from './FieldArray';
import GenerateHawbDoc from './GenerateHawbDoc';
import getElementController from './getController';
import hawbControls from './hawbControls';
import styles from './styles.module.css';
import useGenerateDocument from './useGenerateDocument';

function GenerateHawb({ shipment_id = '', task = {}, viewDoc = false }) {
	const [back, setBack] = useState(false);
	const { control, watch, handleSubmit, formState: { errors } } = useForm();

	const {
		documentList,
		pendingTaskLoading,
		documentLoading,
		generateLoading,
		certificateData,
		completeTask,
		generateCertificate,
	} = useGenerateDocument({
		shipment_id,
		task,
		// refetch,
		// clearTask,
	});
	const fields = hawbControls();

	const onSubmit = () => {
		generateCertificate();
		setBack(true);
	};

	const formValues = watch();
	const form_data = {
		agent_name: null,
		...formValues,
	};

	return (
		<div>
			<div className={styles.heading}>Generate HAWB</div>
			<div className={styles.form_container}>
				<div className={styles.flex}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.content}>
							{fields.map((field) => {
								const { ...rest } = field;

								if (rest.type === 'fieldArray') {
									return (
										<div className={styles.list}>
											<h4>{field.label}</h4>
											<FieldArray {...rest} control={control} />
										</div>
									);
								}
								const Element = getElementController(rest.type);
								return (
									<div className={styles.list}>
										<h4>{field.label}</h4>
										<Element
											width="100%"
											control={control}
											{...rest}
										/>
										<div className={styles.error}>{errors[field.name]?.message}</div>
									</div>
								);
							})}
						</div>
						<div className={styles.button_div}>
							{!back ? (
								<Button
									onClick={handleSubmit(onSubmit)}
									disabled={documentLoading || generateLoading}

								>
									{documentLoading || generateLoading
										? 'Generating'
										: 'Generate House Airway Bill'}
								</Button>
							) : null}
						</div>
					</form>
				</div>

			</div>
			<div className={styles.file_container}>
				{(back || viewDoc) && (
					<Modal show={back || viewDoc} size="lg" className={styles.modal_container}>
						<Modal.Body style={{ minHeight: '720px' }}>
							<GenerateHawbDoc
								// shipment_data={shipment_data}
								completeTask={completeTask}
								task={task}
								viewDoc={viewDoc}
								// details={details}
								// setIsAmended={setIsAmended}
								// isAmended={isAmended}
								formData={form_data}
								setBack={setBack}
								back={back}
								isAmended={undefined}
								primary_service={undefined}
							/>
						</Modal.Body>

					</Modal>
				)}
				{/* {(back || viewDoc) && (
					<GenerateHawbDoc
						// shipment_data={shipment_data}
						completeTask={completeTask}
						task={task}
						viewDoc={viewDoc}
						// details={details}
						// setIsAmended={setIsAmended}
						// isAmended={isAmended}
						formData={form_data}
						setBack={setBack}
						back={back}
						// primary_service={primary_service}
					/>
				)} */}
			</div>
		</div>
	);
}

export default GenerateHawb;
