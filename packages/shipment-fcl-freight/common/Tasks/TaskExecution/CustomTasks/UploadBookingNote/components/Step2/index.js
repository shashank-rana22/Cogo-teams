import { Button, TabPanel, Tabs } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { useState, useMemo } from 'react';

import { mainControls, bookingNoteNumberControls, movementDetailsControls } from '../../helpers/getStep2Controls';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function StepTwo({ data = {}, setStep = () => {}, step1_data = {} }) {
	const [currentBookingNote, setCurrentBookingNote] = useState('0');

	const { formProps, handleFinalSubmit, departureDate = '' } = data || {};
	const { formProps:{ watch:step1Watch = () => {} } = {} } = step1_data || {};
	const { control, formState:{ errors = {} } = {}, handleSubmit } = formProps || {};

	const step1Files = step1Watch('url');
	const keysForRows = useMemo(
		() => Array(step1Files.length).fill(null).map(() => Math.random()),
		[step1Files.length],
	);

	return (
		<div>
			<div className={styles.container}>

				<Tabs
					activeTab={currentBookingNote.toString()}
					onChange={setCurrentBookingNote}
					className={styles.tabs_container}
				>
					{Array.isArray(step1Files) && step1Files.map((file, index) => {
						const currentUrl = typeof file === 'object' ? file?.finalUrl : file;
						const splitUrl = currentUrl.split('.');
						const fileType = splitUrl?.[(splitUrl?.length || FIRST_INDEX) - FIRST_INDEX];
						let type = '';

						if (['png', 'jpeg'].includes(fileType)) {
							type = `image/${fileType}`;
						} else {
							type = 'application/pdf';
						}

						return (
							<TabPanel
								name={index.toString()}
								title={`Booking Note ${index + FIRST_INDEX}`}
								key={keysForRows[index]}
							>
								<div>
									<object
										title="Booking Note"
										width="100%"
										type={type}
										data={currentUrl}
									/>
								</div>
							</TabPanel>
						);
					})}
				</Tabs>

				<div className={styles.form_container}>
					<div className={styles.heading}>Review Details</div>

					<div className={styles.layout_container}>
						<Layout control={control} errors={errors} fields={bookingNoteNumberControls} />
					</div>

					<div className={styles.layout_container}>
						<div className={styles.sub_heading}>Movement Details</div>

						<Layout control={control} errors={errors} fields={movementDetailsControls} />
					</div>

					<div className={styles.layout_container}>
						<div className={styles.sub_heading}>Other Details</div>

						<Layout control={control} errors={errors} fields={(mainControls({ departureDate }))} />
					</div>
				</div>

			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(FIRST_INDEX)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(handleFinalSubmit)}>Next</Button>
			</div>
		</div>
	);
}

export default StepTwo;
