import ButtonSettings from './ButtonSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedItem } = props;

	let settingsComponent = null;

	switch (selectedItem?.type) {
		case 'text':
			settingsComponent = <TextSettings item={selectedItem} />;
			break;
		case 'button':
			settingsComponent = <ButtonSettings item={selectedItem} />;
			break;
		case 'image':
			settingsComponent = <ImageSettings item={selectedItem} />;
			break;
		default:
			break;
	}

	return (
		<div className={styles.container}>
			{settingsComponent}
		</div>
	);
}

export default Settings;
