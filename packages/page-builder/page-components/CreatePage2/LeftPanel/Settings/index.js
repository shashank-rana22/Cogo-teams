import ButtonSettings from './ButtonSettings';
import DivSettings from './DivSettings';
// import DivSettings from './DivSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedItem, components, onChange } = props;

	const { type = '' } = selectedItem;

	console.log('selected item ::', selectedItem);
	console.log('components ::', components);

	const COMPONENT_MAPPING = {
		text    : <TextSettings item={selectedItem} onChange={onChange} />,
		button  : <ButtonSettings item={selectedItem} onChange={onChange} />,
		image   : <ImageSettings item={selectedItem} onChange={onChange} />,
		default : <div>Select an element to edit its style</div>,
	};

	return (
		<div className={styles.container}>

			{['text', 'button', 'image'].includes(type) ? COMPONENT_MAPPING[type || 'default'] : <DivSettings />}

		</div>
	);
}

export default Settings;
