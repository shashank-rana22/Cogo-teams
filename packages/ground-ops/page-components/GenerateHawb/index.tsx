/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Modal, Stepper, Breadcrumb } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import Layout from '../Air/commons/Layout';

import GenerateHawbDoc from './GenerateHawbDoc';
import hawbControls from './hawbControls';
import styles from './styles.module.css';
import useGenerateDocument from './useGenerateDocument';

const items = [
	{ title: 'Basic Details', key: 'basic' },
	{ title: 'Package & Charges Detail', key: 'package' },
	{ title: 'Handling Details', key: 'handling' },
];

function GenerateHAWB({ item = {}, task = {}, viewDoc = false }) {
	const [back, setBack] = useState(false);
	// const [openedHawbModal, setOpenHawbModal] = useState(1);
	// const [hawbDetails, setHawbDetails] = useState({ 0: item });
	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();

	const [activeKey, setActiveKey] = useState('basic');

	const shipment_id = item?.shipmentId;

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

	// multiple hawb
	// const handleAddHawb = () => {
	// 	// if (!openedHawbModal) {
	// 	// 	setOpenHawbModal(true);
	// 	// }
	// 	const noOfHawb = Object.keys(hawbDetails).length;
	// 	if (noOfHawb === openedHawbModal) {
	// 		setHawbDetails((prev) => ({ ...prev, [noOfHawb]: {} }));
	// 		setOpenHawbModal(noOfHawb);
	// 	}
	// };

	// single Hawb
	useEffect(() => {
		fields[activeKey].forEach((c) => {
			setValue(c.name, item[c.name]);
		});
	}, []);

	// multiple hawb
	// useEffect(() => {
	// 	fields[activeKey].forEach((c) => {
	// 		setValue(c.name, hawbDetails[openedHawbModal - 1][c.name]);
	// 	});
	// }, [openedHawbModal]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Add Export Details</div>
			<div>
				<Breadcrumb>
					<Breadcrumb.Item label={<a href="ground-ops">Ground Ops Dashboard</a>} />
					<Breadcrumb.Item label="Add Export Details" />
				</Breadcrumb>

				{/* <Button onClick={handleAddHawb}>Add Hawb</Button>
				<Button onClick={() => setOpenHawbModal(false)}>hide HAWB</Button> */}
			</div>
			{/* <div>
				<div>Hawb List</div>
				<div style={{ display: 'flex' }}>
					{Object.keys(hawbDetails).map((key, index) => (
						<Button onClick={() => setOpenHawbModal(index + 1)} themeType="secondary">
							Hawb
							{' '}
							{index + 1}
						</Button>
					))}

				</div>
			</div> */}
			{/* {openedHawbModal && ( */}
			<div className={styles.form_container}>

				<div style={{ display: 'flex' }}>
					<Stepper
						active={activeKey}
						setActive={setActiveKey}
						items={items}
					/>
				</div>

				{activeKey === 'basic'
						&& (
							<>
								<Layout fields={fields?.basic} control={control} errors={errors} />
								<div className={styles.button_container}>

									{!back ? (
										<div className={styles.button_div}>
											<Button
												onClick={handleSubmit(() => setActiveKey('package'))}
												disabled={documentLoading || generateLoading}
												themeType="accent"
											>
												NEXT
											</Button>
										</div>
									) : null}
								</div>
							</>
						)}

				{activeKey === 'package'
						&& (
							<>
								<Layout fields={fields?.package} control={control} errors={errors} />
								<div className={styles.button_container}>
									{!back ? (
										<div className={styles.button_div}>
											<Button
												onClick={() => setActiveKey('basic')}
												disabled={documentLoading || generateLoading}
												themeType="secondary"
												style={{ border: '1px solid #333' }}
											>
												BACK
											</Button>
											<Button
												onClick={handleSubmit(() => setActiveKey('handling'))}
												disabled={documentLoading || generateLoading}
												themeType="accent"
											>
												Next
											</Button>
										</div>
									) : null}
								</div>
							</>
						)}

				{activeKey === 'handling'
						&& (
							<>
								<Layout fields={fields?.handling} control={control} errors={errors} />
								<div className={styles.button_container}>
									{!back ? (
										<div className={styles.button_div}>
											<Button
												onClick={() => setActiveKey('package')}
												disabled={documentLoading || generateLoading}
												themeType="secondary"
												style={{ border: '1px solid #333' }}
											>
												BACK
											</Button>
											<Button
												onClick={handleSubmit(onSubmit)}
												disabled={documentLoading || generateLoading}
												themeType="accent"
											>
												{documentLoading || generateLoading
													? 'Generating'
													: 'Generate House Airway Bill'}
											</Button>
										</div>
									) : null}
								</div>
							</>
						)}
			</div>
			{/* )} */}

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

export default GenerateHAWB;
