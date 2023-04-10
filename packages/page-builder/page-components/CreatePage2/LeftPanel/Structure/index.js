import { IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

const widths = [['100%'],
	['50%', '50%'],
	['33.33%', '33.33%', '33.33%'],
	['25%', '25%', '25%', '25%'],
	['40%', '60%'],
	['60%', '40%'],
	['25%', '75%'],
	['75%', '25%'],
	['25%', '25%', '50%'],
	['50%', '25%', '25%'],
];

function Structure(props) {
	const {
		components,
		setComponents,
		setShowContentModal,
		// parentComponentId,
		setParentComponentId,
	} = props;

	const handleSubmitClick = ({ elementId }) => {
		setParentComponentId(elementId);

		setShowContentModal(true);
	};

	const handleClick = (rows) => {
		const parentComponent = {
			id         : uuid(),
			type       : 'container',
			isRendered : false,
			properties : {
				content : '',
				styles  : {
					display: 'flex',
				},
			},
		};
		const childrenComponents = rows.map((row) => {
			const elementId = uuid();

			return ({
				type       : 'container',
				id         : elementId,
				width      : row,
				parentId   : parentComponent.id,
				isRendered : false,
				properties : {
					content : <IcMPlusInCircle style={{ cursor: 'pointer' }} width={20} height={20} />,
					styles  : {
						width          : row,
						border         : '1px dashed #9ab7fe',
						height         : '120px',
						margin         : '2px',
						display        : 'flex',
						justifyContent : 'center',
						alignItems     : 'center',
					},
					attributes: {
						onClick: () => handleSubmitClick({ elementId }),
					},

				},
			});
		});

		setComponents([...components, parentComponent, ...childrenComponents]);
	};

	return (
		<div className={styles.container}>
			<div className={styles.grid_container}>
				{widths.map((row) => (
					<div key={uuid()} role="presentation" onClick={() => handleClick(row)} className={styles.grid_item}>
						{row.map((width) => (
							<div key={uuid()} className={styles.item} style={{ width }} />
						))}
					</div>
				))}
			</div>
		</div>

	);
}

export default Structure;
