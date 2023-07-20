import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';

import stakeholderMappings from './stakeholder-mappings';
import styles from './styles.module.css';

const TOTAL_STAKEHOLDERS_LENGTH = 2;
const CHAR_LENGTH = 1;
const SUGGESTION_LENGTH = 0;

function Sendto(
	{ data, setStakeHolderView = () => { }, isStakeholder = true },
	ref,
) {
	const [suggestions, setSuggestions] = useState([]);
	const [isTypingName, setIsTypingName] = useState(false);
	const [userName, setUserName] = useState({});
	const [text, setText] = useState('');

	const stakeholder_type = isStakeholder && data?.channelData?.stakeholder_types?.length < TOTAL_STAKEHOLDERS_LENGTH
		? data?.channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index] : 'default';

	const stakeholders = stakeholderMappings[stakeholder_type];

	const cond = (stakeholders || []).filter((item) => {
		if (text.includes(item)) {
			return null;
		}
		return item;
	});

	const handleMentions = (value) => {
		const lastChar = value.split('')[value.length - CHAR_LENGTH];

		if (lastChar === ' ' || value === '') {
			setSuggestions([]);
			setIsTypingName(false);
		}

		if (lastChar === '@') {
			setIsTypingName(true);
			setSuggestions(cond);
		}

		if (isTypingName) {
			const words = value.split(' ');
			const v = words[words.length - CHAR_LENGTH].substring(CHAR_LENGTH);
			setUserName(v);
		}

		setText(value);
	};

	useEffect(() => {
		if (userName.length > SUGGESTION_LENGTH) {
			const updatedUserName = userName.replace(/\\/g, '\\\\');
			const regex = new RegExp(`^${updatedUserName}`, 'i');
			const suggestion = cond.sort().filter((v) => regex.test(v));
			setSuggestions(suggestion);
		}
	}, [userName, cond]);

	useEffect(() => {
		setStakeHolderView(text);
	}, [text, setStakeHolderView]);

	useImperativeHandle(ref, () => ({
		setText,
		stakeholders,
	}));

	const selectedText = (value) => {
		setSuggestions([]);
		setText(`${text.substr(SUGGESTION_LENGTH, text.length - userName.length) + value} `);
	};

	const renderSuggestions = () => {
		if (suggestions.length === SUGGESTION_LENGTH) {
			return null;
		}

		return (
			<div className={styles.container} role="listbox">
				{(suggestions || []).map((item) => (
					<div
						key={item}
						className={styles.options}
						onKeyPress={selectedText}
						role="button"
						tabIndex="0"
						onClick={() => selectedText(item)}
					>
						<div className="text-option">{startCase(item)}</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			<div>{renderSuggestions()}</div>
			<div className={styles.send_to_container}>
				<div className={styles.send_text}>Sending to -</div>

				<div className={styles.send_input}>
					<Input
						value={text}
						onChange={(e) => handleMentions(e)}
						placeholder="Type @"
					/>
				</div>
			</div>
		</>
	);
}

export default forwardRef(Sendto);
