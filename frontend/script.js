async function generate() {

    try {

        const prompt = document.getElementById("prompt").value;

        setLoading(true);
        hideError();

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        const arch = data.architecture;

        renderComponents(arch.components);
        renderTechStack(arch.tech_stack);
        renderDiagram(arch.diagram);

        document.getElementById("emptyState").classList.add("hidden");
        document.getElementById("results").classList.remove("hidden");

        document.getElementById("results").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);
        showError("Failed to generate architecture");

    } finally {

        setLoading(false);

    }
}


function renderComponents(components) {

    const container = document.getElementById("components");
    container.innerHTML = "";

    components.forEach((component, index) => {

        const li = document.createElement("li");

        li.className =
            "component-item px-3 py-2 rounded-md border border-border flex items-center gap-2";

        li.innerHTML = `
            <span class="text-primary font-semibold">${index + 1}.</span>
            <span>${component}</span>
        `;

        container.appendChild(li);

    });

}


function renderTechStack(stack) {

    const container = document.getElementById("techstack");
    container.innerHTML = "";

    Object.entries(stack).forEach(([key, value]) => {

        const div = document.createElement("div");

        div.className =
            "tech-badge bg-gray-100 border border-border rounded-lg px-3 py-2";

        div.innerHTML = `
            <div class="text-xs text-muted uppercase">${key}</div>
            <div class="font-medium text-gray-900">${value}</div>
        `;

        container.appendChild(div);

    });

}


async function renderDiagram(diagramText) {

    let diagram = diagramText
        .replace(/```mermaid/g, "")
        .replace(/```/g, "")
        .trim();

    // extraer conexiones tipo A-->B
    const edges = diagram.match(/\w+\s*-->\s*\w+/g);

    if (edges && edges.length > 0) {

        diagram = "graph TD\n" + edges.join("\n");

    }

    const container = document.getElementById("diagram");
    container.innerHTML = "";

    try {

        const { svg } = await mermaid.render("diagram-id", diagram);

        container.innerHTML = svg;

    } catch (err) {

        console.error("Mermaid error:", err);

        container.innerHTML =
            `<pre class="text-sm text-red-600">${diagram}</pre>`;

    }

}


function setLoading(isLoading) {

    const btn = document.getElementById("generateBtn");
    const text = document.getElementById("generateText");
    const spinner = document.getElementById("loadingSpinner");
    const icon = document.getElementById("generateIcon");

    if (isLoading) {

        btn.disabled = true;
        text.textContent = "Generating...";
        spinner.classList.remove("hidden");
        icon.classList.add("hidden");

    } else {

        btn.disabled = false;
        text.textContent = "Generate Architecture";
        spinner.classList.add("hidden");
        icon.classList.remove("hidden");

    }

}


function showError(message) {

    const alert = document.getElementById("errorAlert");
    const msg = document.getElementById("errorMessage");

    msg.textContent = message;
    alert.classList.remove("hidden");

}


function hideError() {

    document.getElementById("errorAlert").classList.add("hidden");

}