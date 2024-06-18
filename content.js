function addCopyButtonToCodeBlock(codeContainer) {
  // Check if the button already exists to avoid duplicates
  if (codeContainer.querySelector(".copy-code-btn")) return;

  // Create the new copy button
  const newButton = document.createElement("button");
  newButton.className = "copy-code-btn";
  newButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm">
      <path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path>
    </svg> Copy code`;

  // Add event listener for the new button
  newButton.addEventListener("click", () => {
    const codeText = codeContainer.querySelector("code").innerText;
    navigator.clipboard.writeText(codeText);
  });

  // Append the new button at the end of the code container
  codeContainer.appendChild(newButton);
}

function initializeCopyButtons() {
  // Select all code containers
  const codeContainers = document.querySelectorAll(
    '.overflow-y-auto.p-4[dir="ltr"]'
  );
  codeContainers.forEach((codeContainer) => {
    addCopyButtonToCodeBlock(codeContainer);
  });
}

// Use MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // Check if the added node or any of its children is a code container
        if (
          node.matches('.overflow-y-auto.p-4[dir="ltr"]') ||
          node.querySelector('.overflow-y-auto.p-4[dir="ltr"]')
        ) {
          initializeCopyButtons();
        }
      }
    });
  });
});

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

// Initialize buttons for existing code containers on page load
document.addEventListener("DOMContentLoaded", initializeCopyButtons);
