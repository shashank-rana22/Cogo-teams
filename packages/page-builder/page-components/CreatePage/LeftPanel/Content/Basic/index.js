import contents from '../../../../../configurations/basic-contents';

import Item from './Item';
import styles from './styles.module.css';

function Basic(props) {
	const { components, setComponents } = props;

	return (
		<div className={styles.container}>

			{(contents || []).map((content) => (
				<Item content={content} components={components} setComponents={setComponents} />
			))}

		</div>
	);
}

export default Basic;
