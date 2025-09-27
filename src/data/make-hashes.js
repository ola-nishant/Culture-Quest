import bcrypt from "bcrypt";

const answers: Record<string, string[]> = {
  C1: ["teamwork"],
  C2: ["log feedback and acknowledge"],
  C3: ["courage"],
  C4: ["creativity"],
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
