import { Pill } from '@cogoport/components';

import getPillsFormat from '../../../../../../../helpers/getPillsFormat';

function PopoverContent({ list = [] }) {
	return (
		<div>
			{list?.map((item) => {
				const pills = getPillsFormat(item);
				return (
					<div>
						{pills.map((pill) => <Pill>{pill}</Pill>)}
					</div>
				);
			})}
		</div>
	);
}

export default PopoverContent;
