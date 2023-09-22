import { Button } from '@cogoport/components';
import React from 'react';

function Reset({ setFilters = () => {} }) {
	const handleReset = () => {
		setFilters({});
	};

	return (
		<Button
			type="button"
			size="lg"
			themeType="link"
			onClick={handleReset}
		>
			Reset
		</Button>
	);
}

export default Reset;
