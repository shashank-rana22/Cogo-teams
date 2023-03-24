import { startCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import contents from '../../../../../configurations/basic-contents';

import styles from './styles.module.css';

const CONTENT_MAPPING = {
	text: {
		// eslint-disable-next-line max-len
		content    : '<div style = "display: flex; justify-content: center"><h2 style = "color: #333; font-size: 24px;">Hey, please start typing here...</h2></div>',
		// styles  : {
		// 	fontSize       : '24px',
		// 	color          : '#333',
		// 	display        : 'flex',
		// 	justifyContent : 'center',
		// },
		attributes : {
			contenteditable: true,
		},
	},

	image: {
		// eslint-disable-next-line max-len
		content : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
		alt     : 'add-img-url',
		styles  : {
			width  : '100%',
			height : '300px',
		},

		attributes: {},
	},

	button: {
		content     : 'Click Me!',
		redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
		themeType   : 'primary',
		size        : 'md',
		type        : 'button',
		attributes  : {
			onClick: 'handleSubmitClick',
		},

	},
};

function Basic(props) {
	const { components, setComponents } = props;

	const handleClick = (content = {}) => {
		console.log('components :: ', components);
		// setComponents([...components, { type: content.type, id: uuid(), properties: CONTENT_MAPPING[content.type] }]);
	};

	return (
		<div className={styles.container}>

			{(contents || []).map((content) => (
				<div
					// need to change key
					key={uuid()}
					role="presentation"
					onClick={() => handleClick(content)}
					className={styles.grid_item}
				>
					<div>{content.icon}</div>
					<div>{startCase(content.type)}</div>
				</div>
			))}

		</div>
	);
}

export default Basic;
