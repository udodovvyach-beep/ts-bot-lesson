async function main() {
    console.log("1. Старт");

    setTimeout(() => {
        console.log("2. Таймер сработал");
    }, 1000);

    console.log("3. После таймера");

    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("4. После await");
}

main();
