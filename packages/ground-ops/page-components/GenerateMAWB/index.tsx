import { Button, Modal, Stepper, Breadcrumb } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import Layout from '../Air/commons/Layout';

import GenerateMawbDoc from './GenerateMawbDoc';
import mawbControls from './mawbControls';
import styles from './styles.module.css';

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
	setGenerate?:any;
}

function GenerateMAWB({
	viewDoc = false,
	setViewDoc = () => {},
	item = {},
	edit = false,
	setEdit = () => {},
	setGenerate = () => {},
}:Props) {
	const [back, setBack] = useState(false);
	const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm();

	const [activeKey, setActiveKey] = useState('basic');

	const fields = mawbControls();

	const onSubmit = () => {
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

	const chargeableWt:any = (Math.max(
		formValues.weight,
		taskItem.volume * 166.67,
	).toFixed(2));

	const chargeableWeight = chargeableWt * formValues.packageCount;

	useEffect(() => {
		finalFields.forEach((c:any) => {
			setValue(c.name, taskItem[c.name]);
		});
		setValue('iataCode', '14-3-4525/0005');
		setValue('declaredValueForCarriage', 'NVD');
		setValue('city', 'NEW DELHI');
		setValue('place', 'NEW DELHI');
		setValue('chargeableWeight', chargeableWeight);
		setValue('class', 'q');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setValue('chargeableWeight', chargeableWeight);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formValues.weight, formValues.packageCount]);

	return (
		<div className={styles.container}>
			{!viewDoc
			&& (
				<>
					<div className={styles.heading}>Add Export Details</div>
					<Breadcrumb>
						<Breadcrumb.Item label={(
							<div
								onClick={() => setGenerate(false)}
								role="link"
								tabIndex={0}
							>
								Ground Ops Dashboard
							</div>
						)}
						/>
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
										themeType="secondary"
										style={{ border: '1px solid #333' }}
									>
										BACK
									</Button>
									<Button
										onClick={handleSubmit(() => setActiveKey('handling'))}
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
										themeType="secondary"
										style={{ border: '1px solid #333' }}
									>
										BACK
									</Button>
									<Button
										onClick={handleSubmit(onSubmit)}
										themeType="accent"
									>
										Generate Master Airway Bill
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
								chargeableWeight={chargeableWeight}
								setGenerate={setGenerate}
							/>
						</Modal.Body>

					</Modal>
				)}
			</div>
		</div>
	);
}

export default GenerateMAWB;
