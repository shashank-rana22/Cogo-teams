import ButtonSettings from './ButtonSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedItem, onChange } = props;
	const { type } = selectedItem || {};

	const SETTING_COMPONENT = {
		text    : <TextSettings item={selectedItem} onChange={onChange} />,
		button  : <ButtonSettings item={selectedItem} onChange={onChange} />,
		image   : <ImageSettings item={selectedItem} onChange={onChange} />,
		default : <div>Select an element to edit its style</div>,

	};

	return (
		<div className={styles.container}>
			{SETTING_COMPONENT[type || 'default']}
		</div>
	);
}

export default Settings;
