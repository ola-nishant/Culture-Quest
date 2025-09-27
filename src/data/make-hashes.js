const bcrypt = require("bcrypt");

const answers = {
  C1: ["teamwork","trust","collabor","support","transparency","harmony"],
  C2: ["log feedback and acknowledge"],
  C3: ["25"],
  C4: ["creativity"]
};

(async () => {
  for (const [id, list] of Object.entries(answers)) {
    console.log(`\nPuzzle ${id}`);
    for (const ans of list) {
      const hash = await bcrypt.hash(ans, 10);
      console.log(`Answer: ${ans} => ${hash}`);
    }
  }
})();


