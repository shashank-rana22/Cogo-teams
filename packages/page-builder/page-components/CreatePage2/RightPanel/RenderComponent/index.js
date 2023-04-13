import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';

function RenderComponents({ componentType, widget, components, setComponents, elementId, childId, selectedItem }) {
	const COMPONENT_MAPPING = {
		text: (
			<TextComponent
				key={elementId}
				text={widget.content}
				components={components}
				setComponents={setComponents}
				childId={childId}
				selectedItem={selectedItem}
			/>
		),

		image: (
			<ImageComponent
				key={elementId}
				src={widget.content}
				components={components}
				setComponents={setComponents}
				childId={childId}
				selectedItem={selectedItem}
			/>
		),

		button: (
			<ButtonComponent
				key={elementId}
				label={widget.content}
				themeType={widget.themeType}
				size={widget.size}
				type={widget.type}
				components={components}
				setComponents={setComponents}
				elementId={elementId}
			/>
		),
	};

	return (
		<div style={{ width: '100%', height: '100%', color: '#222' }}>
			{COMPONENT_MAPPING[componentType]}
		</div>
	);
}

export default RenderComponents;
