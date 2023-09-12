import Documents from './Documents';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails/index';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails/index';
import SalaryDetails from './SalaryDetails';
import StatutoryDetails from './StatutoryDetails';

const useGetTabsMapping = (data) => (
	[
		{
			name      : 'personal_details',
			title     : 'Personal Details',
			Component : <PersonalDetails data={data} />,
		},
		{
			name      : 'education_and_skills',
			title     : 'Education & Skills',
			Component : <EducationDetails data={data} />,
		},
		{
			name      : 'employment_details',
			title     : 'Employment Details',
			Component : <EmploymentDetails data={data} />,
		},
		{
			name      : 'statutory_details',
			title     : 'Statutory Details',
			Component : <StatutoryDetails data={data} />,
		},
		{
			name      : 'salary_details',
			title     : 'Salary Details',
			Component : <SalaryDetails data={data} />,
		},
		{
			name      : 'documents',
			title     : 'Documents',
			Component : <Documents data={data} />,
		},
		{
			name      : 'other_details',
			title     : 'Other Details',
			Component : <OtherDetails data={data} />,
		},
	]
);

export default useGetTabsMapping;
