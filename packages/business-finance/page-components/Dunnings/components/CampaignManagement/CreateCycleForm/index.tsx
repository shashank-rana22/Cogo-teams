/* eslint-disable max-lines-per-function */
import { Button, Chips, Modal, Select, TabPanel, Tabs, Timepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
import { SERVICE_OPTIONS } from '../constants';

import ExcludeList from './ExcludeList';
import styles from './styles.module.css';

function CreateCycleForm({ showCreateForm, setShowCreateForm, formData, setFormData }) {
	const DEFAULT_STEP = 1;
	const EXCLUDE_STEP = 2;
	const MAIL_STEP = 3;
	const STEP_CHANGE = 1;

	const [step, setStep] = useState(DEFAULT_STEP);

	const entityData = GLOBAL_CONSTANTS.cogoport_entities;
	const currencyData = GLOBAL_CONSTANTS.currency_code;

	const currencyOptions = Object.keys(currencyData)?.map((currency) => (
		{
			label : currency,
			value : currency,
		}
	));

	const entityOptions = Object.keys(entityData).map((entity) => ({
		label : `${entity} (${entityData[entity].currency})`,
		name  : entity,
		value : entity,
	}));

	const onClose = () => {
		setShowCreateForm(false);
	};

	const renderTitle = () => (
		<div className={styles.title}>
			Create New Cycle -
			{' '}
			<span className={styles.step}>
				Step
				{' '}
				{step}
				/3
			</span>
		</div>
	);

	const controls = [
		{
			label   : '',
			span    : 6,
			groupBy : [
				{
					label       : 'Enter Cycle Name',
					name        : 'cycleName',
					type        : 'input',
					prefix      : null,
					placeholder : 'Insert Cycle Name',
					// rules       : { required: 'Required' },
					span        : 12,
				},
			],
		},
		{
			label   : 'Cycle Type',
			name    : 'cycleType',
			type    : 'radioGroup',
			span    : 12,
			options : [
				{ name: 'soa', value: 'soa', label: 'SOA' },
				{ name: 'wis', value: 'wis', label: 'WIS' },
				{ name: 'balanceConfirmation', value: 'balanceConfirmation', label: 'Balance Confirmation' },
			],
		},
		{
			label   : 'Cogo Entity',
			name    : 'cogoEntity',
			type    : 'radioGroup',
			span    : 12,
			options : entityOptions,
		},
		{
			name          : 'isAllCreditControllers',
			type          : 'checkbox',
			checkboxLabel : 'Select All Credit Contollers',
			checked       : formData?.isAllCreditControllers,
			onChange      : (e) => {
				if (e?.target?.checked) {
					setFormData({ ...formData, isAllCreditControllers: true });
				} else {
					setFormData({ ...formData, isAllCreditControllers: false });
				}
			},
			span: 12,
		},
		{
			label   : '',
			span    : 12,
			groupBy : [
				{
					label   : 'Service Type',
					name    : 'serviceType',
					type    : 'select',
					span    : 2,
					options : SERVICE_OPTIONS,
				},
				{
					label       : 'Credit Controller',
					name        : 'creditController',
					placeholder : formData?.isAllCreditControllers ? 'All Credit Controllers Selected'
						: 'Select',
					type     : 'select',
					options  : [],
					disabled : formData?.isAllCreditControllers,
					span     : 3,
					style    : { width: '270px' },
				},
				{
					label   : 'Ageing Bucket',
					name    : 'ageingBucket',
					type    : 'select',
					span    : 2,
					options : [
						{ label: '1-30 Days', value: 'AB_1_30' },
						{ label: '31-60 Days', value: 'AB_31_60' },
						{ label: '61-90 Days', value: 'AB_61_90' },
						{ label: '91-180 Days', value: 'AB_91_180' },
						{ label: '181+ Days', value: 'AB_181_PLUS' },
						{ label: 'All Days', value: 'ALL' },
					],
				},

			],
		},
		{
			name              : 'Total Due Outstanding Greater Than',
			showStyledHeading : false,
			span              : 12,
			groupBy           : [
				{
					name        : 'totalDueOutstandingGreaterThanCurrency',
					placeholder : 'Currency',
					type        : 'select',
					span        : 1,
					options     : currencyOptions,
				},
				{
					name               : 'totalDueOutstandingGreaterThanAmount',
					placeholder        : 'Insert Amount',
					type               : 'input',
					onlyNumbersAllowed : true,
					prefix             : null,
					span               : 9,
				},
			],
		},
		{
			label        : 'Trigger Type',
			name         : 'triggerType',
			type         : 'radioGroup',
			span         : 12,
			defaultValue : 'oneTime',
			options      : [
				{ name: 'oneTime', value: 'oneTime', label: 'One Time' },
				{ name: 'periodic', value: 'periodic', label: 'Periodic' },
			],
		},

	];

	const WEEK_OPTIONS = [
		{
			key      : 'monday',
			children : 'Monday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'tuesday',
			children : 'Tuesday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'wednesday',
			children : 'Wednesday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'thursday',
			children : 'Thursday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'friday',
			children : 'Friday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'saturday',
			children : 'Saturday',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : 'sunday',
			children : 'Sunday',
			suffix   : null,
			tooltip  : false,
		},
	];

	const TOTAL_MONTHS = 28;
	const INCREMENT = 1;

	const MONTH_DAYS = Array(TOTAL_MONTHS).fill(null).map((item, index) => (
		{ label: String(index + INCREMENT), value: String(index + INCREMENT) }
	));

	const handleTabChange = (val) => {
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
			<Modal size="xl" show={showCreateForm} onClose={onClose} placement="center">
				<Modal.Header title={renderTitle()} />
				<Modal.Body>
					{step === DEFAULT_STEP && (
						<div>
							<Filter
								controls={controls}
								filters={formData}
								setFilters={setFormData}
							/>
							<div>
								<div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
									{formData?.triggerType === 'periodic' && (
										<div>
											<h3>Frequency</h3>
											<Tabs
												activeTab={formData?.frequency}
												themeType="primary"
												onChange={(e) => handleTabChange(e)}
											>
												<TabPanel name="daily" title="Daily" />

												<TabPanel name="weekly" title="Weekly">
													<div style={{ marginTop: '12px' }}>
														<Chips
															size="sm"
															items={WEEK_OPTIONS}
															enableMultiSelect
															selectedItems={formData?.weekDay || []}
															onItemChange={(val) => setFormData({
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
														style={{ width: '160px', marginTop: '12px' }}
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
												style={{ width: '132px', marginRight: '8px' }}
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
					)}

					{step === EXCLUDE_STEP && (
						<div>
							<ExcludeList />
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					{step !== DEFAULT_STEP && (
						<Button
							onClick={() => setStep(step - STEP_CHANGE)}
							style={{ marginRight: '8px' }}
						>
							Back
						</Button>
					)}
					{step !== MAIL_STEP ? (
						<Button
							onClick={() => setStep(step + STEP_CHANGE)}
						>
							Save and Next
						</Button>
					)
						: (
							<Button>
								Save and Send
							</Button>
						)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CreateCycleForm;
