import { useState, useEffect } from "react";
import { Play, Pause, RotateCwIcon } from "lucide-react";
import "./App.css";
import { Container, Col, Row } from "react-bootstrap";

function App() {
	const [timer, setTimer] = useState(25 * 60);
	const [taskStarted, setTaskStarted] = useState(false);
	const [seconds, setSeconds] = useState(60);
	const [taskPaused, setTaskPaused] = useState(false);

	//use effect for the minutes
	useEffect(() => {
		console.log("taskStarted: " + taskStarted);
		console.log("timer: " + timer);
		let intervalId;

		if (timer > 0 && taskStarted) {
			intervalId = setInterval(() => {
				setTimer((time) => time - 1);
				console.log("task has started");
			}, 1000);
		} else if (timer === 0) {
			setTaskStarted(false);
		}
		return () => clearInterval(intervalId);
	}, [timer, taskStarted]);

	// useEffect for the seconds
	useEffect(() => {
		let intervalId;
		if (taskStarted && seconds > 0) {
			intervalId = setInterval(() => {
				setSeconds(seconds - 1);
			}, 1000);
		} else if (seconds === 0) {
			setSeconds(60);
		}
		return () => clearInterval(intervalId);
	}, [seconds, taskStarted]);

	function handleStartTimer() {
		setTaskStarted(true);
	}

	function resetTimer() {
		setTimer(25 * 60);
		setTaskStarted(false);
		setSeconds(60);
		setTaskPaused(false);
	}

	function pauseTimer() {
		setTaskStarted(false);
		setTaskPaused(true);
	}

	return (
		<div>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<Container>
					<Row>
						<h1>Pomodoro app</h1>
					</Row>
					<div className="timer-box d-flex flex-column justify-content-center align-items-center">
						<Row className="timer">
							{Math.floor(timer / 60)}:{(taskStarted || taskPaused) && seconds < 60 ? seconds : "00"}
						</Row>
						<Row className="buttons">
							<Col xs={12} md={6} lg={4}>
								<Play size={60} onClick={handleStartTimer} />
								{taskStarted && <Pause size={60} onClick={pauseTimer} />}
								<RotateCwIcon size={60} onClick={resetTimer} />
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default App;
