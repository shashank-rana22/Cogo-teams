import { Button } from '@cogoport/components';

function Reset({ setFilters = () => {}, isMobile = false }) {
	const handleReset = () => {
		setFilters({});
	};

	return (
		<Button
			type="button"
			size={isMobile ? 'md' : 'lg'}
			themeType="link"
			onClick={handleReset}
		>
			Reset
		</Button>
	);
}

export default Reset;
