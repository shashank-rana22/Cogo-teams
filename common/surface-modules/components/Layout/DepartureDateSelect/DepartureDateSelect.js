import { Input } from '@cogoport/components';
import { IcMCalendar } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import OptionsModal from './OptionsModal';

function DepartureDateSelect({ value, onChange, showPopover, datePair, ...rest }) {
	const [showModal, setShowModal] = useState(false);
	const [multiSelected, setMultiSelected] = useState(value);

	const getValue = () => {
		let valueString = '';
		const formattedValues = (value || []).map((item) => format((item), 'dd MMM yy '));
		valueString += formattedValues.concat();

		return valueString;
	};

	return (
		<>
			<div onFocus={() => setShowModal(true)}>
				<Input
					{...rest}
					value={getValue()}
					suffix={() => <IcMCalendar onClick={() => setShowModal(true)} color="#adadad" size={1.4} />}
				/>

			</div>
			<OptionsModal
				onChange={onChange}
				onClose={() => setShowModal(false)}
				show={showModal}
				value={value}
				datePair={datePair}
				isMobile={rest.isMobile}
				multiSelected={multiSelected}
				setMultiSelected={setMultiSelected}
			/>
		</>
	);
}

export default DepartureDateSelect;
