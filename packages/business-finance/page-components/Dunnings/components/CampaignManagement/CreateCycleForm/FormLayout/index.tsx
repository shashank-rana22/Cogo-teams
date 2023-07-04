import { Chips, Datepicker, Select, TabPanel, Tabs } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import Filter from '../../../../../commons/Filters';
import { HOURS, MINUTES, MONTH_DAYS, WEEK_OPTIONS } from '../../constants';

import { controls } from './controls';
import styles from './styles.module.css';

interface FormData {
	triggerType?: string;
	frequency?: string;
	weekDay?: string;
	monthDay?: string;
	timezone?: string;
	time?: Date;
	isAllCreditControllers?: boolean;
	creditController?: string[];
	oneTimeDate?: Date;
	scheduledHour?: string;
	scheduledMinute?: string;
	scheduleRule?: {
		scheduleTime?: string;
		dunningExecutionFrequency?: string;
		week?: string;
		scheduleTimeZone?: string;
		dayOfMonth?: string | number;
		oneTimeDate?: string;
	};
	name?: string;
	dunningCycleType?: string;
	cogoEntityId?: string;
	filters?: {
		dueOutstandingCurrency?: string;
		organizationStakeholderIds?: string[];
		serviceTypes?: string[];
		cogoEntityId?: string;
		ageingBucket?: string;
		totalDueOutstanding?: number | string;
	}
}

interface Props {
	formData?: FormData;
	setFormData?: (p:object)=>void;
	isEditMode?: boolean;
}

function FormLayout({ formData, setFormData, isEditMode = false }:Props) {
	const geo = getGeoConstants();
	const timezoneOptions = geo?.options.timezone;

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

	const handleTabChange = (val?: string) => {
		const updatedFormData = { ...formData };

		switch (val) {
			case 'DAILY':
				updatedFormData.weekDay = undefined;
				updatedFormData.monthDay = undefined;

				break;
			case 'WEEKLY':
				updatedFormData.monthDay = undefined;
				updatedFormData.oneTimeDate = undefined;

				break;
			case 'MONTHLY':
				updatedFormData.weekDay = undefined;
				updatedFormData.oneTimeDate = undefined;

				break;
			default:
				break;
		}

		updatedFormData.frequency = val;
		setFormData(updatedFormData);
	};

	useEffect(() => {
		if (isAllCreditControllers) {
			setFormData((prev) => ({ ...prev, creditController: null }));
		}
	}, [isAllCreditControllers, setFormData]);

	useEffect(() => {
		// pre-filling all the details in case of updating
		if (isEditMode) {
			const stringDate = oneTimeDateSchedule;
			const formattedOneTimeDate = new Date(stringDate);
			const timeArray = (scheduleTime)?.split(':');
			const scheduledHourValue = timeArray?.[0];
			const scheduledMinuteValue = timeArray?.[1];

			setFormData((prev:object) => ({
				...prev,
				frequency       : dunningExecutionFrequency,
				weekDay         : week,
				timezone        : scheduleTimeZone,
				scheduledHour   : scheduledHourValue,
				scheduledMinute : scheduledMinuteValue,
				monthDay        : dayOfMonth
					? String(dayOfMonth) : undefined,
				oneTimeDate            : stringDate ? formattedOneTimeDate : undefined,
				dueOutstandingCurrency : dueOutstandingCurrency || undefined,
				isAllCreditControllers : isEmpty(organizationStakeholderIds),
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
		week, isEditMode, setFormData,
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
			const currencyEntityData:{ currency?: string }[] = Object.values(
				GLOBAL_CONSTANTS.cogoport_entities,
			)?.filter((obj:{ id?: string }) => obj?.id === cogoEntityId);

			const currencyValue = currencyEntityData?.[0]?.currency;
			setFormData((prev:object) => ({
				...prev,
				dueOutstandingCurrency: currencyValue,
			}));
		}
	}, [cogoEntityId, setFormData, isEditMode]);

	return (
		<div className={styles.filter_container}>
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
								activeTab={frequency === 'ONE_TIME' ? 'DAILY' : frequency}
								themeType="primary"
								onChange={(e?: string) => handleTabChange(e)}
							>
								<TabPanel name="DAILY" title="Daily">
									<div className={styles.empty_space} />
								</TabPanel>

								<TabPanel name="WEEKLY" title="Weekly">
									<div>
										<Chips
											className={styles.chips_container}
											size="md"
											items={WEEK_OPTIONS}
											selectedItems={weekDay}
											onItemChange={(val?: string) => setFormData({
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
								name="oneTimeDate"
								onChange={(date) => {
									const newDate = new Date(date);

									const timestampOneTime = newDate.getTime();
									setFormData({ ...formData, oneTimeDate: timestampOneTime });
								}}
								value={oneTimeDate}
							/>

						</div>
					)}

					<div>
						<h4>Select Time Slot (24 hour format)</h4>
						<div className={styles.timezone_container}>
							<div>
								<h5>Timezone</h5>
								<Select
									value={timezone}
									onChange={(e) => setFormData({ ...formData, timezone: e })}
									placeholder="Timezone"
									options={timezoneOptions}
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
