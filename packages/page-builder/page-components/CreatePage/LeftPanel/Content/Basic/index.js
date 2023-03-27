import { startCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import contents from '../../../../../configurations/basic-contents';

import styles from './styles.module.css';

const CONTENT_MAPPING = {
	text: {
		// eslint-disable-next-line max-len
		content    : '<p>start typing here...</p>',
		layout     : {},
		x          : 0,
		y          : 0,
		w          : 2,
		h          : 1,
		attributes : {
			contenteditable: true,
		},
	},

	image: {
		// eslint-disable-next-line max-len
		content    : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
		alt        : 'add-img-url',
		layout     : {},
		x          : 0,
		y          : 0,
		w          : 4,
		h          : 2,
		attributes : {},
	},

	button: {
		content     : 'Click Me!',
		redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
		themeType   : 'primary',
		size        : 'md',
		layout      : {},
		x           : 0,
		y           : 0,
		w           : 1,
		h           : 1,
		type        : 'button',
		attributes  : {
			onClick: 'handleSubmitClick',
		},

	},
};

function Basic(props) {
	const { components, setComponents } = props;

	const handleClick = (content = {}) => {
		setComponents([...components, {
			...CONTENT_MAPPING[content.type],
			id   : uuid(),
			type : content.type,
			i    : components.length,
		}]);
	};

	return (
		<div className={styles.container}>

			{(contents || []).map((content) => (
				<div
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
