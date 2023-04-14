import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ModalComponent from './ModalComponent';

function OptionsComponent({
	item,
	...restProps
}) {
	const [questionDetails, setQuestionDetails] = useState({});

	return (
		<div>
			<IcMEyeopen style={{ cursor: 'pointer' }} onClick={() => setQuestionDetails(item)} />

			{!isEmpty(questionDetails) ? (
				<ModalComponent
					item={item}
					questionDetails={questionDetails}
					setQuestionDetails={setQuestionDetails}
					{...restProps}
				/>
			) : null}
		</div>
	);
}

export default OptionsComponent;
