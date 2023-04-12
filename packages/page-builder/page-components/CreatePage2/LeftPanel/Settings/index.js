import ButtonSettings from './ButtonSettings';
import DivSettings from './DivSettings';
// import DivSettings from './DivSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedItem, component, setComponent, onChange } = props;

	const { type = '' } = selectedItem;

	const COMPONENT_MAPPING = {
		text    : <TextSettings item={selectedItem} onChange={onChange} />,
		button  : <ButtonSettings item={selectedItem} onChange={onChange} />,
		image   : <ImageSettings item={selectedItem} onChange={onChange} />,
		default : <div>Select an element to edit its style</div>,
	};

	return (
		<div className={styles.container}>

			{['text', 'button', 'image'].includes(type)
				? COMPONENT_MAPPING[type || 'default']
				: <DivSettings component={component} setComponent={setComponent} />}

		</div>
	);
}

export default Settings;
