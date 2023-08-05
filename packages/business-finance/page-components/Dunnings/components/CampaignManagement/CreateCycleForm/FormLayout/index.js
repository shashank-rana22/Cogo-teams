import { Chips, Datepicker, Select, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import Filter from '../../../../../commons/Filters/index.tsx';
import { HOURS, MINUTES, MONTH_DAYS, WEEK_OPTIONS } from '../../constants/index.ts';

import { controls } from './controls';
import styles from './styles.module.css';

const MINUTE_POSITION = 1;

function FormLayout({ formData = {}, setFormData = () => {}, isEditMode = false }) {
	const timezoneOptions = GLOBAL_CONSTANTS.options.timezone_options;

	const {
		triggerType, frequency, weekDay,
		monthDay, timezone, scheduledHour, scheduledMinute,
		isAllCreditControllers, oneTimeDate, scheduleRule,
		filters,
		name,
		cycleType,
		cogoEntityId,
	} = formData;

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

	const handleTabChange = (val) => {
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

	const unformatDate = (stringDate) => {
		if (isEmpty(stringDate)) return null;

		const [day, month, year] = (stringDate).split('/');
		const date = new Date(`${year}-${month}-${day}`);
		return date;
	};

	useEffect(() => {
		if (isAllCreditControllers) {
			setFormData((prev) => ({ ...prev, creditController: null }));
		}
	}, [isAllCreditControllers, setFormData]);

	useEffect(() => {
		// pre-filling all the details in case of updating
		if (isEditMode) {
			const unformattedOneTimeDate = unformatDate(oneTimeDateSchedule);
			const timeArray = (scheduleTime)?.split(':');
			const scheduledHourValue = timeArray?.[GLOBAL_CONSTANTS.zeroth_index];
			const scheduledMinuteValue = timeArray?.[MINUTE_POSITION];

			setFormData((prev) => ({
				...prev,
				frequency       : dunningExecutionFrequency,
				weekDay         : week,
				timezone        : scheduleTimeZone,
				scheduledHour   : scheduledHourValue,
				scheduledMinute : scheduledMinuteValue,
				monthDay        : dayOfMonth
					? String(dayOfMonth) : undefined,
				oneTimeDate            : unformattedOneTimeDate || undefined,
				dueOutstandingCurrency : dueOutstandingCurrency || undefined,
				isAllCreditControllers : isEmpty(organizationStakeholderIds),
				creditController       : organizationStakeholderIds || undefined,
				serviceType            : serviceTypes || undefined,
				cycleName              : name || undefined,
				cycleType              : cycleType || undefined,
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
		cycleType,
		name,
		totalDueOutstanding,
	]);

	useEffect(() => {
		// setting currency value based on selected entity
		if (cogoEntityId && !isEditMode) {
			const currencyEntityData = Object.values(
				GLOBAL_CONSTANTS.cogoport_entities,
			)?.filter((obj) => obj?.id === cogoEntityId);

			const currencyValue = currencyEntityData?.[GLOBAL_CONSTANTS.zeroth_index]?.currency;
			setFormData((prev) => ({
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
								onChange={(e) => handleTabChange(e)}
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
											onItemChange={(val) => setFormData((prev) => ({
												...prev,
												weekDay: val,
											}))}
										/>

									</div>
								</TabPanel>

								<TabPanel name="MONTHLY" title="Monthly">
									<Select
										value={monthDay}
										onChange={(day) => setFormData((prev) => ({ ...prev, monthDay: day }))}
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
								dateFormat="dd/MM/yyyy"
								name="oneTimeDate"
								onChange={(date) => setFormData((prev) => ({ ...prev, oneTimeDate: date }))}
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
									onChange={(e) => setFormData((prev) => ({ ...prev, timezone: e }))}
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
										onChange={(e) => setFormData((prev) => ({ ...prev, scheduledHour: e }))}
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
										onChange={(e) => setFormData((prev) => ({ ...prev, scheduledMinute: e }))}
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
