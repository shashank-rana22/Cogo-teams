import React from 'react';

function ProgressBar(props) {
	const {
		handleChange,
		imageKey,
		isRootComponent,
		pageConfiguration,
		selectedItem,
	} = props;

	const width = isRootComponent ? pageConfiguration.style?.[imageKey] : selectedItem.component.style?.[imageKey];

	const handleInputChange = (e) => {
		const newValue = e.target.value;

		const percentageValue = `${(newValue)}%`;

		handleChange(imageKey, percentageValue);
	};

	return (
		<div>
			<input
				style={{ width: '100%' }}
				type="range"
				min="0"
				max="100"
				value={parseFloat(width)}
				onChange={handleInputChange}
			/>

		</div>
	);
}

export default ProgressBar;
