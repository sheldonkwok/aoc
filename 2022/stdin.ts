const decoder = new TextDecoder();

let text = "";
for await (const chunk of Deno.stdin.readable) {
  text += decoder.decode(chunk);
}

text.trimEnd();

export default text;
