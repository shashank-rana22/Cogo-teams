import { Chips, Select, TabPanel, Tabs, Timepicker } from '@cogoport/components';

import Filter from '../../../../../commons/Filters';
import { MONTH_DAYS, WEEK_OPTIONS } from '../../constants';

import { controls } from './controls';
import styles from './styles.module.css';

function FormLayout({ formData, setFormData }) {
	const handleTabChange = (val?:string) => {
		if (val === 'daily') {
			setFormData({
				...formData,
				weekDay   : null,
				monthDate : null,
				frequency : val,
			});
		} else if (val === 'weekly') {
			setFormData({
				...formData,
				monthDate : null,
				frequency : val,
			});
		} else if (val === 'monthly') {
			setFormData({
				...formData,
				weekDay   : null,
				frequency : val,
			});
		}
	};

	return (
		<div>
			<Filter
				controls={controls({ formData, setFormData })}
				filters={formData}
				setFilters={setFormData}
			/>
			<div>
				<div className={styles.frequency}>
					{formData?.triggerType === 'periodic' && (
						<div>
							<h3>Frequency</h3>
							<Tabs
								activeTab={formData?.frequency}
								themeType="primary"
								onChange={(e?:string) => handleTabChange(e)}
							>
								<TabPanel name="daily" title="Daily" />

								<TabPanel name="weekly" title="Weekly">
									<div style={{ marginTop: '12px' }}>
										<Chips
											size="md"
											items={WEEK_OPTIONS}
											enableMultiSelect
											selectedItems={formData?.weekDay || []}
											onItemChange={(val?:string) => setFormData({
												...formData,
												weekDay: val,
											})}
										/>
									</div>
								</TabPanel>

								<TabPanel name="monthly" title="Monthly">
									<Select
										value={formData?.monthDate}
										onChange={(e) => setFormData({ ...formData, monthDate: e })}
										placeholder="Select Date"
										options={MONTH_DAYS}
										className={styles.date}
										size="sm"
									/>
								</TabPanel>
							</Tabs>
						</div>
					)}
					<div>
						<h4>Select Time Slot</h4>
						<div style={{ display: 'flex' }}>
							<Select
								value={formData?.timezone}
								onChange={(e) => setFormData({ ...formData, timezone: e })}
								placeholder="Timezone"
								options={[
									{
										label: 'IST', value: 'IST',
									},
									{
										label: 'GMT', value: 'GMT',
									},
								]}
								className={styles.timezone}
							/>
							<Timepicker
								name="date"
								onChange={(e) => setFormData({ ...formData, time: e })}
								value={formData?.time}
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
