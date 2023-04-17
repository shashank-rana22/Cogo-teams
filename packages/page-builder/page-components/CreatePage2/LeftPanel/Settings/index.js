import ButtonSettings from './ButtonSettings';
import DivSettings from './DivSettings';
// import DivSettings from './DivSettings';
import ImageSettings from './ImageSettings';
import styles from './styles.module.css';
import TextSettings from './TextSettings';

function Settings(props) {
	const { selectedRow, component, setComponent, onChange } = props;

	const { type = '' } = selectedRow;

	const COMPONENT_MAPPING = {
		text    : <TextSettings item={selectedRow} onChange={onChange} />,
		button  : <ButtonSettings item={selectedRow} onChange={onChange} />,
		image   : <ImageSettings item={selectedRow} onChange={onChange} />,
		default : <div>Select an element to edit its style</div>,
	};

	return (
		<div className={styles.container}>

			{['text', 'button', 'image'].includes(type)
				? COMPONENT_MAPPING[type || 'default']
				: (
					<DivSettings
						component={component}
						selectedRow={selectedRow}
						setComponent={setComponent}
					/>
				)}

		</div>
	);
}

export default Settings;
