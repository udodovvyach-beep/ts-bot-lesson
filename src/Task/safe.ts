const apiResponse = {
    data: null
};

const jokeData = apiResponse.data;

const setup = jokeData?.setup ?? "Шутка не найдена";
const punchline = jokeData?.punchline ?? "Попробуй позже";

console.log(setup);
console.log(punchline);