let chosenLang = "HTML";
let chosenOS = "pc";

function runHTML() {
  const code = document.getElementById("htmlCode").value.trim();
  const outputFrame = document.getElementById("outputFrame");
  const selected = chosenLang.toLowerCase();

  const doc = outputFrame.contentDocument || outputFrame.contentWindow.document;
  doc.open();

  let content = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: black; color: white; font-family: monospace; padding: 20px; }
        .log { color: #00ff88; margin-bottom: 8px; }
        .error { color: red; margin-bottom: 8px; }
      </style>
    </head>
    <body>
  `;

  if (selected === "html") {
    content += code;
  } else if (selected === "css") {
    content += `<style>${code}</style><p class="log">✅ CSS Applied Successfully!</p>`;
  } else if (selected === "js") {
    content += `
      <div id="outputArea">🧠 JS Output:</div>
      <script>
        const outputArea = document.getElementById('outputArea');
        const print = (msg, cls = 'log') => {
          const div = document.createElement('div');
          div.className = cls;
          div.textContent = msg;
          outputArea.appendChild(div);
        };

        console.log = (...args) => args.forEach(arg => print(arg));
        window.onerror = function(msg, src, line, col, err) {
          print("❌ Error: " + msg + " at line " + line, 'error');
        };

        try {
          ${code}
        } catch (e) {
          print("❌ " + e.message, 'error');
        }
      <\/script>
    `;
  }

  content += `</body></html>`;
  doc.write(content);
  doc.close();
}

// Landing → Config
document.getElementById("getStartedBtn").addEventListener("click", function () {
  const btn = this;
  const landing = document.getElementById("landingPage");
  const config = document.getElementById("configPage");

  btn.classList.add("glow");

  setTimeout(() => {
    landing.style.transition = "opacity 1s ease";
    landing.style.opacity = "0";

    setTimeout(() => {
      landing.style.display = "none";
      config.style.display = "flex";
      setTimeout(() => config.style.opacity = "1", 50);
    }, 1000);
  }, 800);
});

// Config → Compiler
document.getElementById("letsGoBtn").addEventListener("click", () => {
  const config = document.getElementById("configPage");
  const compiler = document.getElementById("compilerPage");

  compiler.classList.remove("layout-pc", "layout-phone");
  compiler.classList.add(`layout-${chosenOS}`);

  config.style.opacity = "0";
  setTimeout(() => {
    config.style.display = "none";
    compiler.style.display = "flex";

    // Update language label with V1 note
    document.getElementById("selectedLang").textContent = `${chosenLang} IF OUTPUT GIVES ERROR TRY RESTARTING WEB AS IT IS V1`;

    setTimeout(() => compiler.style.opacity = "1", 50);
    document.getElementById("htmlCode").focus();
  }, 800);
});

// Language selector
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    chosenLang = btn.dataset.lang;

    // Live update preview label (if already in compiler)
    const label = document.getElementById("selectedLang");
    if (label) {
      label.textContent = `${chosenLang} IF OUTPUT GIVES ERROR TRY RESTARTING WEB AS IT IS V1`;
    }
  });
});

// OS selector
document.querySelectorAll(".os-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".os-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    chosenOS = btn.dataset.os;
  });
});
