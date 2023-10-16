import { SingleDateRange, Button, Select, Placeholder } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import { REPORT_TYPE_OPTIONS, ACCOUNT_TYPE_OPTIONS, DATE_OPTIONAL_APIS } from './constants';
import useListCogoEntities from './hooks/useListCogoEntities';
import useSubmitReport from './hooks/useSubmitReport';
import styles from './styles.module.css';

function Reports() {
	const [value, setValue] = useState({
		reportType   : null,
		dateRange    : null,
		accountType  : null,
		activeEntity : null,
	});

	const { api, loading } = useSubmitReport(value);
	const { entityLoading = true, entityData = [] } = useListCogoEntities();

	const onChange = (val, name) => {
		setValue((p) => ({ ...p, [name]: val }));
	};

	const isDisabledForAccountType = () => {
		if (value.reportType !== 'sage-organization-mapping-id-report') {
			return false;
		}
		return !value.accountType;
	};

	useEffect(() => {
		if (value.reportType !== 'sage-organization-mapping-id-report') {
			setValue((p) => ({ ...p, accountType: null }));
		}
	}, [value.reportType]);

	const isDateOptional = (DATE_OPTIONAL_APIS.includes(value.reportType));

	const entityOptions = (entityData || []).map((item) => {
		const {
			id = '',
			entity_code: entitycode = '',
		} = item || {};

		return {
			label : `${entitycode} - ${item.business_name}`,
			value : id,
		};
	});

	const isSubmitDisabled = loading
	|| !value.reportType
	|| !value.dateRange?.startDate
	|| !value.dateRange?.endDate
	|| isDisabledForAccountType()
	|| !value?.activeEntity;

	const disable = isDateOptional ? loading : isSubmitDisabled;

	return (
		<div>
			<h1>Reports</h1>
			<div className={styles.flex}>
				<div>
					<div className={styles.title}>Report Type*</div>
					<div className={styles.input}>
						<Select
							value={value.reportType}
							onChange={(val) => onChange(val, 'reportType')}
							placeholder="Select Report Type"
							options={REPORT_TYPE_OPTIONS}
						/>
					</div>
				</div>
				{value.reportType === 'sage-organization-mapping-id-report' &&	(
					<div className={styles.account_type}>
						<div className={styles.title}>Select Account Type*</div>
						<div>
							<Select
								value={value.accountType}
								onChange={(val) => onChange(val, 'accountType')}
								placeholder="Select Account Type"
								options={ACCOUNT_TYPE_OPTIONS}
							/>
						</div>
					</div>
				)}
				{!(isDateOptional) && (
					<div>
						<div className={styles.title}>Select Date Range*</div>
						<div className={styles.date}>
							<SingleDateRange
								placeholder="Enter Date Range"
								dateFormat="yyyy-MM-dd"
								name="date"
								onChange={(e) => setValue((p) => ({ ...p, dateRange: e }))}
								value={value.dateRange}
								isPreviousDaysAllowed
							/>
						</div>
					</div>
				)}
				{entityLoading ? <Placeholder height="30px" width="260px" /> : (
					<div className={styles.select_entity}>
						<div className={styles.title}>Select Entity*</div>
						<div>
							<Select
								name="activeEntity"
								value={value?.activeEntity}
								onChange={(e) => setValue((prev) => ({ ...prev, activeEntity: e }))}
								placeholder="Select Entity"
								options={entityOptions}
							/>
						</div>
					</div>
				)}
				<div className={styles.button}>
					<Button
						className={styles.button_class}
						disabled={disable}
						onClick={() => api()}
						size="md"
					>
						Submit
					</Button>
				</div>
			</div>

		</div>
	);
}

export default Reports;
