window.typeIntoActiveElement = async function(text, delay=50) {

  const target = document.activeElement;

  if (!target ||
      !(target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    alert("Click inside a text field first!");
    return;
  }

  function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    let cursor = target.value.length;

    for (let char of text) {
      const before = target.value.slice(0, cursor);
      const after = target.value.slice(cursor);
      target.value = before + char + after;
      cursor++;
      target.setSelectionRange(cursor, cursor);

      target.dispatchEvent(new Event("input", {bubbles:true}));
      await wait(delay);
    }

    return;
  }

  if (target.isContentEditable) {
    for (let char of text) {
      document.execCommand("insertText", false, char);
      await wait(delay);
    }
  }
};
