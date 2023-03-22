import { Button } from '@cogoport/components';

import template from '../../../configurations/sample';
import ComponentBuilder from '../../../utils/component-builder';

import styles from './styles.module.css';

function Editor() {
	const { components = [] } = template;

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

				<ComponentBuilder components={components} />

			</section>

		</div>

	);
}

export default Editor;
