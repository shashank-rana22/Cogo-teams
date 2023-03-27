import { Button } from '@cogoport/components';
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function CreatePage() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);

	const [layouts, setLayouts] = useState(null);

	const handleModify = (layout) => {
		const tempArray = components;

		const newLayout = layout?.map((position) => {
			const { i, x, y, w, h } = position;

			const index = Number(i);

			tempArray[index].x = x;
			tempArray[index].y = y;
			tempArray[index].width = w;
			tempArray[index].height = h;
			return tempArray[index];
		});

		setLayouts(newLayout);

		setComponents(tempArray);
	};

	// const handleAdd = () => {
	// 	setComponents([
	// 		...components,
	// 		{ x: 0, y: 0, w: 1, h: 1, id: uuid() },
	// 	]);
	// };

	const handleDelete = (key) => {
		const tempArray = components.slice();

		const widgetIndex = tempArray.indexOf(tempArray.find((data) => data.i === key));
		tempArray.splice(widgetIndex, 1);

		const modifiedArray = tempArray.map((temp, index) => ({
			...temp,
			i: index,

		}));

		setComponents(modifiedArray);
	};

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

						<ResponsiveGridLayout
							onLayoutChange={handleModify}
							verticalCompact
							layout={layouts}
							breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
							preventCollision={false}
							autoSize
							cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
							margin={{
								lg  : [20, 20],
								md  : [20, 20],
								sm  : [20, 20],
								xs  : [20, 20],
								xxs : [20, 20],
							}}
						>
							{components?.map((widget) => (
								<div
									className={styles.reactGridItem}
									key={widget.i}
									data-grid={{
										i           : widget?.i,
										x           : widget?.x,
										y           : widget?.y,
										w           : widget?.w,
										h           : widget?.h,
										minW        : 0,
										maxW        : Infinity,
										minH        : 0,
										maxH        : Infinity,
										isDraggable : true,
										isResizable : true,
									}}
								>

									<button
										className={styles.deleteButton}
										onClick={() => handleDelete(widget.i)}
									>
										x
									</button>

									<RightPanel
										widget={widget}
										components={components}
										setComponents={setComponents}
									/>

								</div>
							))}
						</ResponsiveGridLayout>

					</div>

				</div>

			</section>
		</div>
	);
}

export default CreatePage;

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
