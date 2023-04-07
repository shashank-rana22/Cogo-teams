import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import DropBox from '../DropBox';
import LeftPanel from '../LeftPanel';

import styles from './styles.module.css';

function DNDComponent() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);

	// const [layouts, setLayouts] = useState(null);

	// const handleModify = (layout) => {
	// 	const tempArray = components;

	// 	const newLayout = layout?.map((position) => {
	// 		const { i, x, y, w, h } = position;

	// 		const index = Number(i);

	// 		tempArray[index].x = x;
	// 		tempArray[index].y = y;
	// 		tempArray[index].width = w;
	// 		tempArray[index].height = h;
	// 		return tempArray[index];
	// 	});

	// 	setLayouts(newLayout);

	// 	setComponents(tempArray);
	// };

	// const handleDelete = (key) => {
	// 	const tempArray = components.slice();

	// 	const widgetIndex = tempArray.indexOf(tempArray.find((data) => data.i === key));
	// 	tempArray.splice(widgetIndex, 1);

	// 	const modifiedArray = tempArray.map((temp, index) => ({
	// 		...temp,
	// 		i: index,

	// 	}));

	// 	setComponents(modifiedArray);
	// };

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages V1
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<LeftPanel
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						components={components}
						setComponents={setComponents}
					/>
				</div>

				<div className={styles.right_panel}>

					<section className={styles.header}>
						<div>
							<Button type="button" size="md" themeType="secondary">Preview</Button>
						</div>

						<div className={styles.button_container}>
							<Button
								style={{ marginRight: '8px' }}
								type="button"
								size="md"
								themeType="secondary"
							>
								Save

							</Button>
							<Button type="button" size="md">Save & Close</Button>
						</div>
					</section>

					<div>
						<DropBox
							components={components}
							setComponents={setComponents}
						/>

					</div>

				</div>

			</section>
		</div>
	);
}

export default DNDComponent;

// className={styles.reactGridItem}
// key={widget.i}
// data-grid={{
// 	i           : widget?.i,
// 	x           : widget?.x,
// 	y           : widget?.y,
// 	w           : widget?.w,
// 	h           : widget?.h,
// 	minW        : 2,
// 	maxW        : Infinity,
// 	minH        : 2,
// 	maxH        : Infinity,
// 	isDraggable : true,
// 	isResizable : true,
// }}
