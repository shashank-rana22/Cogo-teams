import { isEmpty } from '@cogoport/utils';

import BlockLoader from '../../../../assets/block-loader.svg';
import RenderComponents from '../RenderComponent';

import styles from './styles.module.css';

function ComponentBuilder({ widget, components, setComponents, selectedRow, childId, setChildId, setSelectedItem }) {
	const { children, style, id: componentId } = widget || {};
	const { id: selectedRowId } = selectedRow || {};

	if (isEmpty(children)) {
		return (
			<div className={styles.block_wrapper}>
				<BlockLoader />
				<div className={styles.loader_text}>
					Drop here to add blocks
				</div>
			</div>
		);
	}

	return (
		<div style={style}>

			{ (children || []).map((childComponent, idx) => {
				const { id, style: allStyles, icon, attributes, type, children: childChildren } = childComponent || {};

				const isChildSelected = childId === id && componentId === selectedRowId && type;
				const border = isChildSelected ? '1px solid red' : allStyles.border;

				if (!isEmpty(childChildren) && type === 'container') {
					return (
						<div
							className={styles.content_container}
							style={{ ...allStyles, display: 'block' }}
						>
							{ (childChildren || []).map((childrenComponent, childrenIndex) => {
								const {
									id: childrenId,
									style: childrenStyles,
									type: childrenType,
								} = childrenComponent || {};

								// const isChildSelected = childId === id && componentId === selectedRowId && type;
								// const border = isChildSelected ? '1px solid red' : allStyles.border;

								return (

									<div
										role="presentation"
										className={styles.content_container}
										style={{ ...childrenStyles }}
										onClick={() => setChildId(id)}
									>
										<RenderComponents
											componentType={childrenType}
											widget={childrenComponent}
											components={components}
											setComponents={setComponents}
											elementId={childrenId}
											childId={childId}
											selectedRow={selectedRow}
											setSelectedItem={setSelectedItem}
											index={childrenIndex}
										/>
									</div>
								);
							})}
						</div>

					);
				}

				return (

					<div
						role="presentation"
						className={styles.content_container}
						style={{ ...allStyles, border }}
						onClick={() => setChildId(id)}
					>

						{!type ? (
							<div
								role="presentation"
								onClick={attributes.onClick}
							>
								{icon}
							</div>
						) : (
							<RenderComponents
								componentType={type}
								widget={childComponent}
								components={components}
								setComponents={setComponents}
								elementId={id}
								childId={childId}
								selectedRow={selectedRow}
								setSelectedItem={setSelectedItem}
								index={idx}
							/>
						) }

					</div>
				);
			})}
		</div>
	);
}

export default ComponentBuilder;
