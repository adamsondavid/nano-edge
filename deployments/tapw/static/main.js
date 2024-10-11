async function main() {
    const res = await fetch("/tapw/api");
    document.getElementById("res").innerText = await res.text();
}

main().catch(console.error);
