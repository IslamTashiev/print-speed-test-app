import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, styled } from "@mui/material";
import clsx from "clsx";

const testedText =
	"При изучении программирования необходимо выбрать язык программирования, который наилучшим образом подходит для достижения ваших целей. Начните с основных концепций, таких как переменные, условия и циклы. Изучите структуры данных, такие как массивы и списки. После этого углубляйтесь в изучение выбранного языка. Помните, что каждый язык программирования имеет свои преимущества и недостатки. Не паникуйте, а постепенно двигайтесь вперед, углубляя свои знания и навыки.";

interface ITestProps {
	setAccuracy: (value: number) => void;
	setCurrentSpeed: (value: number) => void;
}

const Test = ({ setAccuracy, setCurrentSpeed }: ITestProps) => {
	const [arrOfSimbols, setArrOfSimbols] = useState<string[]>([]);
	const [arrOfCheckedSimbols, setArrOfCheckedSimbols] = useState<string[]>([]);
	const [typedFullText, setTypedFullText] = useState<string>("");
	const [currentSimbol, setCurrentSimbol] = useState<string>("");
	const [isCheckedSimbolFailed, setIsCheckedSimbolFailed] = useState<boolean>(false);
	const [countOfFailed, setCountOfFailed] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [totalTime, setTotalTime] = useState<number>(0);
	const [timerIsStarted, setTimerIsStarted] = useState<boolean>(false);

	const myInterval: number | any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setTimerIsStarted(true);

		const value = event.target.value;

		if (value[value.length - 1] === currentSimbol) {
			setTypedFullText(value);
			setArrOfSimbols((prevState) => {
				const checkedSimbol: string | undefined = prevState.shift();
				setArrOfCheckedSimbols((prevState: string[]) => [...prevState, checkedSimbol || ""]);
				setCurrentSimbol(prevState[0]);
				return prevState;
			});
			setIsCheckedSimbolFailed(false);
		} else {
			setIsCheckedSimbolFailed(true);
			setCountOfFailed((prevState) => prevState + 1);
		}
	};
	const toggleTimer = () => {
		setIsRunning((isRunning) => !isRunning);
	};

	const resetCounter = () => {
		clearInterval(myInterval.current);
		myInterval.current = null;
		setIsRunning(false);
	};

	useEffect(() => {
		if (isRunning) {
			myInterval.current = setInterval(() => {
				setTotalTime((counter) => counter + 1);
			}, 1000);
		} else {
			clearInterval(myInterval.current);
			myInterval.current = null;
		}
	}, [isRunning]);
	useEffect(() => {
		if (timerIsStarted) {
			toggleTimer();
		}
	}, [timerIsStarted]);
	useEffect(() => {
		if (arrOfSimbols.length === 0 && arrOfCheckedSimbols.length === testedText.length) {
			resetCounter();
		}
	}, [arrOfSimbols.length === 0, testedText]);
	useEffect(() => {
		if (timerIsStarted) {
			setCurrentSpeed(Math.floor((arrOfCheckedSimbols.length / totalTime) * 60));
			setAccuracy(+(100 - (countOfFailed / testedText.length) * 100).toFixed(1));
		}
	}, [totalTime, timerIsStarted]);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);
	useEffect(() => {
		if (testedText) {
			setArrOfSimbols(testedText.split(""));
			setCurrentSimbol(testedText.split("")[0]);
		}
	}, [testedText]);

	return (
		<TestWrapper>
			<Box>
				{arrOfCheckedSimbols.map((char, index) => (
					<Typography
						color='text.primary'
						key={char + index}
						component='span'
						className='simbol verified'
					>
						{char}
					</Typography>
				))}
				{currentSimbol && (
					<Typography
						color='text.primary'
						component='span'
						className={clsx("simbol", "current", { failed: isCheckedSimbolFailed })}
					>
						{currentSimbol}
					</Typography>
				)}

				{arrOfSimbols.map(
					(char, index) =>
						index !== 0 && (
							<Typography
								color='text.primary'
								key={char + index}
								component='span'
								className='simbol'
							>
								{char}
							</Typography>
						)
				)}
			</Box>
			<input
				ref={inputRef}
				type='text'
				value={typedFullText}
				onChange={(e) => onChange(e)}
				className='test-input'
			/>
		</TestWrapper>
	);
};

const TestWrapper = styled(Box)(() => ({
	padding: 20,
	width: "85%",

	".simbol": {
		variant: "body2",
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
	".test-input": {
		position: "absolute",
		left: 0,
		top: -10,
		height: 1,
		width: "100%",
		fontSize: 16,
		overflow: "hidden",
		border: "none",
		color: "transparent",
		outline: 0,
	},
}));

export default Test;
