import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

const FormatDate = ({ date }) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
	formatType : 'date',
});

const RenderSkills = ({ skills }) => (skills || []).map((skill) => (
	<div key={skill} className={styles.skills}>
		{skill}
	</div>
));

const EmploymentDetails = ({ employee_experience_details }) => (employee_experience_details || []).map((element) => {
	const {
		skills = [], description = '', started_at, ended_at, company_name,
	} = element || {};

	return (
		<div key={`{${company_name}_${started_at}}`} className={styles.per_container}>
			<div className={styles.header}>
				{company_name}
			</div>

			<div className={styles.top_bar}>
				<div className={styles.label_value_container}>
					<span style={{ paddingRight: 8 }}>
						<FormatDate date={started_at} />
					</span>
					-
					<span style={{ paddingLeft: 8 }}>
						<FormatDate date={ended_at} />

					</span>
				</div>
			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label}>
					Description
				</div>

				<div className={styles.value}>
					{description || '-'}
				</div>
			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label}>
					Skills
				</div>

				<div className={styles.skills_value}>
					{!isEmpty(skills) ? <RenderSkills skills={skills} /> : null}
				</div>
			</div>
		</div>
	);
});

function EmploymentHistory({ profileData, getEmployeeDetailsLoading }) {
	const { detail, offer_letter, payslip } = profileData || {};
	const { employee_experience_details = [] } = detail || {};

	if (getEmployeeDetailsLoading) return <CommonLoader />;

	if (isEmpty(employee_experience_details)) {
		return <EmptyState emptyText="Employment history not found" />;
	}

	return (
		<>
			<div className={styles.container}>
				<EmploymentDetails employee_experience_details={employee_experience_details} />
				{' '}
			</div>

			<div
				className={styles.extra_docs}
			>
				<div>
					<div className={styles.extra_header}>Last Offer</div>
					<PreviewDocumet
						document_url={offer_letter?.document_url}
						preview="true"
					/>
				</div>
				<div>
					<div className={styles.extra_header}>Last Pay Slip</div>
					<PreviewDocumet
						document_url={payslip}
						preview="true"
					/>
				</div>
			</div>
		</>
	);
}

export default EmploymentHistory;
