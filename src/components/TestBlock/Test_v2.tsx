import { Box, Typography, styled } from "@mui/material";
import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";

interface TypingSpeedTestProps {
	initialText: string | undefined;
}

const TypingSpeedTest: React.FC<TypingSpeedTestProps> = ({ initialText }) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [currentCheckedSimbol, setCurrentCheckedSimbol] = useState<string>("");

	const [startTime, setStartTime] = useState<number | null>(null);
	const [endTime, setEndTime] = useState<number | null>(null);

	const [typingSpeed, setTypingSpeed] = useState<number>(0);
	const [checkedSimbolsLength, setCheckedSimbolsLength] = useState<number>(0);

	const [startTimer, setStartTimer] = useState<boolean>(false);
	const [isCheckedSimbolFailed, setIsCheckedSimbolFailed] = useState<boolean>(false);

	const [simbols, setSimbols] = useState<string[]>([]);
	const [checkedSimbols, setCheckedSimbols] = useState<string[]>([]);

	const myInterval: number | any = useRef(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const typedText = event.target.value;
		const lastTypedSimbol = typedText[typedText.length - 1];

		if (lastTypedSimbol === currentCheckedSimbol) {
			setInputValue(typedText);
			setSimbols((prevSimbols) => {
				const trimmedSimbols = prevSimbols.slice(1);
				const firstSimbol = prevSimbols[0];
				setCheckedSimbols((prevCheckedSimbols) => [...prevCheckedSimbols, firstSimbol]);
				setCurrentCheckedSimbol(trimmedSimbols[0]);
				return [...trimmedSimbols];
			});
			setIsCheckedSimbolFailed(false);
		} else {
			setIsCheckedSimbolFailed(true);
		}

		if (!startTime) {
			setStartTime(Date.now());
			setStartTimer(true);
		}
	};

	useEffect(() => {
		if (initialText) {
			setSimbols(initialText.split(""));
			setCurrentCheckedSimbol(initialText[0]);
		}
	}, []);

	useEffect(() => {
		if (startTimer) {
			myInterval.current = setInterval(() => {
				setEndTime(Date.now());
				console.log("sdvsdvds");
			}, 1000);
		} else {
			myInterval.current = null;
			clearInterval(myInterval.current);
		}

		return () => {
			if (myInterval.current) {
				clearInterval(myInterval.current);
				myInterval.current = null;
			}
		};
	}, [startTimer]);

	useEffect(() => {
		setCheckedSimbolsLength(checkedSimbols.length);
	}, [checkedSimbols.length]);

	useEffect(() => {
		if (startTime && endTime) {
			const elapsedTime = (endTime - startTime) / 1000;
			const cpm = (checkedSimbolsLength / elapsedTime) * 60;
			setTypingSpeed(cpm);
		}
	}, [startTime, endTime, checkedSimbolsLength]);

	useEffect(() => {
		if (checkedSimbolsLength === initialText?.length && !simbols.length) {
			setEndTime(Date.now());
			if (myInterval.current) {
				clearInterval(myInterval.current);
				myInterval.current = null;
			}
		}
	}, [checkedSimbolsLength, initialText]);

	return (
		<TypingSpeedTestWrapper>
			{checkedSimbols.map((simbol, index) => (
				<Typography
					key={simbol + index}
					component='span'
					className='simbol verified'
					color='text.primary'
				>
					{simbol}
				</Typography>
			))}
			{currentCheckedSimbol && (
				<Typography
					color='text.primary'
					component='span'
					className={clsx("simbol", "current", { failed: isCheckedSimbolFailed })}
				>
					{currentCheckedSimbol}
				</Typography>
			)}
			{simbols.map(
				(simbol, index) =>
					index !== 0 && (
						<Typography
							key={simbol + index}
							component='span'
							className='simbol'
							color='text.primary'
						>
							{simbol}
						</Typography>
					)
			)}
			<input className='test-input' value={inputValue} onChange={handleInputChange} />
			{typingSpeed.toFixed(2)}
		</TypingSpeedTestWrapper>
	);
};

const TypingSpeedTestWrapper = styled(Box)(() => ({
	padding: 20,
	width: "85%",

	".simbol": {
		fontSize: 21,
		fontWeight: 400,
		lineHeight: "173.023%",
		userSelect: "none",

		"&.verified": {
			fontWeight: 500,
			textShadow:
				"0 0 10px #59A276, 0 0 10px #59A276, 0 0 2px #59A276, 0 0 3px #59A276, 0 0 4px #59A276, 0 0 5px #59A276, 0 0 6px #59A276",
		},
		"&.current": {
			backgroundColor: "#59A276",
			borderRadius: 4,
			padding: "0 2px",
		},
		"&.failed": {
			backgroundColor: "#FF5151",
		},
	},
	// ".test-input": {
	// 	position: "absolute",
	// 	left: 0,
	// 	top: -10,
	// 	height: 1,
	// 	width: "100%",
	// 	fontSize: 16,
	// 	overflow: "hidden",
	// 	border: "none",
	// 	color: "transparent",
	// 	outline: 0,
	// },
}));

export default TypingSpeedTest;

// import React, { useState, useEffect } from "react";

// const InitialText = "Your initial text goes here...";

// const TypingSpeedTest: React.FC = () => {
// 	const [text, setText] = useState("");
// 	const [characterCount, setCharacterCount] = useState(0);
// 	const [startTime, setStartTime] = useState<number | null>(null);
// 	const [endTime, setEndTime] = useState<number | null>(null);
// 	const [typingSpeed, setTypingSpeed] = useState(0);

// 	useEffect(() => {
// 		setCharacterCount(InitialText.length);
// 	}, []);

// 	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
// 		const inputText = event.target.value;
// 		setText(inputText);

// 		if (!startTime) {
// 			setStartTime(Date.now());
// 		}
// 	};

// 	useEffect(() => {
// 		if (startTime && endTime) {
// 			const elapsedTime = (endTime - startTime) / 1000;
// 			const cpm = (characterCount / elapsedTime) * 60;
// 			setTypingSpeed(cpm);
// 		}
// 	}, [startTime, endTime, characterCount]);

// 	const handleTestEnd = () => {
// 		if (startTime) {
// 			setEndTime(Date.now());
// 		}
// 	};

// 	useEffect(() => {
// 		let intervalId: NodeJS.Timeout | null = null;

// 		if (startTime && !endTime) {
// 			intervalId = setInterval(() => {
// 				const currentTime = Date.now();
// 				const elapsedTime = (currentTime - startTime) / 1000;
// 				const cpm = (characterCount / elapsedTime) * 60;
// 				setTypingSpeed(cpm);
// 			}, 1000);
// 		}

// 		return () => {
// 			if (intervalId) {
// 				clearInterval(intervalId);
// 			}
// 		};
// 	}, [startTime, endTime, characterCount]);

// 	return (
// 		<div>
// 			<h1>Typing Speed Test</h1>
// 			<p>{InitialText}</p>
// 			<textarea
// 				rows={5}
// 				cols={50}
// 				value={text}
// 				onChange={handleInputChange}
// 				placeholder='Start typing...'
// 			/>
// 			<button onClick={handleTestEnd}>End Test</button>
// 			<p>Current Typing Speed: {typingSpeed.toFixed(2)} CPM</p>
// 		</div>
// 	);
// };

// export default TypingSpeedTest;
