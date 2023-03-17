import { IcMArrowRotateUp } from '@cogoport/icons-react';

function IconComponent({ item, caseToShow, setCaseToShow }) {
	const handleShowCaseDetails = () => {
		if (item.id === caseToShow) {
			setCaseToShow('');
		} else {
			setCaseToShow(item.id);
		}
	};

	if (caseToShow === item?.id) {
		return (
			<IcMArrowRotateUp
				onClick={() => handleShowCaseDetails(item)}
				width={12}
				height={12}
				fill="#393f70"
				style={{ marginLeft: 4, transition: 'transform 0.5s', cursor: 'pointer' }}
			/>
		);
	}

	return (
		<IcMArrowRotateUp
			onClick={() => handleShowCaseDetails(item)}
			width={12}
			height={12}
			fill="#393f70"
			style={{
				marginLeft : 4,
				cursor     : 'pointer',
				transform  : 'rotate(180deg)',
				transition : 'transform 0.5s',
			}}
		/>
	);
}

export default IconComponent;
