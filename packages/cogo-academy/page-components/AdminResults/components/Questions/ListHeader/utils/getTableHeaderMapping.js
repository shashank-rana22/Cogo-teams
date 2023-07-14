const TABLE_HEADER_MAPPING = {
	stand_alone_questions: {
		topic: {
			label : 'Topic',
			style : {
				width       : '10%',
				textAlign   : 'center',
				marginRight : '16px',
			},
		},
		question: {
			label : 'Question',
			style : {
				width     : '50%',
				textAlign : 'start',
			},
		},
		question_type: {
			label : 'Question Type',
			style : {
				width       : '10%',
				textAlign   : 'center',
				marginRight : '16px',
			},
		},
		difficulty_level: {
			label : 'Difficulty Level',
			style : {
				width       : '10%',
				textAlign   : 'center',
				marginRight : '16px',
			},
		},
		students_appeared: {
			label : 'Students IT Appeared For',
			sort  : true,
			style : {
				width       : '10%',
				textAlign   : 'center',
				marginRight : '16px',
			},
		},
		correct_percentage: {
			label : 'Correct Percentage %',
			sort  : true,
			style : {
				width       : '10%',
				textAlign   : 'center',
				marginRight : '16px',
			},
		},
	},
	subjective: {
		topic: {
			label : 'Topic',
			style : {
				width      : '12%',
				textAlign  : 'start',
				marginLeft : '2%',
			},
		},
		question: {
			label : 'Question',
			style : {
				width     : '55%',
				textAlign : 'start',
			},
		},
		difficulty_level: {
			label : 'Difficulty Level',
			style : {
				width     : '15%',
				textAlign : 'center',
			},
		},
		students_appeared: {
			label : 'Students It Appeared For',
			style : {
				width     : '15%',
				textAlign : 'center',
			},
		},
	},
};

const getTableHeaderMapping = ({ type }) => TABLE_HEADER_MAPPING[type];

export default getTableHeaderMapping;
