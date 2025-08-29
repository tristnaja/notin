# Markdown Content Directory

This directory contains markdown content files used throughout the Notin application.

## File Structure

```
src/content/markdown/
├── demo.md              # Comprehensive demo content (~280 lines)
├── short-demo.md        # Quick demo content (~10 lines)
├── math-test.md         # Math testing content (~15 lines)
├── responsive-test.md   # Responsive design testing content
├── README.md            # This file - editing guidelines
└── utils/
    ├── reader.ts        # File reading utilities
    ├── types.ts         # TypeScript interfaces
    └── index.ts         # Public API exports
```

## Content Files

### `demo.md`
- **Purpose**: Comprehensive demonstration of all markdown features
- **Usage**: Default content shown in the home dashboard
- **Features**: Syntax highlighting, LaTeX math, tables, lists, etc.
- **Size**: ~280 lines, ~8KB

### `short-demo.md`
- **Purpose**: Quick demo for testing and minimal examples
- **Usage**: Alternative content for testing purposes
- **Features**: Basic markdown elements
- **Size**: ~10 lines, ~200 bytes

### `math-test.md`
- **Purpose**: Testing LaTeX math rendering
- **Usage**: Verification of mathematical expressions
- **Features**: Inline and block math, Greek letters, fractions
- **Size**: ~15 lines, ~300 bytes

### `responsive-test.md`
- **Purpose**: Testing responsive behavior of markdown elements
- **Usage**: Verification of responsive design across different screen sizes
- **Features**: Headings, text, lists, code blocks, blockquotes, tables, etc.

## Editing Guidelines

### LaTeX Math Syntax
When editing mathematical expressions, use standard LaTeX syntax:

**Inline Math**: `$E = mc^2$` → $E = mc^2$
**Block Math**: 
```
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

**Important**: Use single backslashes in `.md` files, not double-escaped backslashes like in JavaScript strings.

### Code Blocks
Use fenced code blocks with language specification:

````markdown
```javascript
function example() {
  return "Hello World";
}
```
````

Supported languages include: `javascript`, `python`, `css`, `sql`, `json`, `yaml`, `bash`, `html`, `typescript`, and many more.

### Tables
Use GitHub Flavored Markdown table syntax:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
```

### Links and Images
- **Links**: `[Link Text](https://example.com)`
- **Images**: `![Alt Text](image-url.jpg)`

### Task Lists
Use GitHub-style task lists:

```markdown
- [x] Completed task
- [ ] Pending task
```

## Development Notes

### File Reading
- Files are read server-side using Next.js Server Components
- Content is cached in production for performance
- Fallback content is provided if files are missing
- Changes to files require server restart in production

### Error Handling
- Missing files fallback to default content
- Invalid LaTeX expressions are handled gracefully
- File reading errors are logged but don't crash the application

### Performance
- **Development**: No caching (hot reload friendly)
- **Production**: 5-minute memory cache
- **Bundle Size**: Zero client impact (server-side only)

### Hot Reload
In development mode, markdown files are read fresh on each request to support live editing. No server restart required for content changes.

## Testing Changes

After editing content files:

1. **Development**: Changes appear immediately (no cache)
2. **Production**: Cache clears after 5 minutes, or restart server
3. **Verify**: Test syntax highlighting, math rendering, and responsive design
4. **Validate**: Check for broken links or malformed LaTeX

## Common Issues

### LaTeX Not Rendering
- **Problem**: Math expressions show as raw text
- **Solution**: Check for proper `$` or `$$` delimiters
- **Example**: `$E = mc^2$` not `E = mc^2`

### Code Not Highlighting
- **Problem**: Code blocks show without syntax highlighting
- **Solution**: Specify language after opening backticks
- **Example**: ```javascript not just ```

### Table Formatting
- **Problem**: Tables not rendering properly
- **Solution**: Ensure proper pipe `|` alignment and header separator

## Content Guidelines

### Tone and Style
- Use clear, concise language
- Include practical examples
- Explain complex concepts simply
- Maintain consistent formatting

### Structure
- Start with clear headings
- Use progressive disclosure (simple → complex)
- Include visual breaks with lists and tables
- End with actionable next steps

### Accessibility
- Use descriptive link text
- Include alt text for images
- Maintain good heading hierarchy
- Ensure sufficient color contrast

## Version Control

When committing content changes:
- Use descriptive commit messages
- Group related changes together
- Test thoroughly before pushing
- Document any breaking changes

Example commit message:
```
content: update demo.md with new LaTeX examples

- Add matrix notation examples
- Fix escaping issues in complex equations
- Update code block language specifications
```
