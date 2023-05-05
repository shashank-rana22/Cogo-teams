const widths = [['100%'],
	['50%', '50%'],
	['33.33%', '33.33%', '33.33%'],
	['25%', '25%', '25%', '25%'],
	['40%', '60%'],
	['60%', '40%'],
	['25%', '75%'],
	['75%', '25%'],
	['25%', '25%', '50%'],
	['50%', '25%', '25%'],
];

const useGetStructureWidths = ({ previewMode }) => {
	if (previewMode === 'mobile') {
		// const modifiedWidths = widths.map((row) => row.map(() => '100%'));
		// console.log('widths :::', modifiedWidths);
		// return modifiedWidths;

		console.log('skdffksdjhgjk');
	}

	return widths;
};

export default useGetStructureWidths;
