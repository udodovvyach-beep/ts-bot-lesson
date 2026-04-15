interface Joke {
    setup: string;
    punchline: string;
}

async function safeFetchJoke(): Promise<Joke | null> {
    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/jokes/programming/random"
        );

        if (!response.ok) {
            console.warn("API вернул ошибку: ", response.status);
            return null;
        }

        const data = await response.json();

        const joke = data[0];
        
        if (!joke?.setup || !joke?.punchline) {
            console.warn("Ответ не соответствует ожидаемому формату");
            return null;
        }

        return {
            setup: joke.setup,
            punchline: joke.punchline
        };
    } catch (error) {
        console.error("Ошибка сети: ", error);
        return null;
    }
}

async function main() {
    const joke = await safeFetchJoke();

    if (joke) {
        if (joke.setup.length + joke.punchline.length < 100) {
            console.log(joke.setup);
            console.log(joke.punchline);
        } else {
            console.log("Шутка слишком длинная, пропускаем");
        }
    } else {
        console.log("Не удалось получить шутку, но программа не упала");
    }
}

main();
