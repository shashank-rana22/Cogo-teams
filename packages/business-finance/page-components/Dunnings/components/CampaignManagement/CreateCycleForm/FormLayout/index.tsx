import { Chips, Datepicker, Select, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect } from 'react';

import Filter from '../../../../../commons/Filters';
import { HOURS, MINUTES, MONTH_DAYS, WEEK_OPTIONS } from '../../constants';

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
	scheduledHour?:string,
	scheduledMinute?:string,
	scheduleRule?:any,
	name?:string,
	dunningCycleType?:string,
	cogoEntityId?:string
	filters?:{
		dueOutstandingCurrency?:string,
		organizationStakeholderIds?:string[],
		serviceTypes?:string[],
		cogoEntityId?:string,
		ageingBucket?:string,
		totalDueOutstanding?:number | string,
	}
}

interface Props {
	formData?:FormData,
	setFormData?:(p:object)=>void,
	isEditMode?:boolean,
}

function FormLayout({ formData, setFormData, isEditMode = false }:Props) {
	const {
		triggerType, frequency, weekDay,
		monthDay, timezone, scheduledHour, scheduledMinute,
		isAllCreditControllers, oneTimeDate, scheduleRule,
		filters,
		name,
		dunningCycleType,
		cogoEntityId,
	} = formData || {};

	const {
		organizationStakeholderIds,
		serviceTypes,
		cogoEntityId:cogoEntityIdFromData,
		ageingBucket,
		totalDueOutstanding,
		dueOutstandingCurrency,
	} = filters || {};

	const {
		scheduleTime,
		dunningExecutionFrequency,
		week,
		scheduleTimeZone,
		dayOfMonth,
		oneTimeDate:oneTimeDateSchedule,
	} = scheduleRule || {};

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
		if (isAllCreditControllers) {
			setFormData((prev) => ({ ...prev, creditController: null }));
		}
	}, [isAllCreditControllers, setFormData]);

	useEffect(() => {
		// pre-filling all the details in case of updating
		if (isEditMode) {
			const stringDate = oneTimeDate || oneTimeDateSchedule;
			const formattedOneTimeDate = new Date(stringDate);
			const timeArray = (scheduleTime)?.split(':');

			setFormData((prev:object) => ({
				...prev,
				frequency       : dunningExecutionFrequency,
				weekDay         : week,
				timezone        : scheduleTimeZone,
				scheduledHour   : timeArray?.[0],
				scheduledMinute : timeArray?.[1],
				monthDay        : dayOfMonth
					? String(dayOfMonth) : undefined,
				oneTimeDate            : stringDate ? formattedOneTimeDate : undefined,
				dueOutstandingCurrency : dueOutstandingCurrency || undefined,
			    isAllCreditControllers : !(organizationStakeholderIds?.length > 0),
				creditController       : organizationStakeholderIds || undefined,
				serviceType            : serviceTypes || undefined,
				cycleName              : name || undefined,
				cycleType              : dunningCycleType || undefined,
				cogoEntityId           : cogoEntityIdFromData || undefined,
				ageingBucket,
				totalDueOutstanding,
			}));
		}
	}, [dayOfMonth, dunningExecutionFrequency, scheduleTime, scheduleTimeZone,
		week, isEditMode, setFormData, oneTimeDate,
		dueOutstandingCurrency,
		organizationStakeholderIds,
		serviceTypes,
		oneTimeDateSchedule,
		ageingBucket,
		cogoEntityIdFromData,
		dunningCycleType,
		name,
		totalDueOutstanding,
	]);

	useEffect(() => {
		// setting currency value based on selected entity
		if (cogoEntityId && !isEditMode) {
			const currencyEntityData = Object.values(
				GLOBAL_CONSTANTS.cogoport_entities,
			)?.filter((obj) => obj?.id === cogoEntityId);

			const currencyValue = currencyEntityData?.[0]?.currency;
			setFormData((prev:object) => ({
				...prev,
				dueOutstandingCurrency: currencyValue,
			}));
		}
	}, [cogoEntityId, setFormData, isEditMode]);

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
											selectedItems={weekDay}
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
						<h4>Select Time Slot (24 hour format)</h4>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div>
								<h5>Timezone</h5>
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
							</div>

							<div>
								<h5>Hours</h5>
								<div style={{ display: 'flex' }}>
									<Select
										value={scheduledHour}
										onChange={(e) => setFormData({ ...formData, scheduledHour: e })}
										placeholder="Hour"
										options={HOURS}
										className={styles.timezone}
									/>
									<h2>:</h2>
								</div>
							</div>
							<div>
								<h5>Minutes</h5>
								<div style={{ display: 'flex' }}>
									<Select
										value={scheduledMinute}
										onChange={(e) => setFormData({ ...formData, scheduledMinute: e })}
										placeholder="Hour"
										options={MINUTES}
										className={styles.timezone}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default FormLayout;
