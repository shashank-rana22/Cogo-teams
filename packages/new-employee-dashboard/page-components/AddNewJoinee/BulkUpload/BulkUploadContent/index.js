import { Button, Select, Toast } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import INSTRUCTIONS from './instructions';
import styles from './styles.module.css';

const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

const india_constants = getCountryConstants({ country_id: india_country_id });
const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
	{ label: startCase(location), value: location }));

const handleCopy = (val) => {
	navigator.clipboard.writeText(val)
		.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
};

function RenderSelect({ type = '', asyncKey = '', options = [], valueKey = undefined }) {
	const [select, setSelect] = useState('');

	return (
		<div className={styles.select_container}>
			{type === 'async' ? (
				<AsyncSelect
					value={select}
					onChange={setSelect}
					initialCall
					valueKey={valueKey}
					asyncKey={asyncKey}
					isClearable
				/>
			) : (
				<Select
					options={options}
					value={select}
					size="sm"
					isClearable
					onChange={setSelect}
				/>
			)}

			<IcMCopy
				className={select ? styles.copy_icon : styles.copy_icon_disabled}
				fill={select ? '#449e48' : '#d3d3d3'}
				onClick={() => { if (select) handleCopy(select); }}
			/>
		</div>
	);
}

function RenderSuffix({ instruction = '' }) {
	if (instruction.includes('Office Location')) {
		return <RenderSelect options={REPORTING_CITY_OPTIONS} />;
	}
	if (instruction.includes('Role')) {
		return <RenderSelect type="async" asyncKey="list_employee_roles" valueKey="role_name" />;
	}
	if (instruction.includes('Department')) {
		return <RenderSelect type="async" asyncKey="list_employee_departments" valueKey="department_name" />;
	}
	if (instruction.includes('Learning Indicator')) {
		return <RenderSelect options={GLOBAL_CONSTANTS.li_options} />;
	}

	return null;
}

function BulkUploadContent(props) {
	const {
		bulkUploadNewHire,
		loading,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
		setBulkUploadComponent,
		activeTab,
	} = props || {};

	return (
		<div className={styles.container}>
			<div className={styles.guide_title}>
				Bulk
				{' '}
				{startCase(activeTab)}
				{' '}
				Guide
			</div>

			{(INSTRUCTIONS[activeTab] || []).map((instruction) => (
				<div key={instruction} className={styles.instruction}>
					{instruction}
					<div className={styles.render_select}>
						<RenderSuffix instruction={instruction} />
					</div>
				</div>
			))}

			<div className={styles.upload_new_hire}>Upload New Hire Sheet</div>

			<div className={styles.uploader}>
				<UploadController
					control={control}
					errors={errors}
					name="upload_new_hire_info"
					accept=".csv"
					rules={{ required: 'File is required.' }}
				/>

				{errors.upload_new_hire_info && (
					<div className={styles.error_msg}>
						{errors.upload_new_hire_info.message}
					</div>
				)}
			</div>

			<div className={styles.btn_row}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setBulkUploadComponent(false)}
				>
					Cancel
				</Button>

				<Button
					size="md"
					themeType="secondary"
					style={{ marginLeft: 10 }}
					onClick={onClickViewSampleFile}
				>
					View Sample Bulk Upload File
				</Button>

				<Button
					size="md"
					themeType="primary"
					style={{ marginLeft: 10 }}
					loading={loading}
					onClick={handleSubmit(bulkUploadNewHire)}
				>
					Upload File
				</Button>
			</div>
		</div>
	);
}

export default BulkUploadContent;
