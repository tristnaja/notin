# Responsive Markdown Test

This document tests the responsive behavior of various markdown elements across different screen sizes.

## Typography Scale

### H1 - Main Heading

This is the largest heading and should scale appropriately on all devices.

### H2 - Section Heading

This heading provides clear section breaks and maintains readability.

### H3 - Subsection Heading

Smaller but still prominent headings for subsections.

### H4 - Minor Heading

Less prominent headings for minor divisions.

### H5 - Small Heading

Very small headings for fine-grained organization.

### H6 - Tiny Heading

The smallest heading level available.

## Text Content

This is a regular paragraph with **bold text**, _italic text_, and `inline code`. The text should be readable on all screen sizes and maintain appropriate line heights.

Here's another paragraph to test spacing between elements. This demonstrates how the responsive system handles multiple paragraphs and ensures proper visual separation.

## Lists

### Unordered List

- First item with some longer text to test wrapping behavior
- Second item
- Third item with **bold text** and `code`
- Fourth item that's quite long to test how the responsive system handles overflow

### Ordered List

1. First numbered item
2. Second item with _emphasis_
3. Third item containing a [link](https://example.com)
4. Fourth item with `inline code`

## Code Blocks

### JavaScript Example

```javascript
function responsiveFunction() {
  // This function demonstrates code block responsiveness
  const screenSize = window.innerWidth;
  const fontSize = Math.max(14, Math.min(18, screenSize / 100));

  return {
    fontSize: `${fontSize}px`,
    lineHeight: fontSize > 16 ? 1.6 : 1.5,
  };
}
```

### CSS Example

```css
/* Responsive typography with CSS clamp */
.responsive-text {
  font-size: clamp(1rem, 4vw, 1.5rem);
  line-height: clamp(1.4, 2vw, 1.6);
  margin: clamp(0.5rem, 2vw, 1rem) 0;
}
```

## Blockquotes

> This is a blockquote that should be properly styled and responsive. It contains longer text to test how the system handles quote formatting across different screen sizes.

> Another blockquote with **bold text** and `code` to test mixed content formatting.

## Tables

| Feature     | Mobile  | Tablet   | Desktop     | Ultra-wide  |
| ----------- | ------- | -------- | ----------- | ----------- |
| Font Size   | Small   | Medium   | Large       | Extra Large |
| Line Height | 1.4     | 1.5      | 1.6         | 1.7         |
| Margins     | Compact | Balanced | Spacious    | Generous    |
| Padding     | Minimal | Moderate | Comfortable | Luxurious   |

## Links and Emphasis

Here's a [link to an external resource](https://example.com) that should be properly styled. We also have **bold text for emphasis** and _italic text for subtle emphasis_.

## Mathematical Content

Inline math: $E = mc^2$

Display math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## Images

![Sample Image](https://via.placeholder.com/800x400/266293/ffffff?text=Responsive+Image)

## Horizontal Rules

---

## Mixed Content

This paragraph contains a mix of **bold**, _italic_, `code`, and [links](https://example.com) to test how the responsive system handles complex content formatting.

### Code with Lists

```python
# Python example with comments
def process_data(data):
    """Process the input data."""
    results = []
    for item in data:
        if item > 0:  # Positive check
            results.append(item * 2)
        else:
            results.append(0)
    return results
```

## Long Content Test

This is a very long paragraph designed to test how the responsive system handles text wrapping and line breaks on different screen sizes. It contains enough content to span multiple lines and should demonstrate the responsive typography system's ability to maintain readability across all devices. The text should flow naturally and maintain appropriate spacing regardless of the viewport size.

### Nested Elements

- **Bold list item** with `code`
- _Italic item_ containing a [link](https://example.com)
- Regular item with mixed formatting: **bold** and _italic_ text

## Conclusion

This document demonstrates the comprehensive responsive improvements made to the markdown rendering system. All elements should scale appropriately across different screen sizes while maintaining readability and visual hierarchy.
