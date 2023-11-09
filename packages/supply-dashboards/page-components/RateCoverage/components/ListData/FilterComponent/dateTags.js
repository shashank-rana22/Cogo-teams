import { Tags } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export function DateTag({ date = '', label = '', filterKey = '', setFilter = () => {}, filter = {} }) {
	return (
		<Tags
			size="md"
			items={[
				{
					disabled : false,
					children : `${label} ${formatDate({
						date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
						separator  : '/',
					})}`,
					color    : 'blue',
					tooltip  : true,
					closable : true,
				},
			]}
			onItemsChange={() => {
				setFilter({ ...filter, [filterKey]: '' });
			}}
		/>
	);
}
