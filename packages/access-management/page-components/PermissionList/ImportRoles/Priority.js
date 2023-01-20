/* eslint-disable no-param-reassign */
import { IcMDrag } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

function Priority({ value, options, setPriority = () => {} }) {
	const dragStartHandler = (ev) => {
		ev.dataTransfer.dropEffect = 'move';
		ev.dataTransfer.setData('text/plain', ev.target.id);
	};

	const dragoverHandler = (ev) => {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	};
	const dropHandler = (ev) => {
		ev.preventDefault();
		const id = ev.dataTransfer.getData('text/plain');
		// eslint-disable-next-line no-undef
		const list = document.getElementById('target');
		list.insertBefore(
			// eslint-disable-next-line no-undef
			document.getElementById(id),
			// eslint-disable-next-line no-undef
			document.getElementById(ev.target.id),
		);
		const ids = [];
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < list.childNodes.length; i++) {
			ids.push(list.childNodes[i].id);
		}
		setPriority(ids);
	};

	useEffect(() => {
		if (value) {
			value.forEach((id) => {
				// eslint-disable-next-line no-undef
				const element = document.getElementById(id);
				element.addEventListener('dragstart', dragStartHandler);
			});
		}
		return () => {
			if (value) {
				value.forEach((id) => {
					// eslint-disable-next-line no-undef
					const element = document.getElementById(id);
					if (element) {
						element.removeEventListener('dragstart', dragStartHandler);
					}
				});
			}
		};
	}, [value]);
	return (
		<>
			<h3>1. Drag and drop to set priority.</h3>
			<h3>
				2. Ranking will prioritize the preset configuration incase of a
				conflict.
			</h3>
			<ul id="target">
				{value.map((singleValue, i) => (
					<li
						onDrop={dropHandler}
						onDragOver={dragoverHandler}
						id={singleValue}
						key={singleValue}
						draggable
					>
						<IcMDrag style={{ marginRight: 16 }} />
						{i + 1}
						.
						{options.find((option) => option.id === singleValue)?.name}
					</li>
				))}
			</ul>
		</>
	);
}
export default Priority;
