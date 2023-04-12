import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';

function RenderComponents({ componentType, widget, components, setComponents, elementId }) {
	const COMPONENT_MAPPING = {
		text: (
			<TextComponent
				key={elementId}
				text={widget.content}
				components={components}
				setComponents={setComponents}
				elementId={elementId}
			/>
		),
		image: (
			<ImageComponent
				key={elementId}
				src={widget.content}
				alt={widget.alt}
				components={components}
				setComponents={setComponents}
				elementId={elementId}
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
		<div style={{ background: 'lavender', width: '100%', height: '100%' }}>
			{COMPONENT_MAPPING[componentType]}
		</div>
	);
}

export default RenderComponents;
