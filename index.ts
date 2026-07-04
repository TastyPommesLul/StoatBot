import { Client } from "stoat.js";

let client = new Client();

let femboys: string[] = await Bun.file("femboys.txt").text().then(e => e.replace("\r", "").split('\n').filter(e => e !== ""))

client.on("ready", async () =>
  console.info(`Logged in as ${client.user?.username}!`),
);

client.on("messageCreate", async (message) => {
  let date = new Date();
  let log = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}] (${message.username!}): ${message.contentPlain}`
  console.log(log)
  if (message.username! !== client.user?.username) {
    await Bun.write("log.txt", await Bun.file("log.txt").text() + `${log}\n`)
  }


  if (femboys.includes(message.username!)) {
    await (await message.member?.user?.openDM()!).sendMessage("a kiss from the femboy kisser <3 💋")
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "!femboy" || message.content === "/femboy") {
    if (femboys.includes(message.username!)) {
      femboys.splice(femboys.indexOf(message.username!), 1)
    } else {
      femboys.push(message.username!)
    }
    if (femboys.length > 0) {
      await Bun.write("femboys.txt", femboys.join("\n"))
    } else {
      await Bun.write("femboys.txt", "")
    }
    console.log(femboys)
  }
  femboys.filter(e => femboys.includes(e))
})

client.loginBot(process.env.BOT_TOKEN!);
