import fetchLocalCheckList from '../utils/fetchLocalCheckList';

const getFormResubmission = (department = '', designation = '') => {
	let lastFormStatus;

	if (designation) {
		lastFormStatus = fetchLocalCheckList(department, designation);
		if (lastFormStatus?.stage) {
			return { department, designation, stage: lastFormStatus.stage };
		}
		return {};
	}

	const localForms = fetchLocalCheckList();

	const lastForm = Object.keys(localForms)?.[Object.keys(localForms).length - 1] || '';
	lastFormStatus = localForms[lastForm];
	if (lastFormStatus?.stage) {
		return {
			department  : lastForm.split('_')[0],
			designation : lastForm.split('_')[1],
			stage       : lastFormStatus.stage,
		};
	}
	return {};
};

export default getFormResubmission;
