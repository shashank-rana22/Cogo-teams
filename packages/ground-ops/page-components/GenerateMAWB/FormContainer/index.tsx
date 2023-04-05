import { Button, Stepper, RadioGroup, Toast } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import Layout from '../../Air/commons/Layout';
import useCreateShipmentDocument from '../GenerateMawbDoc/useCreateShipmentDocument';
import UploadMAWB from '../UploadMAWB';

import styles from './styles.module.css';

const items = [
	{ title: 'Basic Details', key: 'basic' },
	{ title: 'Package & Charges Detail', key: 'package' },
	{ title: 'Handling Details', key: 'handling' },
];

const options = [
	{ name: 'Add Manually', value: 'manual', label: 'Add Manually' },
	{ name: 'Upload Document', value: 'upload', label: 'Upload Document' },
];

function FormContainer({
	back, setBack, edit, setEdit, packingData, fields,
	control, errors, item, setGenerate, handleSubmit, activeCategory, hawbDetails,
	setHawbDetails, activeHawb, setActiveHawb, activeKey, setActiveKey, taskItem,
}) {
	const [value, onChange] = useState('manual');

	const handleDocumentList = (type) => {
		(packingData?.list || []).forEach((itm) => {
			if (itm.documentType === type) {
				window.open(itm.documentUrl, '_blank');
			}
		});
	};

	const { upload } = useCreateShipmentDocument({
		edit,
		setGenerate,
		setEdit,
		activeCategory,
		hawbDetails,
		setHawbDetails,
		setActiveHawb,
		setActiveKey,
		activeHawb,
	});

	const onSubmit = () => {
		setBack(true);
	};

	function RemoveHawb() {
		const payload = {
			state               : 'document_rejected',
			id                  : taskItem?.id,
			performed_by_org_id : taskItem?.serviceProviderId,
		};
		return (
			<Button
				onClick={() => {
					if (edit) {
						if (activeHawb.isNew === false) {
							upload({ payload });
						}
						setHawbDetails((prev) => prev.filter((itm) => itm.id !== activeHawb.id));
						setActiveHawb(hawbDetails.find((ele) => ele.id !== activeHawb.id));
					} else {
						Toast.error('Cannot be deleted in create mode');
					}
				}}
				themeType="secondary"
				style={{ border: '1px solid #333', marginLeft: '8%' }}
				disabled={hawbDetails.length === 1}
			>
				REMOVE
			</Button>
		);
	}

	return (
		<div className={styles.form_container}>
			<div className={styles.header_flex}>
				{activeCategory === 'hawb' && (
					<div className={styles.buttonwrap}>
						{hawbDetails.map((hawbItem) => (
							<div
								key={hawbItem.id}
								onClick={() => {
									setActiveHawb(hawbItem);
								}}
								role="presentation"
							>
								{' '}
								<div
									className={hawbItem.id
                                === activeHawb.id ? styles.hawb_container_click : styles.hawb_container}
								>
									{!hawbItem.documentNo
									&& `HAWB - ${hawbItem.id}`}
									{' '}
									{hawbItem.documentNo}
								</div>
							</div>
						))}

						<Button
							onClick={() => {
								setHawbDetails((prev) => ([...prev, { id: uuid(), documentNo: null, isNew: true }]));
							}}
							themeType="secondary"
						>
							<IcMPlus />
						</Button>

					</div>
				)}
				{value === 'manual' && activeCategory === 'mawb' && (
					<Stepper
						active={activeKey}
						setActive={setActiveKey}
						items={items}
					/>
				)}
				{!edit && (
					<RadioGroup
						options={options}
						onChange={onChange}
						value={value}
						style={{ marginLeft: 'auto', height: '4%' }}
					/>
				)}
			</div>
			{value === 'manual' && activeCategory === 'hawb' && (
				<Stepper
					active={activeKey}
					setActive={setActiveKey}
					items={items}
				/>
			)}
			<div className={styles.flex}>
				<Button
					size="md"
					themeType="primary"
					onClick={() => handleDocumentList('packing_list')}
					className={styles.packing_button}
				>
					Refer Packing List
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={() => handleDocumentList('shipping_instruction')}
					className={styles.packing_button}
				>
					Refer Shipping Instruction
				</Button>
			</div>
			{value === 'upload' ? <UploadMAWB item={item} setGenerate={setGenerate} />
				: (
					<>
						{activeKey === 'basic' && (
							<>
								<Layout fields={fields?.basic} control={control} errors={errors} />
								<div className={styles.button_container}>
									{activeCategory === 'hawb' && (
										<RemoveHawb />
									)}
									{!back ? (
										<div className={styles.button_div}>
											<Button
												onClick={() => {
													setGenerate(false);
													setEdit(false);
												}}
												themeType="secondary"
												style={{ border: '1px solid #333' }}
											>
												CANCEL
											</Button>
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

						{activeKey === 'package' && (
							<>
								<Layout fields={fields?.package} control={control} errors={errors} />
								<div className={styles.button_container}>
									{activeCategory === 'hawb' && (
										<RemoveHawb />
									)}
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

						{activeKey === 'handling' && (
							<>
								<Layout fields={fields?.handling} control={control} errors={errors} />
								<div className={styles.button_container}>
									{activeCategory === 'hawb' && (
										<RemoveHawb />
									)}
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
					</>
				)}
		</div>
	);
}

export default FormContainer;
