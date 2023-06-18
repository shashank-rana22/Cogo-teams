import { Chips, Datepicker, Select, TabPanel, Tabs, Timepicker } from '@cogoport/components';
import { useEffect } from 'react';

import Filter from '../../../../../commons/Filters';
import { MONTH_DAYS, WEEK_OPTIONS } from '../../constants';

import { controls } from './controls';
import styles from './styles.module.css';

interface FormData {
	triggerType?:string,
	frequency?:string,
	weekDay?:string,
	monthDay?:string,
	timezone?:string,
	time?:Date,
	isAllCreditControllers?:boolean,
	creditController?:string[],
	oneTimeDate?:Date,
}

interface Props {
	formData?:FormData,
	setFormData?:(p:object)=>void,
	isEditMode?:boolean,
}

function FormLayout({ formData, setFormData, isEditMode = false }:Props) {
	const {
		triggerType, frequency, weekDay,
		monthDay, timezone, time, isAllCreditControllers, creditController, oneTimeDate,
	} = formData || {};

	const handleTabChange = (val?:string) => {
		if (val === 'DAILY') {
			setFormData({
				...formData,
				weekDay   : undefined,
				monthDay  : undefined,
				frequency : val,
			});
		} else if (val === 'WEEKLY') {
			setFormData({
				...formData,
				monthDay    : undefined,
				oneTimeDate : undefined,
				frequency   : val,
			});
		} else if (val === 'MONTHLY') {
			setFormData({
				...formData,
				weekDay     : undefined,
				oneTimeDate : undefined,
				frequency   : val,
			});
		}
	};

	useEffect(() => {
		if (isAllCreditControllers && creditController) {
			setFormData((prev) => ({ ...prev, creditController: null }));
		}
	}, [creditController, isAllCreditControllers, setFormData]);

	return (
		<div>
			<Filter
				controls={controls({ formData, setFormData, isEditMode })}
				filters={formData}
				setFilters={setFormData}
			/>
			<div>
				<div className={styles.frequency}>
					{triggerType === 'PERIODIC' ? (
						<div>
							<h3>Frequency</h3>
							<Tabs
								activeTab={frequency}
								themeType="primary"
								onChange={(e?:string) => handleTabChange(e)}
							>
								<TabPanel name="DAILY" title="Daily">
									<div className={styles.empty_space} />
								</TabPanel>

								<TabPanel name="WEEKLY" title="Weekly">
									<div style={{ marginTop: '12px' }}>
										<Chips
											size="md"
											items={WEEK_OPTIONS}
											selectedItems={weekDay || []}
											onItemChange={(val?:string) => setFormData({
												...formData,
												weekDay: val,
											})}
										/>
									</div>
								</TabPanel>

								<TabPanel name="MONTHLY" title="Monthly">
									<Select
										value={monthDay}
										onChange={(day) => setFormData({ ...formData, monthDay: day })}
										placeholder="Select Day"
										options={MONTH_DAYS}
										className={styles.date}
										size="sm"
									/>
								</TabPanel>
							</Tabs>
						</div>
					) : (
						<div>
							<h4>Select Date</h4>
							<Datepicker
								placeholder="Enter Date"
								dateFormat="MM/dd/yyyy"
								name="date"
								onChange={(date) => setFormData({ ...formData, oneTimeDate: date })}
								value={oneTimeDate}
							/>
						</div>
					)}

					<div>
						<h4>Select Time Slot</h4>
						<div style={{ display: 'flex' }}>
							<Select
								value={timezone}
								onChange={(e) => setFormData({ ...formData, timezone: e })}
								placeholder="Timezone"
								options={[
									{
										label: 'IST', value: 'IST',
									},
									{
										label: 'GMT', value: 'GMT',
									},
									{
		                                label: 'VNM', value: 'VNM',
									},
								]}
								className={styles.timezone}
							/>
							<Timepicker
								name="date"
								onChange={(e) => setFormData({ ...formData, time: e })}
								value={time}
								use12hourformat
							/>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default FormLayout;
