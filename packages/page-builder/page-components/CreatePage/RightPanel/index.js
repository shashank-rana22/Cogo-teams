import { Button } from '@cogoport/components';
import React from 'react';

import ButtonComponent from '../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../commons/widgets/ImageComponent';
import TextComponent from '../../../commons/widgets/TextComponent';

import styles from './styles.module.css';

function RightPanel(props) {
	const { components, setComponents } = props;

	console.log('components ::', components);

	return (
		<div className={styles.container}>

			<section className={styles.header}>
				<div>
					<Button type="button" size="md" themeType="secondary">Preview</Button>
				</div>

				<div className={styles.button_container}>
					<Button style={{ marginRight: '8px' }} type="button" size="md" themeType="secondary">Save</Button>
					<Button type="button" size="md">Save & Close</Button>
				</div>
			</section>

			<section>

				<div className="page-builder">

					<div className="page-preview">
						{(components || []).map((component) => {
							const elementId = component.id;
							switch (component.type) {
								case 'text':
									return (
										<TextComponent
											key={elementId}
											text={component.properties.content}
											// styles={component.properties.styles}
											components={components}
											setComponents={setComponents}
											elementId={elementId}
										/>
									);
								case 'image':
									return (
										<ImageComponent
											key={elementId}
											src={component.properties.content}
											alt={component.properties.alt}
											styles={component.properties.styles}
										/>
									);
								case 'button':
									return (
										<ButtonComponent
											key={elementId}
											label={component.properties.content}
											themeType={component.properties.themeType}
											size={component.properties.size}
											type={component.properties.type}

										/>
									);
								default:
									return null;
							}
						})}
					</div>
				</div>

			</section>

		</div>

	);
}

export default RightPanel;
