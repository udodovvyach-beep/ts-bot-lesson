async function getJoke(): Promise<string> {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
    const {setup, punchline} = (await response.json())[0];
    return `${setup} - ${punchline}`;
}

async function main() {
    try {
        console.log(await getJoke());
    } catch (error) {
        console.error("Ошибка при получении шутки:", error);
    }
}

main();
