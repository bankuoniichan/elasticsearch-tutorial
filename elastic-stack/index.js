const pino = require("pino")();

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const QAMapping = {};
[..."ABCBDEF"].forEach(char => {
  QAMapping[`Question ${char}`] = `Answer ${char}`;
});

const getRandomInteger = (n = 100) => {
  const randomValue = Math.random();
  const randomInt = Math.floor(n * randomValue);
  return randomInt;
};

const getRandomInterval = () => {
  const minInterval = 1000; // 1 second
  const maxInterval = 10 * 1000; // 10 second
  const diff = maxInterval - minInterval;
  const randomInterval = minInterval + getRandomInteger(diff);
  return randomInterval;
};

const getRandomQuestion = () => {
  const questions = Object.keys(QAMapping);
  const randomQuestionIndex = getRandomInteger(questions.length + 1);
  return questions[randomQuestionIndex] || "Question X";
};

const answerQuestion = question => {
  return QAMapping[question] || "Fallback Answer";
};

const getRandomDecision = (rate = 0.5) => {
  return Math.random() >= rate;
};

const getNewSession = (function() {
  let sessionId = 1;
  return () => {
    return sessionId++;
  };
})();

const simulateConversations = clients => {
  clients.forEach(client => {
    simulateConversation(client);
  });
};

const postMessage = (sessionId, actor, message) => {
  pino.info(
    JSON.stringify({
      sessionId,
      actor,
      message
    })
  );
};

const simulateConversation = async client => {
  do {
    await delay(getRandomInterval()); // simulate interval between session
    const sessionId = getNewSession();
    let nQuestionToAsk = 1 + getRandomInteger(3); // 1 to 3 questions
    while (nQuestionToAsk--) {
      const question = getRandomQuestion();
      postMessage(sessionId, client, question);
      await delay(500); // simulate server response delay
      postMessage(sessionId, "kaitomm", answerQuestion(question));
      await delay(1500); // simulate user action delay
    }
  } while (getRandomDecision()); // randomly decide to start new session
};

const clients = [
  "142.27.6.41",
  "142.27.6.44",
  "142.52.14.3",
  "142.52.19.34",
  "25.103.90.4"
];
simulateConversations(clients);
