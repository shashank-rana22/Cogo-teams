import { startCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import contents from '../../../../../configurations/basic-contents';

import styles from './styles.module.css';

const CONTENT_MAPPING = {
	text: {
		properties : { content: 'start typing here...' },
		layout     : {},
		attributes : {
			contenteditable: true,
		},
	},

	image: {
		properties: {
			// eslint-disable-next-line max-len
			content : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
			style   : {
				backgroundColor : 'red',
				padding         : '20px',
			},
		},
		alt        : 'add-img-url',
		layout     : {},
		attributes : {},
	},

	button: {
		properties: {
			content: 'Click Me!',
		},
		redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
		themeType   : 'primary',
		size        : 'md',
		layout      : {},
		type        : 'button',
		attributes  : {
			onClick: 'handleSubmitClick',
		},

	},
};

function Basic(props) {
	const {
		components,
		setComponents,
		parentComponentId,
		setShowContentModal,
	} = props;

	const handleClick = (content = {}) => {
		setComponents([...components, {
			...CONTENT_MAPPING[content.type],
			id       : uuid(),
			type     : content.type,
			parentId : parentComponentId,
		}]);

		setShowContentModal(false);
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
