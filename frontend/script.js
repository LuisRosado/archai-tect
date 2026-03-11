async function generate() {

    try {

        const prompt = document.getElementById("prompt").value;

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        const arch = data.architecture;

        // Mostrar componentes
        document.getElementById("components").textContent =
            JSON.stringify(arch.components, null, 2);

        // Mostrar tech stack
        document.getElementById("techstack").textContent =
            JSON.stringify(arch.tech_stack, null, 2);

        // Limpiar diagrama generado por el LLM
        let diagram = arch.diagram
            .replace(/```mermaid/g, "")
            .replace(/```/g, "")
            .trim();

        const diagramContainer = document.getElementById("diagram");

        // limpiar contenedor
        diagramContainer.innerHTML = "";

        try {

            const { svg } = await mermaid.render(
                "generatedDiagram",
                diagram
            );

            diagramContainer.innerHTML = svg;

        } catch (mermaidError) {

            console.error("Mermaid error:", mermaidError);

            diagramContainer.innerHTML =
                "<pre>Diagram could not be rendered.\n\n" + diagram + "</pre>";
        }

    } catch (error) {

        console.error("Generation error:", error);
        alert("Error generating architecture. Check console.");

    }
}