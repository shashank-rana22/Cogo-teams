import ButtonSettings from './ButtonSettings';
// import DivSettings from './DivSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedItem, onChange } = props;

	let settingsComponent = null;

	switch (selectedItem?.type) {
		case 'text':
			settingsComponent = <TextSettings item={selectedItem} onChange={onChange} />;
			break;
		case 'button':
			settingsComponent = <ButtonSettings item={selectedItem} onChange={onChange} />;
			break;
		case 'image':
			settingsComponent = <ImageSettings item={selectedItem} onChange={onChange} />;
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
