import PREVIEW_COMPONENT_MAPPING from '../../configurations/preview-components-mappings';

function ComponentsDropPreview({ type }) {
	const componentType = type in PREVIEW_COMPONENT_MAPPING ? type : 'default';

	const Component = PREVIEW_COMPONENT_MAPPING[componentType];

	return (
		<Component />
	);
}

export default ComponentsDropPreview;
