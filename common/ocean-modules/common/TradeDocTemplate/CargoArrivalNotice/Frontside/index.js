import { TextAreaController, useForm } from '@cogoport/forms';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

import { ExtraHardCodeData } from './ExtraHardCodeData';
import { formmatedValues } from './formmatedValues';
import { HeaderPart } from './HeaderPart';
import { leftDataControls } from './leftDataControl';
import styles from './styles.module.css';
import { tableDetailControls } from './TableDetailControls';

function Frontside({ initialValues }, ref) {
	const formatValues = formmatedValues(initialValues);

	const service_type = formatValues?.service_type;

	const { control, handleSubmit, setValue } = useForm({ formatValues });

	useEffect(() => {
		Object.keys(formatValues || {}).forEach((key) => {
			setValue(key, formatValues[key]);
		});
	}, [formatValues, setValue]);

	useImperativeHandle(ref, () => ({
		handleSubmit,
	}));

	const leftSideFields = [];

	for (let i = 0; i < leftDataControls[service_type].length;) {
		const obj = leftDataControls[service_type][i];
		if (obj.fullWidth) {
			leftSideFields.push(
				<div className={styles.block}>
					<div className={styles.text}>
						{obj.label}
						{' '}
						:
					</div>

					<div style={{ width: '100%', height: 'fit-content' }}>
						<TextAreaController
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
						/>
					</div>
				</div>,
			);
			i += 1;
		} else if (i + 1 < leftDataControls[service_type].length) {
			leftSideFields.push(
				<div style={{ display: 'flex' }}>
					<div className={styles.block} style={{ width: '50%' }}>
						<div className={styles.text}>
							{obj.label}
							{' '}
							:
						</div>

						<div style={{ width: '70%' }}>
							<TextAreaController
								control={control}
								name={`${obj.name}`}
								setValue={setValue}
								rows={3}
							/>
						</div>
					</div>
					<div className={styles.block} style={{ width: '50%' }}>
						<div className={styles.text}>
							{leftDataControls[service_type][i + 1].label}
							{' '}
							:
						</div>

						<div style={{ width: '70%', height: 'fit-content' }}>
							<TextAreaController
								control={control}
								name={`${leftDataControls[service_type][i + 1].name}`}
								setValue={setValue}
								rows={3}
							/>
						</div>
					</div>
				</div>,
			);
			i += 2;
		} else {
			leftSideFields.push(
				<div className={styles.block}>
					<div className={styles.text}>
						{obj.label}
						{' '}
						:
					</div>

					<div style={{ width: '70%', height: 'fit-content' }}>
						<TextAreaController
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
						/>
					</div>
				</div>,
			);
			i += 1;
		}
	}

	const tableDetails = [];

	for (let i = 0; i < tableDetailControls[service_type].length; i += 1) {
		tableDetails.push(
			<div className={styles.last_block}>
				<div className={styles.last_block_text}>
					{tableDetailControls[service_type][i].label}
					{' '}
					:
				</div>

				<div style={{ width: '100%', height: 'fit-content' }}>
					<TextAreaController
						control={control}
						name={`${tableDetailControls[service_type][i].name}`}
						setValue={setValue}
						rows={3}
					/>
				</div>
			</div>,
		);
	}

	return (
		<div className={styles.page}>
			<div className={styles.content}>
				<HeaderPart />

				<div style={{ display: 'flex' }}>
					<div style={{ width: '35%' }}>
						<div className={styles.block}>
							<div className={styles.text}>
								Notify Party (Broker):
							</div>

							<div style={{ width: '100%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="notify_party"
									setValue={setValue}
									rows={5}
								/>
							</div>
						</div>
						<div className={styles.block}>
							<div className={styles.text}>
								Consignee :
							</div>

							<div style={{ width: '65%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="consignee"
									setValue={setValue}
									rows={4}
								/>
							</div>
						</div>
						<div className={styles.block}>
							<div className={styles.text}>
								Shipper :
							</div>

							<div style={{ width: '75%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="shipper"
									setValue={setValue}
									rows={4}
								/>
							</div>
						</div>
					</div>

					<div style={{ width: '65%' }}>
						<div className={styles.block}>
							<div className={styles.text}>
								Job Reference number:
							</div>

							<div style={{ width: '100%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="job_ref_no"
									setValue={setValue}
									rows={3}
								/>
							</div>
						</div>

						<div className={styles.block}>
							<div className={styles.text}>
								Invoice reference number :
							</div>

							<div style={{ width: '100%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="inv_ref_no"
									setValue={setValue}
									rows={3}
								/>
							</div>
						</div>

						<div className={styles.block}>
							<div className={styles.text}>
								IGM dt :
							</div>

							<div style={{ width: '86%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="igm_dt"
									setValue={setValue}
									rows={3}
								/>
							</div>
						</div>

						<div className={styles.block}>
							<div className={styles.text}>
								From :
							</div>

							<div style={{ width: '88%', height: 'fit-content' }}>
								<TextAreaController
									control={control}
									name="port_of_loading"
									setValue={setValue}
									rows={3}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.details_text}>
					Shipment details :
				</div>

				<div style={{ width: '100%' }}>
					{leftSideFields.map((element) => element)}
				</div>

				<div style={{ display: 'flex' }}>
					{tableDetails.map((obj) => obj)}
				</div>
			</div>

			<div style={{ width: '100%', display: 'flex', marginTop: '10px' }}>
				<div className={styles.block}>
					<div className={styles.text}>
						Tan No :
					</div>

					<div style={{ width: '70%', height: 'fit-content' }}>
						<TextAreaController
							control={control}
							name="tan"
							setValue={setValue}
							rows={2}
						/>
					</div>
				</div>

				<div className={styles.block}>
					<div className={styles.text}>
						Pan No :
					</div>

					<div style={{ width: '70%', height: 'fit-content' }}>
						<TextAreaController
							control={control}
							name="pan"
							setValue={setValue}
							rows={2}
						/>
					</div>
				</div>
			</div>

			<ExtraHardCodeData />
		</div>
	);
}

export default forwardRef(Frontside);
