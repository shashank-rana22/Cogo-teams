import { Button, Stepper, RadioGroup } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Layout from '../../Air/commons/Layout';
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
	setHawbDetails, activeHawb, setActiveHawb, activeKey, setActiveKey,
}) {
	const [value, onChange] = useState('manual');

	const handleDocumentList = (type) => {
		(packingData?.list || []).forEach((itm) => {
			if (itm.documentType === type) {
				window.open(itm.documentUrl, '_blank');
			}
		});
	};

	const onSubmit = () => {
		setBack(true);
	};

	function RemoveHawb() {
		return (
			<Button
				onClick={() => {
					setHawbDetails(hawbDetails.filter((itm) => itm.id !== activeHawb));
					setActiveHawb(hawbDetails[0].id);
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
						{hawbDetails.map((hawbItem:any) => (
							<div
								key={hawbItem.id}
								onClick={() => {
									setActiveHawb(hawbItem.id);
								}}
								role="presentation"
							>
								{' '}
								<div
									className={hawbItem.id
                                === activeHawb ? styles.hawb_container_click : styles.hawb_container}
								>
									HAWB -
									{' '}
									{hawbItem.id}
								</div>
							</div>
						))}

						<Button
							onClick={() => setHawbDetails([
								...hawbDetails,
								{ id: new Date().getTime(), isNew: true },
							])}
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
													if (edit) { setEdit(false); }
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
