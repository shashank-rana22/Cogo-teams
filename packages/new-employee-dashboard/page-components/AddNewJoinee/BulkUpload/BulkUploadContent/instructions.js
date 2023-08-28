const INSTRUCTIONS = {
	create: [
		'1. Personal Email or Cogoport Email should not have any preceding or following spaces.',
		'2. The Mobile Country Code should include a "+" sign.',
		'3. Cogoport Email and Employee Code are the only optional fields.',
		`4. Date of Joining should be in the date format (dd-mm-yyyy HH:mm). 
                Avoid using A.M/P.M and write the date in numbers.`,
		`5. HR Email/Hiring Manager Email/Reporting Manager Email/HRBP Email 
                should be present in the Employee Directory.`,
		'6. Office Location should be in lowercase and should be one of the following: ',
		'7. Role (designation) should be one of the following: ',
		'8. Department should be one of the following: ',
		'9. The value of Attendance should be either "flexi_shift" or "geo_location". ',
		'10. Learning Indicator should be one of the following: ',
	],
	update: [
		`1. Either the Personal Email or the Cogoport Email (if present) is required. 
            Apart from that, fill the .csv file with the data that needs to be updated.`,
		'2. The rest of the instructions are the same as in the Create section.',
	],
};

export default INSTRUCTIONS;
