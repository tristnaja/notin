# Welcome to Notin - Your AI-Powered Note Generator

This is a comprehensive demonstration of **markdown rendering** capabilities in our note-taking application. Below you'll find examples of various markdown elements that are fully supported.

## Getting Started with Markdown

Markdown is a _lightweight markup language_ that allows you to format text using simple syntax. It's perfect for taking notes, writing documentation, and creating formatted content quickly.

### Basic Text Formatting

You can make text **bold** or _italic_, and even combine them for **_bold italic_** text. You can also use `inline code` to highlight specific terms or commands.

### Code Blocks

Here's an example of a JavaScript function with **syntax highlighting**:

```javascript
async function generateNote(prompt) {
  const response = await ai.generate({
    prompt: prompt,
    maxTokens: 1000,
    temperature: 0.7,
    model: "gpt-4",
  });

  if (!response.success) {
    throw new Error("Failed to generate note");
  }

  return response.text;
}

// Usage example
const note = await generateNote("Explain quantum computing");
console.log(note);
```

Python code with beautiful highlighting:

```python
import numpy as np
import matplotlib.pyplot as plt
from typing import List, Optional

def fibonacci_sequence(n: int) -> List[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])

    return sequence

# Plot the sequence
fib_nums = fibonacci_sequence(20)
plt.plot(fib_nums, 'bo-')
plt.title('Fibonacci Sequence')
plt.show()
```

CSS styling example:

```css
.markdown-renderer {
  @apply prose prose-invert max-w-none;

  .code-block {
    background: #282c34;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;

    &:hover {
      background: #2c313c;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
}
```

## Lists and Organization

### Unordered Lists

Here are some key features of Notin:

- **AI-powered note generation** - Create notes from simple prompts
- **Markdown support** - Full formatting capabilities
- **Responsive design** - Works on all devices
- **Real-time preview** - See your formatting as you type
- **Cloud sync** - Access your notes anywhere

### Ordered Lists

Follow these steps to create your first AI-generated note:

1. **Open the note editor** - Click the "New Note" button
2. **Enter your prompt** - Describe what you want to write about
3. **Generate content** - Let AI create your initial draft
4. **Edit and format** - Use markdown to style your content
5. **Save and organize** - Store your note in collections

### Nested Lists

You can also create nested lists for better organization:

- **Project Planning**
  - Research phase
    - Market analysis
    - Competitor research
  - Development phase
    - Frontend implementation
    - Backend development
  - Testing and deployment
- **Content Creation**
  - Blog posts
  - Documentation
  - User guides

## Quotes and Citations

> "The best way to get started is to quit talking and begin doing." - Walt Disney

This quote perfectly captures the philosophy behind Notin - we believe in taking action and creating content, not just planning it.

> **Pro Tip:** Use blockquotes to highlight important information or inspiring quotes in your notes.

## Links and References

Here are some useful resources for learning more about markdown:

- [Markdown Guide](https://www.markdownguide.org/) - Comprehensive markdown reference
- [GitHub Flavored Markdown](https://github.github.com/gfm/) - Extended markdown specification
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) - Quick reference

## Tables

Markdown tables are great for organizing data:

| Feature          | Free Plan | Pro Plan  | Enterprise |
| ---------------- | --------- | --------- | ---------- |
| AI Generations   | 50/month  | 500/month | Unlimited  |
| Storage          | 1GB       | 10GB      | 100GB      |
| Collaborators    | 1         | 5         | Unlimited  |
| Priority Support | ❌        | ✅        | ✅         |
| Custom Templates | ❌        | ✅        | ✅         |

## Advanced Formatting

### Strikethrough Text

You can use ~~strikethrough~~ to show deleted or outdated information.

### Task Lists

Keep track of your todos with interactive checkboxes:

- [x] Set up Notin account
- [x] Create first AI-generated note
- [ ] Organize notes into collections
- [ ] Share notes with team members
- [ ] Set up automated backups

## Mathematical Expressions & LaTeX

Notin supports **beautiful LaTeX math rendering** for complex mathematical expressions:

### Inline Mathematics

You can include inline math like Einstein's famous equation $E = mc^2$, or the quadratic formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. Greek letters like $\alpha$, $\beta$, $\gamma$, and $\delta$ are fully supported.

### Block Mathematics

For more complex equations, use display math blocks:

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

The Fibonacci sequence can be expressed as:

$$F_n = F_{n-1} + F_{n-2}, \quad \text{where } F_0 = 0 \text{ and } F_1 = 1$$

### Advanced Mathematical Notation

**Fractions and Roots:**
$$\frac{d}{dx}\left(\sqrt{x^2 + 1}\right) = \frac{x}{\sqrt{x^2 + 1}}$$

**Summations and Products:**
$$\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$$

$$\prod_{i=1}^{n} i = n!$$

**Limits and Derivatives:**
$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

$$\frac{\partial}{\partial x}\left(x^2 y + y^3\right) = 2xy$$

**Matrices and Vectors:**

$$
\mathbf{A} = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

**Complex Analysis:**
$$e^{i\pi} + 1 = 0$$

This is Euler's identity, often called the most beautiful equation in mathematics!

## Conclusion

This demonstration showcases the full range of markdown capabilities available in Notin. Whether you're taking simple notes, writing documentation, or creating structured content, markdown provides the flexibility and power you need.

Ready to start creating? Click the **"New Note"** button and begin your markdown journey with AI assistance!

### More Code Examples

**SQL Database Query:**

```sql
SELECT u.name, COUNT(n.id) as note_count
FROM users u
LEFT JOIN notes n ON u.id = n.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY note_count DESC
LIMIT 10;
```

**JSON Configuration:**

```json
{
  "app": {
    "name": "Notin",
    "version": "1.0.0",
    "features": {
      "markdown": true,
      "syntax_highlighting": true,
      "latex_math": true,
      "ai_generation": true
    },
    "supported_languages": [
      "javascript",
      "python",
      "css",
      "sql",
      "json",
      "yaml",
      "bash"
    ]
  }
}
```

**Bash Script:**

```bash
#!/bin/bash

# Deploy Notin application
echo "🚀 Deploying Notin..."

npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    npm run start
else
    echo "❌ Build failed"
    exit 1
fi
```

---

_Happy note-taking! 🚀_
