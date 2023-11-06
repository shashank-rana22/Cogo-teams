import { Tags } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

export function CustomTags({ text = '', onClose = () => {}, setValue = () => {} }) {
	return (
		<Tags
			size="md"
			items={[
				{
					disabled : false,
					children : startCase(text),
					color    : 'blue',
					tooltip  : false,
					closable : true,
				},
			]}
			onItemsChange={() => {
				onClose();
				setValue('');
			}}
		/>
	);
}
