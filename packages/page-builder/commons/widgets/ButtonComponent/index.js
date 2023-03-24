import { Button } from '@cogoport/components';

function ButtonComponent(props) {
	const { label = 'submit', themeType = 'primary', size = 'md', type = 'button' } = props;

	return (
		<div>
			<Button type={type} themeType={themeType} size={size}>{label}</Button>
		</div>
	);
}

export default ButtonComponent;
