/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Modal } from '@cogoport/components';
import React, { useCallback, useState } from 'react';

import DropBox from '../DropBox';
import LeftPanel from '../LeftPanel';
import Content from '../LeftPanel/Content';

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

function DNDComponent() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);
	const [showContentModal, setShowContentModal] = useState(false);
	const [parentComponentId, setParentComponentId] = useState(null);

	const [isNewItemAdding, setNewItemAdding] = useState(false);

	const [selectedItem, setSelectedItem] = useState({});

	const handleAddNewItem = useCallback(
		(content, hoveredIndex = components.length, shouldAddBelow = true, parentId) => {
		  const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

		  setComponents(() => ([
				...components.slice(0, startIndex),
				{
					...CONTENT_MAPPING[content.type],
					...content,
					id: components.length + 1,
					parentId,
				},
				...components.slice(startIndex),
		  ]));

		  setSelectedItem({
				...content,
				id    : components.length + 1,
				index : startIndex,
		  });

		  setShowContentModal(false);
		  setParentComponentId(null);
		},
		[components],
	  );

	  const onClose = () => {
		setShowContentModal(false);
	};

	  const MemoLeftPanel = useCallback(
		() => (
			<LeftPanel
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				components={components}
				setComponents={setComponents}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedItem={selectedItem}
				showContentModal={showContentModal}
				setShowContentModal={setShowContentModal}
				parentComponentId={parentComponentId}
				setParentComponentId={setParentComponentId}
			/>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handleAddNewItem, selectedItem, activeTab],

	  );
	  const MemoRightPanel = useCallback(
		() => (
			<DropBox
				components={components}
				setComponents={setComponents}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isNewItemAdding={isNewItemAdding}
				parentComponentId={parentComponentId}
			/>

		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handleAddNewItem, isNewItemAdding],

	  );

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages V1
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<MemoLeftPanel />
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
						<MemoRightPanel />
					</div>

				</div>

			</section>
			<section>

				<Modal
					size="md"
					show={showContentModal}
					onClose={onClose}
					placement="top"
					scroll={false}
				>
					<Modal.Header title="choose content" />
					<Content
						components={components}
						setComponents={setComponents}
						parentComponentId={parentComponentId}
						setParentComponentId={setParentComponentId}
						setShowContentModal={setShowContentModal}
						addNewItem={handleAddNewItem}
						onNewItemAdding={setNewItemAdding}
						selectedItem={selectedItem}
					/>

				</Modal>
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
