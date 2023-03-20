const quizData = [
	{
		id       : 1,
		question : 'What is the capital of France?',
		options  : [
			{ answer: 'Paris', isCorrect: true },
			{ answer: 'Berlin', isCorrect: false },
			{ answer: 'Madrid', isCorrect: false },
			{ answer: 'Rome', isCorrect: false },
		],
		isMulti: false, // single correct question
	},
	{
		id       : 2,
		question : "What is the most abundant gas in the Earth's atmosphere?",
		options  : [
			{ answer: 'Oxygen', isCorrect: false },
			{ answer: 'Nitrogen', isCorrect: true },
			{ answer: 'Carbon dioxide', isCorrect: false },
			{ answer: 'Methane', isCorrect: false },
		],
		isMulti: true, // multi correct question
	},
	{
		id       : 3,
		question : 'Which of the following is a type of rock?',
		options  : [
			{ answer: 'Bacteria', isCorrect: false },
			{ answer: 'Water', isCorrect: false },
			{ answer: 'Sand', isCorrect: false },
			{ answer: 'Granite', isCorrect: true },
		],
		isMulti: false, // single correct question
	},
	{
		id       : 4,
		question : 'Which of the following is not a primary color?',
		options  : [
			{ answer: 'Red', isCorrect: false },
			{ answer: 'Green', isCorrect: false },
			{ answer: 'Blue', isCorrect: false },
			{ answer: 'Yellow', isCorrect: true },
		],
		isMulti: false, // single correct question
	},
	{
		id       : 5,
		question : 'Which of the following are fruits?',
		options  : [
			{ answer: 'Carrots', isCorrect: false },
			{ answer: 'Bananas', isCorrect: true },
			{ answer: 'Tomatoes', isCorrect: true },
			{ answer: 'Cucumbers', isCorrect: false },
		],
		isMulti: true, // multi correct question
	},
	{
		id      : 6,
		content : `Case study: John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take? John is a student who is struggling to 
        keep up with his coursework. He is feeling overwhelmed and stressed. 
        Which of the following actions should he take?`,
		question : 'What are some symptoms of stress that John might be experiencing?',
		type     : 'case_study',
		options  : [
			{ answer: 'A. Headaches and fatigue', isCorrect: true },
			{ answer: 'B. Increased appetite and weight gain', isCorrect: false },
			{ answer: 'C. Decreased heart rate and blood pressure', isCorrect: false },
			{ answer: 'D. Enhanced focus and productivity', isCorrect: false },
		],
		isMulti: true,
	},
];

export default quizData;
