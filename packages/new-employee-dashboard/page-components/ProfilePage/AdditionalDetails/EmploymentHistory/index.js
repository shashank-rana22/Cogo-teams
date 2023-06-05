import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function EmploymentHistory({ profileData, getEmployeeDetailsLoading }) {
	const { detail, offer_letter, pay_slip } = profileData || {};
	const { employee_experience_details = [] } = detail || {};

	const formatdate = ({ date }) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
		formatType : 'date',
	});

	const renderSkills = ({ skills }) => (skills || []).map((skill) => (
		<div key={skill} className={styles.skills}>
			{skill}
		</div>
	));

	const employmentDetails = () => (employee_experience_details || []).map((element) => {
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
							{formatdate({ date: started_at }) }
						</span>
						-
						<span style={{ paddingLeft: 8 }}>
							{formatdate({ date: ended_at }) }
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
						{!isEmpty(skills) ? renderSkills({ skills }) : '-'}
					</div>
				</div>

			</div>
		);
	});

	if (getEmployeeDetailsLoading) {
		return <CommonLoader />;
	}

	if (isEmpty(employee_experience_details)) {
		return <EmptyState emptyText="Employment history not found" />;
	}

	return (

		<>

			<div className={styles.container}>
				{employmentDetails()}
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
						document_url={pay_slip?.document_url}
						preview="true"
					/>
				</div>
			</div>
		</>
	);
}

export default EmploymentHistory;
