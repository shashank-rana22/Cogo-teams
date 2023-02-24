import { Button, Modal, Stepper, Breadcrumb } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import Layout from '../Air/commons/Layout';

import GenerateMawbDoc from './GenerateMawbDoc';
import mawbControls from './mawbControls';
import styles from './styles.module.css';
import useGenerateDocument from './useGenerateDocument';

const items = [
	{ title: 'Basic Details', key: 'basic' },
	{ title: 'Package & Charges Detail', key: 'package' },
	{ title: 'Handling Details', key: 'handling' },
];

interface Props {
	viewDoc?: boolean;
	setViewDoc?: any;
	item?: any;
	edit?: boolean;
	setEdit?: any;
}

function GenerateMAWB({ viewDoc = false, setViewDoc = () => {}, item = {}, edit = false, setEdit = () => {} }:Props) {
	const [back, setBack] = useState(false);
	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();

	const [activeKey, setActiveKey] = useState('basic');

	const shipmentId = item?.shipment_id;

	const {
		documentLoading,
		generateCertificate,
	} = useGenerateDocument({
		shipmentId,
	});
	const fields = mawbControls();

	const onSubmit = () => {
		generateCertificate();
		setBack(true);
	};

	const formValues = watch();
	const formData = {
		agent_name: null,
		...formValues,
	};

	const taskItem = { ...item, ...item.documentData };

	const finalFields = [
		...fields.basic,
		...fields.package,
		...fields.handling,
	];

	useEffect(() => {
		finalFields.forEach((c) => {
			setValue(c.name, taskItem[c.name]);
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			{!viewDoc
			&& (
				<>
					<div className={styles.heading}>Add Export Details</div>
					<Breadcrumb>
						<Breadcrumb.Item label={<a href="ground-ops">Ground Ops Dashboard</a>} />
						<Breadcrumb.Item label="Add Export Details" />
					</Breadcrumb>
				</>
			)}
			{!viewDoc
			&& (
				<div className={styles.form_container}>

					<Stepper
						active={activeKey}
						setActive={setActiveKey}
						items={items}
					/>

					{activeKey === 'basic'
				&& (
					<>
						<Layout fields={fields?.basic} control={control} errors={errors} />
						<div className={styles.button_container}>

							{!back ? (
								<div className={styles.button_div}>
									<Button
										onClick={handleSubmit(() => setActiveKey('package'))}
										disabled={documentLoading}
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
										disabled={documentLoading}
										themeType="secondary"
										style={{ border: '1px solid #333' }}
									>
										BACK
									</Button>
									<Button
										onClick={handleSubmit(() => setActiveKey('handling'))}
										disabled={documentLoading}
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
										disabled={documentLoading}
										themeType="secondary"
										style={{ border: '1px solid #333' }}
									>
										BACK
									</Button>
									<Button
										onClick={handleSubmit(onSubmit)}
										disabled={documentLoading}
										themeType="accent"
									>
										{documentLoading
											? 'Generating'
											: 'Generate Master Airway Bill'}
									</Button>
								</div>
							) : null}
						</div>
					</>
				)}
				</div>
			)}

			<div className={styles.file_container}>
				{(back || viewDoc) && (
					<Modal
						show={back || viewDoc}
						onClose={() => { setBack(false); setViewDoc(false); }}
						size="lg"
						className={styles.modal_container}
						style={{ width: '900px' }}
					>
						<Modal.Body style={{ minHeight: '720px' }}>
							<GenerateMawbDoc
								taskItem={taskItem}
								formData={formData}
								setBack={setBack}
								back={back}
								edit={edit}
								setEdit={setEdit}
								viewDoc={viewDoc}
							/>
						</Modal.Body>

					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
