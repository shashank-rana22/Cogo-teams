// import { useMemo } from 'react';
import { startCase } from '@cogoport/utils';
import { useDrag } from 'react-dnd';
// import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

const ItemTypes = {
	BOX: 'box',
};

const CONTENT_MAPPING = {
	text: {
		// eslint-disable-next-line max-len
		content    : 'start typing here...',
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

function Item({ content, components, setComponents }) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type : ItemTypes.BOX,
		item : content,
		end  : (item, monitor) => {
			const dropResult = monitor.getDropResult();

			if (item && dropResult) {
				setComponents((previousState) => ([
					...previousState,
					{
						...CONTENT_MAPPING[item.name],
						id   : components.length + 1,
						type : item.name,
						i    : components.length,
					},
				]));
			}
		},
		collect: (monitor) => ({
			isDragging : monitor.isDragging(),
			handlerId  : monitor.getHandlerId(),
		}),
	}));
	const opacity = isDragging ? 0.4 : 1;

	return (
		<div ref={drag} className={styles.grid_item} style={{ opacity }} data-testid="box">

			<div>{content.icon}</div>
			<div>{startCase(content.type)}</div>

		</div>

	);
}

export default Item;
