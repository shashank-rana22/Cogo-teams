/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';

import IcDrag from './ic-drag.svg';
import { Li, Ul, SubHeading } from './styles';

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
		const list = document.getElementById('target');
		list.insertBefore(
			document.getElementById(id),
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
				const element = document.getElementById(id);
				element.addEventListener('dragstart', dragStartHandler);
			});
		}
		return () => {
			if (value) {
				value.forEach((id) => {
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
			<SubHeading>1. Drag and drop to set priority.</SubHeading>
			<SubHeading>
				2. Ranking will prioritize the preset configuration incase of a
				conflict.
			</SubHeading>
			<Ul id="target">
				{value.map((singleValue, i) => (
					<Li
						onDrop={dropHandler}
						onDragOver={dragoverHandler}
						id={singleValue}
						key={singleValue}
						draggable
					>
						<IcDrag size={1.75} style={{ marginRight: 16 }} />
						{i + 1}
						.
						{options.find((option) => option.id === singleValue)?.name}
					</Li>
				))}
			</Ul>
		</>
	);
}
export default Priority;
