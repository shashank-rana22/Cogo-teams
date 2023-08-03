import { IcMFitView } from '@cogoport/icons-react';
import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';

import RenderForeignObjectNode from './ForeignObject';
import styles from './styles.module.css';

function NetworkChart({
	data = {},
	setUserModal = () => {},
	setNodeData = () => {},
	nodeData = {},
	referrerNetwork,
	userName,
}) {
	const [zoom, setZoom] = useState(0.8);

	const [dimensions, setDimensions] = useState();

	const [translate, setTranslate] = useState({ x: 0, y: 0 });

	const containerRef = useRef(null);

	const nodeSize = { x: 200, y: 350 };

	const {
		children = [],
		cogopoints: rootCogopoints = 0,
		top_performer_id = '',
	} = data || {};

	const networkData = {
		name : 'Root',
		type : 'root',
		children,
	};

	const handleLinkClick = (val) => {
		setNodeData(val);
		setUserModal(true);
	};

	function findChild(orgdata, targetName) {
		if (orgdata?.referee_id === targetName) {
			return orgdata;
		}

		if (orgdata?.children) {
			const childNodes = orgdata?.children
				.map((child) => findChild(child, targetName))
				.filter(Boolean);
			if (childNodes?.length > 0) {
				return childNodes[0];
			}
		}

		return null;
	}

	const handleConnections = (val, toggleNode) => {
		const childData = findChild(networkData, val?.referee_id);
		const { referral_data, children: childArr } = childData || {};
		if (childArr?.length === 0 && referral_data?.total_child_count > 0) {
			referrerNetwork(val?.referee_id);
		}
		toggleNode();
	};

	const handleZoom = (str) => {
		if (str === 'in') {
			setZoom((prev) => parseFloat((prev + 0.1).toFixed(2)));
		} else {
			setZoom((prev) => parseFloat((prev - 0.1).toFixed(2)));
		}
	};

	const handleRestore = () => {
		setZoom(zoom !== 0.8 ? 0.8 : 0.8001);
		if (zoom === 0.8001) {
			setZoom(0.8);
		}
	};

	useEffect(() => {
		const refData = containerRef.current.getBoundingClientRect();

		const { width, height } = refData || {};

		setDimensions({
			width,
			height,
		});
	}, [containerRef]);

	useEffect(() => {
		const refData = containerRef.current.getBoundingClientRect();

		const { width, height } = refData || {};

		setTranslate({ x: width / 2, y: height / 8 });
	}, []);

	return (
		<div
			id="treeWrapper"
			className={styles.full_tree_wrapper}
			ref={containerRef}
		>
			<Tree
				data={networkData}
				translate={translate}
				pathFunc="step"
				orientation="vertical"
				nodeSize={nodeSize}
				draggable
				zoomable
				renderCustomNodeElement={(rd3tProps) => (
					<RenderForeignObjectNode
						nodeDatum={rd3tProps?.nodeDatum}
						toggleNode={rd3tProps?.toggleNode}
						userCogopoints={rootCogopoints?.total}
						nodeData={nodeData}
						handleLinkClick={handleLinkClick}
						handleConnections={handleConnections}
						topPerformerId={top_performer_id}
						userName={userName}
					/>
				)}
				separation={{ nonSiblings: 3, siblings: 2 }}
				zoom={zoom}
				depthFactor={240}
				pathClassFunc={() => `${styles.custom_link}`}
				shouldCollapseNeighborNodes
				dimensions={dimensions}
			/>

			<div className={styles.button_container}>
				<button
					type="button"
					className={styles.zoom_buttons}
					onClick={() => handleZoom('in')}
					disabled={zoom >= 1}
				>
					+
				</button>
				<button
					type="button"
					className={styles.zoom_buttons}
					onClick={() => handleZoom('out')}
					disabled={zoom <= 0.1}
				>
					-
				</button>
				<button
					type="button"
					className={styles.zoom_buttons}
					onClick={handleRestore}
				>
					<IcMFitView className={styles.restore} />
				</button>
			</div>

		</div>
	);
}

export default NetworkChart;
