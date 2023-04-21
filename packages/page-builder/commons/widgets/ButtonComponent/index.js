import { Button } from '@cogoport/components';

function ButtonComponent(props) {
	const {
		widget,
	} = props;

	const { content = 'Click Here', themeType, size, type, attributes } = widget || {};

	const { onClick = () => {} } = attributes || {};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Button
				type={type}
				themeType={themeType}
				size={size}
				onClick={onClick}
			>
				{content}
			</Button>
		</div>
	);
}

export default ButtonComponent;
