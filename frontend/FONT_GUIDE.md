# Font Family Guide

This document outlines the font families used across different pages and sections of the website.

## Font Families Used

### Primary Fonts
- **Inter** - Clean, modern sans-serif for body text and UI elements
- **Poppins** - Bold, friendly sans-serif for headings and hero sections
- **Playfair Display** - Elegant serif for display titles and special emphasis
- **Space Grotesk** - Technical monospace for code and tech-related content
- **Montserrat** - Professional sans-serif for body text and descriptions

## Font Usage by Section

### Hero Section (#home)
- **Headings (h1)**: Poppins (800 weight) - Bold, attention-grabbing
- **Body Text (p)**: Montserrat (400 weight) - Clear, readable
- **Purpose**: Modern, energetic first impression

### About Section (#about)
- **Main Headings (h1, h2, h3)**: Poppins (700 weight) - Professional authority
- **Display Titles**: Playfair Display (600 weight) - Elegant sophistication
- **Body Text (p)**: Montserrat (400 weight, line-height: 1.7) - Easy reading
- **Purpose**: Professional yet approachable

### Services Section
- **Main Headings (h1, h2)**: Poppins (700 weight) - Clear hierarchy
- **Service Titles (h3)**: Inter (600 weight) - Clean, technical
- **Descriptions (p)**: Montserrat (400 weight) - Professional clarity
- **Tech Stack**: Space Grotesk (500 weight) - Technical authenticity
- **Purpose**: Technical expertise with clarity

### Projects Section
- **Main Headings (h1, h2)**: Poppins (700 weight) - Bold showcase
- **Project Titles (h3)**: Inter (600 weight) - Modern, clean
- **Descriptions (p)**: Montserrat (400 weight) - Clear communication
- **Purpose**: Portfolio presentation with impact

### Contact Section
- **Main Headings (h1, h2)**: Poppins (700 weight) - Friendly invitation
- **Body Text (p, labels)**: Montserrat (400 weight) - Approachable
- **Form Inputs**: Inter (400 weight) - Clean, functional
- **Purpose**: Welcoming and accessible

### Featured Projects
- **Section Headings (h2)**: Playfair Display (600 weight) - Showcase elegance
- **Project Titles (h3)**: Poppins (600 weight) - Strong presence
- **Descriptions (p)**: Montserrat (400 weight) - Clear details
- **Purpose**: Premium portfolio presentation

### What We Do Section
- **Main Heading (h2)**: Poppins (700 weight) - Clear value proposition
- **Service Titles (h3)**: Inter (600 weight) - Professional clarity
- **Descriptions (p)**: Montserrat (400 weight) - Easy comprehension
- **Purpose**: Service clarity and professionalism

### Industry Expertise Section
- **Main Heading (h2)**: Poppins (700 weight) - Authority
- **Industry Titles (h3)**: Inter (600 weight) - Professional
- **Descriptions (p)**: Montserrat (400 weight) - Clear expertise
- **Purpose**: Industry credibility

### Trusted By Section
- **Main Heading (h2)**: Poppins (700 weight) - Trust building
- **Body Text (p)**: Montserrat (400 weight) - Social proof
- **Purpose**: Credibility and trust

### Navigation & Footer
- **Navigation Links**: Inter (500 weight) - Clean, functional
- **Footer Headings (h3, h4)**: Poppins (600 weight) - Clear organization
- **Footer Text**: Montserrat (400 weight) - Readable information
- **Purpose**: Consistent navigation experience

### UI Elements
- **Buttons & CTAs**: Inter (600 weight, letter-spacing: 0.01em) - Action-oriented
- **Stats & Numbers**: Poppins (800 weight) - Impact and emphasis
- **Badges & Labels**: Inter (500 weight, letter-spacing: 0.02em) - Clear categorization
- **Code Blocks**: Space Grotesk (400 weight) - Technical authenticity
- **Testimonials**: Playfair Display (400 weight, italic) - Personal touch

## Design Principles

### Hierarchy
1. **Display Level**: Playfair Display - Special emphasis, elegance
2. **Heading Level**: Poppins - Strong, clear hierarchy
3. **Subheading Level**: Inter - Clean, modern
4. **Body Level**: Montserrat - Readable, professional
5. **Technical Level**: Space Grotesk - Authentic, technical

### Readability
- Body text uses Montserrat with 1.7 line-height for optimal reading
- Headings use Poppins with negative letter-spacing for tighter, bolder appearance
- Technical content uses Space Grotesk for authenticity

### Consistency
- All sections maintain consistent font usage within their context
- Dark mode adjusts font weights for better visibility
- Responsive typography scales appropriately on mobile devices

### Accessibility
- All fonts are web-safe with fallbacks
- Font smoothing enabled for better rendering
- Sufficient contrast maintained in all color modes
- Line heights optimized for readability

## CSS Variables

```css
--font-primary: 'Inter'        /* UI, navigation, buttons */
--font-heading: 'Poppins'      /* Main headings, hero titles */
--font-display: 'Playfair Display'  /* Special emphasis, quotes */
--font-mono: 'Space Grotesk'   /* Code, technical content */
--font-body: 'Montserrat'      /* Body text, descriptions */
```

## Responsive Behavior

### Mobile (< 768px)
- Heading sizes scale using clamp() for fluid typography
- Font weights remain consistent for brand identity
- Line heights adjust for smaller screens

### Tablet & Desktop (≥ 768px)
- Full font hierarchy displayed
- Optimal letter-spacing applied
- Enhanced readability with proper line lengths

## Dark Mode Adjustments

- Headings: 700 weight for better visibility
- Body text: 400 weight maintained
- Buttons: 600 weight for clear CTAs
- Enhanced contrast for all text elements
