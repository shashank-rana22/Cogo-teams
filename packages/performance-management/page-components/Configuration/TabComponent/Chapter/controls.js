import params from '../../../../common/getParams';

const controls = [
	{
		name        : 'chapter_name',
		label       : 'Chapter Name',
		type        : 'input',
		placeholder : 'Enter chapter name',
	},

	{
		name        : 'chapter_leader',
		label       : 'Chapter leader',
		placeholder : 'Select Chapter leader',
		type        : 'asyncSelect',
		initialCall : false,
		asyncKey    : 'list_employees',
		valueKey    : 'id',
		rules       : {
			required: 'Chapter leader is required',
		},
		params,
	},

	{
		name        : 'sub_chapter_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_sub_chapters',
		label       : 'Sub chapter',
		placeholder : 'Sub chapter',
		multiple    : true,
		rules       : {
			required: 'Sub chapters are required',
		},
		params,
	},

];

export default controls;
