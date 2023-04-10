import { Input } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';

import stakeholderMappings from './stakeholder-mappings';
import styles from './styles.module.css';

function Sendto(
	{ data, setStakeHolderView = () => { }, isStakeholder = true },
	ref,
) {
	const [suggestions, setSuggestions] = useState([]);
	const [isTypingName, setIsTypingName] = useState(false);
	const [userName, setUserName] = useState({});
	const [text, setText] = useState('');

	const stakeholder_type = isStakeholder
		? data?.channelData?.stakeholder_types?.[0] : 'default';

	const stakeholders = stakeholderMappings[stakeholder_type];

	const cond = (stakeholders || []).filter((item) => {
		if (text.includes(item)) {
			return null;
		}
		return item;
	});

	const handleMentions = (value) => {
		const lastChar = value.split('')[value.length - 1];

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
			const v = words[words.length - 1].substring(1);
			setUserName(v);
		}

		setText(value);
	};

	useEffect(() => {
		if (userName.length > 0) {
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
		setText(`${text.substr(0, text.length - userName.length) + value} `);
	};

	const renderSuggestions = () => {
		if (suggestions.length === 0) {
			return null;
		}

		return (
			<div className={styles.container} role="listbox">
				{(suggestions || []).map((item) => (
					<div
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
