
const resourcePrompt = `You are an expert software engineer.

For every module below return the official documentation.

Rules:

1. Prefer official documentation.
2. If official documentation does not exist, return the best learning article.
3. Return ONLY valid JSON.
4. Do not explain anything.
5. Keep the same title.

Return format:

[
  {
    "title":"",
    "article":""
  }
]
`;

export default resourcePrompt;