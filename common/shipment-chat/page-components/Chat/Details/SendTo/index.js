import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { Input } from '@cogoport/components';
import { startCase } from '@cogoport/front/utils';
import stakeholderMappings from './stakeholder-mappings';
import { SendToContainer, Container, Options, OptionsCon } from './styles';

const Sendto = (
	{ data, setStakeHolderView = () => { }, isStakeholder = true },
	ref,
) => {
	const stakeholder_type = isStakeholder
		? data?.shipment_data?.stakeholder_types?.[0]
		: 'default';
	const stakeholders = stakeholderMappings[stakeholder_type];
	const [suggestions, setSuggestions] = useState([]);
	const [isTypingName, setIsTypingName] = useState(false);
	const [userName, setUserName] = useState({});
	const [text, setText] = useState('');

	const cond = (stakeholders || []).filter((item) => {
		if (text.includes(item)) {
			return null;
		}
		return item;
	});

	const showSuggestions = () => {
		let suggestion = [];

		if (userName.length > 0) {
			const updatedUserName = userName.replace(/\\/g, '\\\\');
			const regex = new RegExp(`^${updatedUserName}`, 'i');
			suggestion = cond.sort().filter((v) => regex.test(v));
			setSuggestions(suggestion);
		} else {
			setSuggestions([]);
		}
	};

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

	const selectedText = (value) => {
		setSuggestions([]);
		setText(`${text.substr(0, text.length - userName.length) + value} `);
	};

	const renderSuggestions = () => {
		if (suggestions.length === 0) {
			return null;
		}

		return (
			<Container role="listbox">
				{(suggestions || []).map((item) => {
					return (
						<Options
							onKeyPress={selectedText}
							role="button"
							tabIndex="0"
							onClick={() => selectedText(item)}
						>
							<div className="text-option">{startCase(item)}</div>
						</Options>
					);
				})}
			</Container>
		);
	};

	useEffect(() => {
		showSuggestions();
	}, [userName]);

	useEffect(() => {
		setStakeHolderView(text);
	}, [text]);

	useImperativeHandle(ref, () => ({
		setText,
		stakeholders,
	}));

	return (
		<>
			<OptionsCon>{renderSuggestions()}</OptionsCon>
			<SendToContainer>
				<div className="send-text">Sending to -</div>
				<div className="stakeholders">
					<Input
						value={text}
						onChange={(e) => handleMentions(e.target.value)}
						placeholder="Type @"
					/>
				</div>
			</SendToContainer>
		</>
	);
};

export default forwardRef(Sendto);
