import { cl } from '@cogoport/components';
import { TextAreaController, useForm } from '@cogoport/forms';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

import { ExtraHardCodeData } from './ExtraHardCodeData';
import { formmatedValues } from './formmatedValues';
import getLeftSideFields from './getLeftSideFields';
import getTableDetails from './getTableDetails';
import { HeaderPart } from './HeaderPart';
import styles from './styles.module.css';

function Frontside({ initialValues = {} }, ref) {
	const formatValues = formmatedValues(initialValues);
	const service_type = formatValues?.service_type;
	const { control, handleSubmit, setValue } = useForm({ defaultValues: formatValues });

	useEffect(() => {
		Object.keys(formatValues || {}).forEach((key) => {
			setValue(key, formatValues[key]);
		});
	}, [formatValues, setValue]);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	return (
		<div className={styles.page}>
			<div className={styles.content}>
				<HeaderPart />

				<div className={styles.container_flex}>
					<div className={styles.width_35}>
						<div className={styles.block}>
							<div className={styles.text}>
								Notify Party (Broker):
							</div>

							<div className={styles.ref_text_area}>
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

							<div className={cl`${styles.width_65} ${styles.height_fit}`}>
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

							<div className={cl`${styles.width_75} ${styles.height_fit}`}>
								<TextAreaController
									control={control}
									name="shipper"
									setValue={setValue}
									rows={4}
								/>
							</div>
						</div>
					</div>

					<div className={styles.width_65}>
						<div className={styles.block}>
							<div className={styles.text}>
								Job Reference number:
							</div>

							<div className={styles.ref_text_area}>
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

							<div className={styles.ref_text_area}>
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

							<div className={cl`${styles.width_86} ${styles.height_fit}`}>
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

							<div className={cl`${styles.width_88} ${styles.height_fit}`}>
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

				<div className={styles.width_100}>
					{getLeftSideFields({ control, service_type, setValue })?.map((element) => element)}
				</div>

				<div className={styles.container_flex}>
					{getTableDetails({ control, service_type, setValue })?.map((obj) => obj)}
				</div>
			</div>

			<div className={styles.tan_pan}>
				<div className={styles.block}>
					<div className={styles.text}>
						Tan No :
					</div>

					<div className={styles.tan_text_area}>
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

					<div className={styles.tan_text_area}>
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
