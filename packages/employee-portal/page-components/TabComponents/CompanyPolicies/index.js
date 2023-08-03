import { Checkbox, Toast } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocumet from '../../../commons/PreviewDocument';

import styles from './styles.module.css';

function checkIfObjectContainsAllIDs(policies_data, companyPolicyIds) {
	return companyPolicyIds.every((id) => id in policies_data);
}

const handleChange = (checked = false) => {
	if (checked) {
		Toast.info('You can View the Company Policies Again');
	} else {
		Toast.error('Please Read all the company Policies');
	}
};

function CompanyPolicies({ setInformationPage, getEmployeeDetails, data }) {
	const { company_policy_data : list, detail } = data || {};
	const { policies_data, id: employeeId } = detail || {};

	const companyPolicyIds = (list || []).map((element) => (element.id));

	const check = checkIfObjectContainsAllIDs(policies_data, companyPolicyIds);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>COMPANY POLICIES</div>
			</div>

			<div className={styles.flex_wrapper}>
				{(list || []).map((element) => {
					const { document_url, id, name } = element || {};

					return (
						<div key={id} style={{ padding: '10px' }}>
							<div className={styles.header_wrapper}>
								{name}
							</div>

							<PreviewDocumet
								document_url={document_url}
								preview
								id={id}
								policy_data={policies_data}
								getEmployeeDetails={getEmployeeDetails}
								employeeId={employeeId}
							/>

						</div>
					);
				})}
			</div>

			<div className={styles.submit}>
				<Checkbox
					label="I have Read all the Company Policies & I agree to it"
					checked={check}
					onChange={() => handleChange(check)}
				/>
			</div>

		</div>

	);
}

export default CompanyPolicies;
