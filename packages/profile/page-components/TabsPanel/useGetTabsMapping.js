import Documents from './Documents';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails/index';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails/index';

const useGetTabsMapping = (data = {}, loading = false, getEmployeeDetails = () => {}) => (
	[
		{
			name      : 'personal_details',
			title     : 'Personal Details',
			Component : <PersonalDetails data={data} loading={loading} getEmployeeDetails={getEmployeeDetails} />,
		},
		{
			name      : 'education_and_skills',
			title     : 'Education & Skills',
			Component : <EducationDetails data={data} loading={loading} />,
		},
		{
			name      : 'employment_details',
			title     : 'Employment Details',
			Component : <EmploymentDetails data={data} loading={loading} />,
		},
		{
			name      : 'documents',
			title     : 'Documents',
			Component : <Documents data={data} loading={loading} />,
		},
		{
			name      : 'other_details',
			title     : 'Other Details',
			Component : <OtherDetails data={data} loading={loading} />,
		},
	]
);

export default useGetTabsMapping;
