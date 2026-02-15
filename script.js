const input = document.getElementById("input");
const output = document.getElementById("output");
const mode = document.getElementById("mode");
const polishBtn = document.getElementById("polishBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const copyStatus = document.getElementById("copyStatus");
const countHint = document.getElementById("countHint");

function updateCount() {
  countHint.textContent = `${input.value.length} characters`;
}
input.addEventListener("input", updateCount);
updateCount();

// Demo-only placeholder so UI feels alive before AI is wired.
function demoPolish(text, m) {
  if (!text.trim()) return "";
  if (m === "email") {
    return text
      .replace(/\bi\b/g, "I")
      .replace(/\bthanks\b/gi, "Thank you")
      .trim() + "\n\nBest regards,\nArvind";
  }
  if (m === "clarity") {
    return text
      .replace(/\s+/g, " ")
      .replace(/very\s+/gi, "")
      .replace(/\bkind of\b/gi, "")
      .trim();
  }
  // academic default
  return text
    .replace(/\bcan’t\b/gi, "cannot")
    .replace(/\bdon’t\b/gi, "do not")
    .replace(/\bI think\b/gi, "I hypothesize")
    .trim();
}

polishBtn.addEventListener("click", () => {
  output.value = demoPolish(input.value, mode.value);
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.value = "";
  updateCount();
  copyStatus.textContent = "";
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyStatus.textContent = "Copied.";
    setTimeout(() => (copyStatus.textContent = ""), 1200);
  } catch {
    copyStatus.textContent = "Copy failed (browser permissions).";
  }
});
