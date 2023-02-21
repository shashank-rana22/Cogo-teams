/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import Layout from '../Air/commons/Layout';

import FieldArray from './FieldArray';
import GenerateMawbDoc from './GenerateMawbDoc';
import getElementController from './getController';
import mawbControls from './mawbControls';
import styles from './styles.module.css';
import useGenerateDocument from './useGenerateDocument';

function GenerateMAWB({ 	shipment_id = '', task = {}, viewDoc = false }) {
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
	const fields = mawbControls();

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
			<div className={styles.heading}>Generate MAWB</div>
			<div className={styles.form_container}>
				<Layout fields={fields} control={control} errors={errors} />
				<div className={styles.button_div}>
					{!back ? (
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={documentLoading || generateLoading}
						>
							{documentLoading || generateLoading
								? 'Generating'
								: 'Generate Master Airway Bill'}
						</Button>
					) : null}
				</div>

			</div>
			<div className={styles.file_container}>
				{(back || viewDoc) && (
					<Modal show={back || viewDoc} size="lg" className={styles.modal_container}>
						<Modal.Body style={{ minHeight: '720px' }}>
							<GenerateMawbDoc
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
							/>
						</Modal.Body>

					</Modal>
				)}
				{/* {(back || viewDoc) && (
					<GenerateMawbDoc
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

export default GenerateMAWB;
