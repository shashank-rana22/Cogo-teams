import { Button } from '@cogoport/components';
import { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';

function ButtonComponent(props) {
	const {
		label = 'submit',
		themeType = 'primary',
		size = 'md',
		type = 'button',
	} = props;

	const [isFocused, setIsFocused] = useState(false);

	return (
		<div style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Button
				type={type}
				themeType={themeType}
				size={size}
				onClick={() => setIsFocused(!isFocused)}
			>
				{label}
			</Button>

		</div>
	);
}

export default ButtonComponent;
