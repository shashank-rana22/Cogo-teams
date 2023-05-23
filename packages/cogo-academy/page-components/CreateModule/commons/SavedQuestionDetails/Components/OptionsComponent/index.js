import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ModalComponent from './ModalComponent';

function OptionsComponent({
	item,
	questionToShow,
	...restProps
}) {
	const [questionDetails, setQuestionDetails] = useState({});

	useEffect(() => {
		if (item.id === questionToShow) {
			setQuestionDetails(item);
		}
	}, [item, questionToShow]);

	return (
		<>
			<IcMEyeopen style={{ cursor: 'pointer' }} onClick={() => setQuestionDetails(item)} />

			{!isEmpty(questionDetails) ? (
				<ModalComponent
					item={item}
					questionDetails={questionDetails}
					setQuestionDetails={setQuestionDetails}
					{...restProps}
				/>
			) : null}
		</>
	);
}

export default OptionsComponent;
